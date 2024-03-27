const mongoose = require('mongoose');
const getDbConnection = require('../../config/database');

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true},
  content: {
    text: { type: String },
    media: [{
      type: { type: String },
      url: { type: String },
      alt: { type: String },
      description: { type: String }
    }],
    embedded: [String],
    structuredData: mongoose.Schema.Types.Mixed
  },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Courses', required: true }
});

// Define indexes
lessonSchema.index({ title: 1 }); // Create an index on the 'title' field
lessonSchema.index({ courseId: 1 }); // Create an index on the 'courseId' field

const dbConnection = getDbConnection();
const Lesson = dbConnection.model('Lessons', lessonSchema, 'lessons');

module.exports = Lesson;