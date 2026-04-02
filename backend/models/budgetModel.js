const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const budgetSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { 
        type: String, 
        required: true,
        enum: ['booked', 'reject', 'cancel', 'pending'],
        default: 'pending'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Budget', budgetSchema);