const Courses = require("../../models/courses/coursesModel");

const deleteCourseReview = async (req, res) => {
    const { learnerId, courseId, reviewId } = req.params;
    try {
      const course = await Courses.findById(courseId);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      const reviewIndex = course.reviews.findIndex(review => review._id.toString() === reviewId);
      if (reviewIndex === -1) {
        return res.status(404).json({ message: 'Review not found' });
      }
      course.reviews.splice(reviewIndex, 1);
      await course.save();
      return res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
      console.error('Error deleting course review:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
  
  module.exports = deleteCourseReview