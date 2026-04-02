const Feedback = require("../models/feedbackModel");
const User = require("../models/userModel");

// Create Feedback
const createFeedback = async (req, res) => {
    try {
        const feedback = new Feedback({ ...req.body, userId: req.user._id });
        await feedback.save();
        res.status(201).json(feedback);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Feedbacks
const getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find().populate("userId", "-password");
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createFeedback, getAllFeedbacks };
