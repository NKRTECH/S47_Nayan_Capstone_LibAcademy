const mongoose = require('mongoose');
const getDbConnection = require('../../config/database');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  tutorId: { type: mongoose.Schema.Types.ObjectId, ref: 'registered_Tutors' },
  lessonIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'lesson' }]
});

// Define indexes
courseSchema.index({ title: 1 }); // Create an index on the 'title' field

const dbConnection = getDbConnection('LibAcademy');
const Courses = dbConnection.model('Courses', courseSchema, 'courses');

module.exports = Courses;