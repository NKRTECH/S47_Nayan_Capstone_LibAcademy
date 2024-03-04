// models/tutor.js
const mongoose = require('mongoose');
const getDbConnection = require('../../config/database');

const tutorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const dbConnection = getDbConnection('Tutor');
const Tutors = dbConnection.model('Tutors', tutorSchema, 'registered');

module.exports = Tutors;
