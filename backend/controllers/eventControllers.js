const Event = require("../models/eventModel");
const User = require("../models/userModel");

// Create Event (Only User)
const createEvent = async (req, res) => {
    try {
        if (req.user.role !== 'user') {
            return res.status(403).json({ message: "Only users can create events." });
        }
        
        const event = new Event({ ...req.body, userId: req.user._id });
        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const approveEvent = async (req, res) => {
  const event = await Event.findByIdAndUpdate(
    req.params.id,
    { status: "approved" },
    { new: true }
  );
  res.json(event);
};

const rejectEvent = async (req, res) => {
  const event = await Event.findByIdAndUpdate(
    req.params.id,
    { status: "rejected" },
    { new: true }
  );
  res.json(event);
};

// Cancel Event (Only User)
const cancelEvent = async (req, res) => {
    try {
        const event = await Event.findOne({ _id: req.body.eventId, userId: req.user._id });
        if (!event) {
            return res.status(404).json({ message: "Event not found or unauthorized." });
        }
        
        event.status = 'cancel';
        await event.save();
        res.status(200).json({ message: "Event cancelled successfully.", event });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Event Status (Only Admin)
const updateEventStatus = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Only admins can update event status." });
        }
        
        const event = await Event.findById(req.body.eventId);
        if (!event) {
            return res.status(404).json({ message: "Event not found." });
        }
        
        event.status = req.body.status;
        await event.save();
        res.status(200).json({ message: "Event status updated successfully.", event });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Event by User ID
const getEvent = async (req, res) => {
    try {
        const events = await Event.find({ userId: req.user._id }).populate("userId", "-password");
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get All Events (Only Admin)
const getAllEvents = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Only admins can access all events." });
        }
        
        const events = await Event.find().populate("userId", "-password");
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Event (Only User)
const updateEvent = async (req, res) => {
    try {
        const event = await Event.findOne({ _id: req.body.eventId, userId: req.user._id });
        if (!event) {
            return res.status(404).json({ message: "Event not found or unauthorized." });
        }
        
        Object.assign(event, req.body);
        await event.save();
        res.status(200).json({ message: "Event updated successfully.", event });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = {
  createEvent,
  cancelEvent,
  updateEventStatus,
  getEvent,
  getAllEvents,
  updateEvent,
  approveEvent,
  rejectEvent
};