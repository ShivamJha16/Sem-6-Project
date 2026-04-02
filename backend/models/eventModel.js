const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    eventName: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    approxBudget: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['approved', 'reject', 'pending', 'cancel'],
        default: 'pending'
    },
    noOfAttendees: {
        type: Number,
        required: true
    }, 
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['silver', 'gold', 'platinum']
    }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;