import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { EventState } from '../Config/ContextApi';
import axios from 'axios';

const PaymentModal = ({ onClose }) => {
    const { user } = EventState();
    const [payments, setPayments] = useState([]);

    const fetchPayment = async () => {
        try {
            const { data } = await axios.get('https://evento-prs2.onrender.com/api/payment', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            setPayments(data);
        } catch (error) {
            console.log(error);
            alert('Failed to fetch payment');
        }
    };

    useEffect(() => {
        fetchPayment();
    }, []);

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50' onClick={onClose}>
            <div className='bg-white md:w-2/3 w-full max-h-[80vh] overflow-y-auto p-6 rounded-lg shadow-lg relative' onClick={(e) => e.stopPropagation()}>
                <FaTimes className='absolute top-4 right-4 text-gray-600 hover:text-yellow-500 cursor-pointer' onClick={onClose} />
                <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Payment Details</h2>
                {payments.length === 0 ? (
                    <p className='text-gray-500'>No payments found.</p>
                ) : (
                    <div className='grid gap-4'>
                        {payments.map((payment) => (
                            <div key={payment._id} className='border p-4 rounded-lg shadow-sm bg-gray-100'>
                                <p><strong>Event:</strong> {payment.eventId?.eventName}</p>
                                <p><strong>Venue:</strong> {payment.eventId?.venue}</p>
                                <p><strong>Date:</strong> {new Date(payment.eventId?.date).toLocaleDateString()}</p>
                                <p><strong>Order ID:</strong> {payment.orderId}</p>
                                <p><strong>Payment Method:</strong> {payment.paymentMethod.toUpperCase()}</p>
                                <p><strong>Amount Paid:</strong> ₹{payment.amount}</p>
                                <p><strong>Remaining Balance:</strong> ₹{payment.balance}</p>
                                <p className='text-sm text-gray-500'><strong>Paid On:</strong> {new Date(payment.createdAt).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentModal;