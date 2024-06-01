const mongoose = require('mongoose');
const getDbConnection = require('../../config/database');

const paymentSchema = new mongoose.Schema({
    learnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Learners', // Assuming you have a Users collection
        required: true,
        index: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Courses', // Reference to the Courses collection
        required: true,
        index: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'INR',
        enum: ['USD', 'EUR', 'GBP', 'INR'], // Add more currencies as needed
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['credit_card', 'paypal', 'bank_transfer'], // Add more payment methods as needed
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        required: true
    }
}, {
    timestamps: true,
    optimisticConcurrency: true
});

const dbConnection = getDbConnection;
const Payments = dbConnection.model('Payments', paymentSchema, 'payments');

module.exports = Payments;
