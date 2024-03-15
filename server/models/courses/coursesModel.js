const mongoose = require('mongoose');
const getDbConnection = require('../../config/database');

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  tutorId: mongoose.Schema.Types.ObjectId // Without using ref
});

const dbConnection = getDbConnection('Courses');
const Courses = dbConnection.model('Courses', courseSchema, 'courses');


module.exports = Courses;

