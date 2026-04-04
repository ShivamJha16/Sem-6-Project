import React, { useState } from 'react'
import { EventState } from '../Config/ContextApi';
import axios from 'axios';

const FeedbacksModal = ({onClose}) => {
    const { user } = EventState();
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newFeedback = { content, rating, userId: user._id };
            await axios.post('https://evento-prs2.onrender.com/api/feedback', newFeedback, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            alert('Feedback submitted successfully!');   
        } catch (error) {
            console.log(error);
            alert('Failed to submit feedback');
        }
    }

  return (
    <div className='fixed bg-black bg-opacity-50 inset-0 flex justify-center items-center z-20' onClick={onClose}>
        <div className='sm:w-[50%] w-full bg-white p-4 rounded-lg shadow-lg relative' onClick={(e) => e.stopPropagation()}>
            <h2 className='text-2xl font-bold text-center text-gray-700 mb-4'>Your Feedback</h2>
            <form className='space-y-4' onSubmit={handleSubmit}>
                <div>
                    <label className='block text-gray-600 font-medium'>Feedback</label>
                    <textarea 
                        className='w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500'
                        placeholder='Enter your feedback here'
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div>
                    <label className='block text-gray-600 font-medium'>Rating</label>
                    <select className='w-full outline-none p-2 border rounded-md focus:ring-2 focus:ring-blue-500' value={rating} onChange={(e) => setRating(e.target.value)}>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                    </select>
                </div>
                <div>
                    <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>Submit Feedback</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default FeedbacksModal