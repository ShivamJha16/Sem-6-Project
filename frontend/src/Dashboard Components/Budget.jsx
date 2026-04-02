import React, { useEffect } from 'react';
import { EventState } from '../Config/ContextApi';
import axios from 'axios';

const Budget = () => {
    const { user, budgets, setBudgets } = EventState();

    const fetchBudgets = async () => {
        try {
            const { data } = await axios.get("http://localhost:8000/api/budget/getAllBudgets", {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            setBudgets(data);
        } catch (error) {
            console.error(error);
            alert("Failed to fetch budgets");
        }
    };

    useEffect(() => {
        fetchBudgets();
    }, []);
    return (
        <div className="p-4 h-screen">
            <div className='w-full'>
                <h2 className="text-2xl font-bold mb-4">Budget List</h2>
                <div className="grid grid-cols-1 overflow-y-auto h-[70vh] md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {budgets.map((budget) => (
                        <div key={budget._id} className="border rounded-lg p-4 shadow-md">
                            <h3 className="text-lg font-semibold">Event: {budget.eventId.eventName}</h3>
                            <p><strong>ID:</strong> {budget._id}</p>
                            <p><strong>Category:</strong> {budget.eventId.category}</p>
                            <p><strong>Venue:</strong> {budget.eventId.venue}</p>
                            <p><strong>Amount:</strong>{budget.amount}</p>
                            <p><strong>Approx Budget:</strong> ₹{budget.eventId.approxBudget}</p>
                            <p><strong>No. of Attendees:</strong> {budget.eventId.noOfAttendees}</p>
                            <p><strong>Status:</strong> {budget.status}</p>
                            <p><strong>Date:</strong> {new Date(budget.eventId.date).toDateString()}</p>
                            <p><strong>Description:</strong> {budget.description}</p>
                            <p><strong>Created By:</strong> {budget.userId?.username} ({budget.userId?.email})</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Budget;
