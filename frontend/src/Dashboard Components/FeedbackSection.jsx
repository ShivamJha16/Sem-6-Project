import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FeedbackSection = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    const getFeedbacks = async () => {
        try {
            const { data } = await axios.get('https://evento-prs2.onrender.com/api/feedback');
            setFeedbacks(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getFeedbacks();
    }, []);

    return (
        <div className="p-4 bg-gray-100 h-[400px] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">User Feedback</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {feedbacks.map((feedback) => (
                    <div key={feedback._id} className="bg-white p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-800">{feedback.userId.username}</h3>
                        <p className="text-sm text-gray-500">{feedback.userId.email}</p>
                        <p className="mt-2 text-gray-700">"{feedback.content}"</p>
                        <p className="mt-2 text-yellow-500 font-bold">⭐ {feedback.rating}/5</p>
                        <p className="text-xs text-gray-400">{new Date(feedback.createdAt).toDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeedbackSection;
