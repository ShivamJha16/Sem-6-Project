const Budget = require("../models/budgetModel");
const Event = require("../models/eventModel");
const User = require("../models/userModel");

// Create Budget (Only Admin)
const createBudget = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Only admins can create budgets." });
        }
        
        const budget = new Budget({ ...req.body, userId: req.user._id });
        await budget.save();
        res.status(201).json(budget);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Budget (Only User)
const getBudget = async (req, res) => {
    const { eventId } = req.params
    try {
        const budgets = await Budget.find({ eventId }).populate("userId", "-password").populate("eventId");
        res.status(200).json(budgets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Budgets (Only Admin)
const getAllBudgets = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Only admins can access all budgets." });
        }
        
        const budgets = await Budget.find().populate("userId", "-password").populate("eventId");
        res.status(200).json(budgets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Budget Status
const updateStatus = async (req, res) => {
    try {
        const budget = await Budget.findById(req.body.budgetId);
        if (!budget) {
            return res.status(404).json({ message: "Budget not found." });
        }
        
        budget.status = req.body.status;
        await budget.save();
        
        if (req.body.status === 'booked') {
            await Budget.updateMany({ eventId: budget.eventId, _id: { $ne: budget._id } }, { status: 'reject' });
        }
        
        res.status(200).json({ message: "Budget status updated successfully.", budget });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createBudget, getBudget, getAllBudgets, updateStatus };
