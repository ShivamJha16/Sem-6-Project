import React, { useState, useEffect } from 'react';
import { EventState } from '../Config/ContextApi';
import axios from 'axios';
import Logo from '../Home Components/Logo';

const Payment = () => {
    const { user, selectedBudget } = EventState();
    const [paymentMethod, setPaymentMethod] = useState('');
    const [amountToPay, setAmountToPay] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      if (selectedBudget) {
        setAmountToPay(selectedBudget.amount * 0.3);
      }
    }, [selectedBudget]);
  
    const handlePayment = async () => {
      try {
        setIsLoading(true); // Start loading
        if (!selectedBudget) {
          alert('No budget selected');
          return;
        }
  
        if (amountToPay < selectedBudget.amount * 0.3) {
          alert('You must pay at least 30% of the total amount.');
          return;
        }
  
        const { data } = await axios.post('https://evento-prs2.onrender.com/api/payment', {
          amount: amountToPay,
          eventId: selectedBudget.eventId._id,
          budgetId: selectedBudget._id,
          userId: user._id,
          paymentMethod: paymentMethod,
          balance: selectedBudget.amount - amountToPay
        }, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
  
        if (typeof window.Razorpay === 'undefined') {
          alert('Razorpay script failed to load. Please try again later.');
          return;
        }
  
        const options = {
          key: 'rzp_test_0IOKhvfBAEHbZR', // Replace with live key
          amount: data.amount * 100,
          currency: 'INR',
          name: 'Event Payment',
          description: selectedBudget.eventId.eventName,
          order_id: data.orderId,
          handler: async function (response) {
            await axios.post('https://evento-prs2.onrender.com/api/payment/verify', {
              ...response,
              eventId: selectedBudget.eventId._id,
              budgetId: selectedBudget._id,
              amountPaid: data.amount
            }, {
              headers: { Authorization: `Bearer ${user.token}` }
            });
            alert('Payment Successful!');
          },
          prefill: {
            name: user.username,
            email: user.email,
          },
          theme: {
            color: '#3399cc'
          }
        };
  
        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error(error);
        alert('Payment Failed!');
      } finally {
        setIsLoading(false); // End loading
      }
    };
  
    return (
      <div className="p-6 bg-gray-200 h-screen flex flex-col items-center justify-center">
        <Logo />
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Make Payment</h2>
          {selectedBudget ? (
            <>
              <p><strong>Event:</strong> {selectedBudget.eventId.eventName}</p>
              <p><strong>Amount:</strong> ₹{selectedBudget.amount}</p>
              <p className="text-red-500">*Minimum Payment Required: ₹{(selectedBudget.amount * 0.3).toFixed(2)}</p>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Select Payment Method</label>
                <select
                  className="mt-2 block w-full border-gray-300 rounded-md shadow-sm"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="">Choose payment method</option>
                  <option value="credit">Credit Card</option>
                  <option value="debit">Debit Card</option>
                  <option value="netbanking">Net Banking</option>
                  <option value="upi">UPI</option>
                  <option value="wallet">Wallet</option>
                  <option value="cash">Cash</option>
                </select>
              </div>
  
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Amount to Pay</label>
                <input
                  type="number"
                  value={amountToPay}
                  onChange={(e) => { setAmountToPay(e.target.value)}}
                  className="mt-2 block w-full border-gray-300 rounded-md shadow-sm"
                  min={selectedBudget.amount * 0.3}
                  max={selectedBudget.amount}
                />
              </div>
  
              <button
                onClick={handlePayment}
                className="mt-6 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                disabled={isLoading || !paymentMethod || amountToPay < selectedBudget.amount * 0.3}
              >
                {isLoading ? 'Processing...' : `Pay ₹${amountToPay.toFixed(2)} Now`}
              </button>
            </>
          ) : (
            <p>No budget selected.</p>
          )}
        </div>
      </div>
    );
};
  

export default Payment;
