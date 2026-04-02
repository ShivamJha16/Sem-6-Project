import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { EventState } from '../Config/ContextApi';

const PaymentsSection = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = EventState();

  const fetchPayments = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/api/payment/getAllPayments', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      setPayments(data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">All Payments</h2>
      {loading ? (
        <p className="text-gray-600">Loading payments...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[80vh] overflow-y-auto p-2">
          {payments.map((payment) => (
            <div key={payment._id} className="bg-white p-4 shadow-md rounded-lg border">
              <h3 className="text-xl font-semibold text-gray-700">{payment.eventId.eventName}</h3>
              <p className="text-gray-600"><strong>Venue:</strong> {payment.eventId.venue}</p>
              <p className="text-gray-600"><strong>Date:</strong> {new Date(payment.eventId.date).toLocaleDateString()}</p>
              <p className="text-gray-600"><strong>Order ID:</strong> {payment.orderId}</p>
              <p className="text-gray-600"><strong>Payment Method:</strong> {payment.paymentMethod}</p>
              <p className="text-gray-600"><strong>Amount Paid:</strong> ₹{payment.amount}</p>
              <p className="text-gray-600"><strong>Remaining Balance:</strong> ₹{payment.balance}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaymentsSection;