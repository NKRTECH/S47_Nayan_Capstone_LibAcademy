// models/learner.js
const mongoose = require('mongoose');
const getDbConnection = require('../../config/database');

const learnerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const dbConnection = getDbConnection;
const Learners = dbConnection.model('Learners', learnerSchema, 'registered_Learners');

module.exports = Learners