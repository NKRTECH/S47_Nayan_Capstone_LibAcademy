const mongoose = require('mongoose');
const getDbConnection = require('../../config/database');

const courseCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  // Add any other fields you may need for the category
}, {
  timestamps: true,
  optimisticConcurrency: true
});

const dbConnection = getDbConnection();
const CourseCategory = dbConnection.model('CourseCategory', courseCategorySchema, 'courseCategory');

module.exports = CourseCategory;