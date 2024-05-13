// models/tutor.js
const mongoose = require('mongoose');
const getDbConnection = require('../../config/database');

const tutorSchema = new mongoose.Schema({
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
    }
}, {
    timestamps: true
});

const dbConnection = getDbConnection;
const Tutors = dbConnection.model('Tutors', tutorSchema, 'registered_Tutors');

module.exports = Tutors;
