import React, { useEffect } from 'react';
import { EventState } from '../Config/ContextApi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EventBudgetModal = ({ onClose }) => {
    const { user, budgets, setBudgets, selectedEvent, setSelectedBudget } = EventState();

    const fetchBudgets = async () => {
        try {
            const { data } = await axios.get(`https://evento-prs2.onrender.com/api/budget/${selectedEvent._id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            setBudgets(data);
        } catch (error) {
            console.log(error);
            alert("Failed to fetch");
        }
    };

    useEffect(() => {
        fetchBudgets();
    }, []);

    const navigate = useNavigate()

    const handleBookBudget = (budget) => {
        setSelectedBudget(budget);
        navigate('/payment');
    };

    return (
        <div className='fixed inset-0 flex justify-center p-2 items-center bg-black bg-opacity-50 z-20' onClick={onClose}>
            <div className='sm:w-[500px] relative w-full p-4 overflow-y-auto h-[80vh] bg-white rounded-lg shadow-lg' onClick={(e) => e.stopPropagation()}>
                <h2 className='text-xl font-bold mb-4'>Event Budgets</h2>
                {budgets.map((budget) => (
                    <div key={budget._id} className='border p-3 rounded-lg shadow-sm mb-3'>
                        <p><strong>ID:</strong> {budget._id}</p>
                        <p><strong>Event Name:</strong> {budget.eventId.eventName}</p>
                        <p><strong>Venue:</strong> {budget.eventId.venue}</p>
                        <p><strong>Amount:</strong> ₹{budget.amount}</p>
                        <p><strong>Category:</strong> {budget.eventId.category}</p>
                        <p><strong>Status:</strong> {budget.status}</p>
                        <p><strong>Description:</strong> {budget.description}</p>
                        <p><strong>Date:</strong> {new Date(budget.eventId.date).toDateString()}</p>
                        <button 
                            className='bg-green-500 text-white px-4 py-1 rounded mt-2 hover:bg-green-600'
                            onClick={() => handleBookBudget(budget)}
                        >
                            Book This Budget
                        </button>
                    </div>
                ))}
                <button onClick={onClose} className='mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'>Cancel</button>
            </div>
        </div>
    );
};

export default EventBudgetModal;
