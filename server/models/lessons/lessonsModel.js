const mongoose = require('mongoose');
const getDbConnection = require('../../config/database');

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: {
    text: { type: String, required: true },
    media: [{
      type: { type: String, enum: ['video', 'image', 'audio'], required: true },
      url: { type: String, required: true },
      alt: { type: String, required: true },
      description: { type: String, required: true }
    }],
    embedded: [String],
    structuredData: mongoose.Schema.Types.Mixed
  },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Courses', required: true },
  tutorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tutor', required: true },
  priority: { type: Number, default: 0 }
}, {
  timestamps: true,
  optimisticConcurrency: true
});

// Define indexes
lessonSchema.index({ title: 1, courseId: 1 }, { unique: true }); // Composite unique index

const dbConnection = getDbConnection;
const Lesson = dbConnection.model('Lessons', lessonSchema, 'lessons');

module.exports = Lesson;