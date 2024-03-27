const mongoose = require('mongoose');
const getDbConnection = require('../../config/database');

const courseSchema = new mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  fileUrl: { type: String },
  tutorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tutors' },
  lessonIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lessons' }]
}, {
  timestamps: true,
  optimisticConcurrency: true
});

// Define indexes
courseSchema.index({ title: 1 }); // Create an index on the 'title' field
courseSchema.index({ category: 1 }); // Create an index on the 'category' field


const dbConnection = getDbConnection();
const Courses = dbConnection.model('Courses', courseSchema, 'courses');

module.exports = Courses;