const mongoose = require('mongoose');
const getDbConnection = require('../../config/database');

const courseSchema = new mongoose.Schema({

  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CourseCategory', required: true }],
  title: { type: String, required: true },
  description: { type: String, required: true },
  tutorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tutors' },
  lessonIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lessons' }],
  learnerIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Learners' }],
  fileUrl: { type: String },
  // New fields for popularity, reviews, and stars
  popularity: { type: Number, default: 0 }, // A numeric value representing the course's popularity
  reviews: [{ // An array of review objects
     learnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Learners' }, // The user who wrote the review
     comment: { type: String }, // The review comment
     createdAt: { type: Date, default: Date.now } // The date the review was created
  }],
  ratings: [{ // An array of rating objects
    learnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Learners', unique: true }, // The user who rated
    rating: { type: Number, min: 1, max: 5 } // The rating given by the user (1-5 stars)
  }],
  averageRating: { type: Number, default: 0 }, // The average rating of the course
  totalRatings: { type: Number, default: 0 }, // The total number of ratings the course has received
  // Additional fields for the course card
  price: { type: Number, default: 0 }, // Course price, if applicable
  duration: { type: String }, // Estimated time to complete the course
  enrollmentCount: { type: Number, default: 0 }, // Number of users enrolled in the course
  startDate: { type: Date }, // Start date of the course, if applicable
  // Note: Progress is typically calculated on the client side based on user interactions
  }, {
   timestamps: true,
   optimisticConcurrency: true
});

// Define indexes
courseSchema.index({ title: 1 }); // Create an index on the 'title' field
courseSchema.index({ categories: 1 }); // Create an index on the 'category' field

const dbConnection = getDbConnection;
const Courses = dbConnection.model('Courses', courseSchema, 'courses');

module.exports = Courses;