const Courses = require("../../models/courses/coursesModel");

// Get all reviews for a specific course
const getCourseReviews = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Courses.findById(courseId).populate('reviews.learnerId', 'firstName lastName');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json({ reviews: course.reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Add a new review to a course
const addCourseReview = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { learnerId, comment } = req.body;

    const course = await Courses.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Add the new review
    const newReview = {
      learnerId,
      comment,
      createdAt: new Date(),
    };
    course.reviews.push(newReview);

    // Save the updated course
    await course.save();
    res.json({ message: 'Review added successfully', course });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update an existing review for a course
const updateCourseReview = async (req, res) => {
  try {
    const { courseId, reviewId } = req.params;
    const { comment } = req.body;

    const course = await Courses.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const reviewIndex = course.reviews.findIndex(r => r._id.toString() === reviewId);
    if (reviewIndex === -1) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Update the review
    course.reviews[reviewIndex].comment = comment;
    course.reviews[reviewIndex].createdAt = new Date(); // Update the review date

    // Save the updated course
    await course.save();
    res.json({ message: 'Review updated successfully', course });
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a review from a course
const deleteCourseReview = async (req, res) => {
  try {
    const { courseId, reviewId } = req.params;

    const course = await Courses.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const reviewIndex = course.reviews.findIndex(r => r._id.toString() === reviewId);
    if (reviewIndex === -1) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Remove the review
    course.reviews.splice(reviewIndex, 1);

    // Save the updated course
    await course.save();
    res.json({ message: 'Review deleted successfully', course });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getCourseReviews, addCourseReview, updateCourseReview, deleteCourseReview }