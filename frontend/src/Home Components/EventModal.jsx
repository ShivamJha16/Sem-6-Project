import React, { useEffect, useState } from 'react';
import { EventState } from '../Config/ContextApi';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import EventBudgetModal from './EventBudgetModal';

const EventModal = ({ onClose }) => {
    const { user, events, setEvents, setSelectedEvent } = EventState();
    const [showBudgetsModal, setShowBudgetsModal] = useState(false);

    const fetchUserEvents = async () => {
        try {
            const { data } = await axios.get('http://localhost:8000/api/event', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            setEvents(data);
        } catch (error) {
            console.error(error);
            alert("Failed to fetch events");
        }
    };

    useEffect(() => {
        fetchUserEvents();
    }, []);

    const handleClick = (event) => {
        setSelectedEvent(event);
        setShowBudgetsModal(true);
    };

    const handleCancel = async (eventId) => {
        try {
            await axios.put(`http://localhost:8000/api/event/cancel`, { eventId, status: "cancel" }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });
            fetchUserEvents();
            alert("Event cancelled successfully");
        } catch (error) {
            console.error(error);
            alert("Failed to cancel event");
        }
    };

    return (
        <>
            <div className='fixed inset-0 flex justify-center p-2 items-center bg-black bg-opacity-50 z-20' onClick={onClose}>
                <div className='sm:w-[500px] relative w-full p-4 overflow-y-auto h-[80vh] bg-white rounded-lg shadow-lg' onClick={(e) => e.stopPropagation()}>
                    <h2 className='text-xl font-bold mb-4'>Your Events</h2>
                    <FaTimes className='absolute top-4 right-3 hover:text-yellow-400 cursor-pointer' onClick={onClose} />

                    {events.map((event) => (
                        <div key={event._id} className='border p-2 rounded-lg shadow-sm mb-2'>
                            <p><strong>ID:</strong> {event._id}</p>
                            <p><strong>Event Name:</strong> {event.eventName}</p>
                            <p><strong>Category:</strong> {event.category}</p>
                            <p><strong>Venue:</strong> {event.venue}</p>
                            <p><strong>Approx Budget:</strong> ₹{event.approxBudget}</p>
                            <p><strong>No. of Attendees:</strong> {event.noOfAttendees}</p>
                            <p><strong>Status:</strong> 
                                <span className={`px-2 py-1 text-white rounded-md
                                    ${event.status === "pending" ? "bg-yellow-500" :
                                        event.status === "approved" ? "bg-green-500" :
                                        event.status === "reject" ? "bg-red-500" :
                                        "bg-gray-500"}`}>
                                    {event.status}
                                </span>
                            </p>
                            <p><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
                            <p><strong>Description:</strong> {event.description}</p>

                            {/* Show buttons only if status is NOT "reject" or "cancel" */}
                            {(event.status !== "reject" && event.status !== "cancel") && (
                                <div className='mt-2 flex gap-2'>
                                    <button 
                                        className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600' 
                                        onClick={() => handleClick(event)}>
                                        Show Budgets
                                    </button>
                                    <button 
                                        className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600' 
                                        onClick={() => handleCancel(event._id)}>
                                        Cancel Event
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {showBudgetsModal && <EventBudgetModal onClose={() => setShowBudgetsModal(false)} />}
        </>
    );
};

export default EventModal;
