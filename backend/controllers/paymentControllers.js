const User = require('../models/userModel');
const Payment = require('../models/paymentModel');
const Event = require('../models/eventModel');
const Budget = require('../models/budgetModel');
const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Payment (Only User)
const createPayment = async (req, res) => {
    const { amount, eventId, budgetId, userId, paymentMethod, balance } = req.body;

    try {
        // Ensure the amount is valid and not zero or negative
        if (amount <= 0) {
            return res.status(400).json({ message: 'Invalid amount' });
        }

        // Create an order with Razorpay API
        const order = await razorpay.orders.create({
            amount: amount * 100, // Convert INR to paise (1 INR = 100 paise)
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
            payment_capture: 1, // Automatically capture the payment
        });

        if (!order) {
            return res.status(500).json({ message: 'Error in creating Razorpay order' });
        }

        // Save payment details in the database
        const payment = new Payment({
            userId,
            eventId,
            budgetId,
            amount,
            paymentMethod,
            balance,
            orderId: order.id,
        });
        await payment.save();

        // Return order details to frontend
        res.status(200).json({
            orderId: order.id,
            amount: order.amount / 100, // Return amount in INR
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Verify Payment (Webhook/Callback from Razorpay)
const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        // Generate Razorpay signature for validation
        const generated_signature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        // Validate signature
        if (generated_signature !== razorpay_signature) {
            return res.status(400).json({ message: "Payment verification failed!" });
        }

        // If signature is correct, fetch payment details
        const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);

        // Check payment status (ensure it's successful)
        if (paymentDetails.status !== 'captured') {
            return res.status(400).json({ message: "Payment not successful!" });
        }

        // Update payment status in your database if needed (e.g., mark as paid)
        await Payment.findOneAndUpdate(
            { orderId: razorpay_order_id },
            { paymentStatus: 'success', razorpayPaymentId: razorpay_payment_id },
            { new: true }
        );

        res.json({ message: "Payment successful!", paymentId: razorpay_payment_id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Get Payments for User
const getPayments = async (req, res) => {
    try {
        const payments = await Payment.find({ userId: req.user._id })
            .populate("userId", "-password")
            .populate("eventId")
            .populate("budgetId");
        res.status(200).json(payments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Get All Payments (Only Admin)
const getAllPayments = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Only admins can access all payments." });
        }
        
        const payments = await Payment.find()
            .populate("userId", "-password")
            .populate("eventId")
            .populate("budgetId");
        res.status(200).json(payments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createPayment, getPayments, getAllPayments, verifyPayment };
