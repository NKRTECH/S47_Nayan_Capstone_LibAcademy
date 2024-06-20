const Courses = require("../../models/courses/coursesModel");

const getCourseRatings = async (req, res) => {
  try {
    const { courseId } = req.params;
    console.log('Course ID:', courseId);
    const course = await Courses.findById(courseId).populate('ratings.learnerId', 'firstName lastName');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    console.log('Course:', course);
    res.json({ ratings: course.ratings });
  } catch (error) {
    console.error('Error fetching ratings:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const fetchUserRating = async (req, res) => {
  try {
    const { courseId, learnerId } = req.params;
    const course = await Courses.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    const ratingIndex = course.ratings.findIndex(r => r.learnerId.toString() === learnerId);
    if (ratingIndex === -1) {
      return res.status(404).json({ message: 'Rating not found' });
    }
    const rating = course.ratings[ratingIndex];
    res.json({ rating });
  } catch (error) {
    console.error('Error fetching user rating:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const addOrUpdateRating = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { learnerId, rating } = req.body;
    
    const course = await Courses.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    const existingRatingIndex = course.ratings.findIndex(r => r.learnerId.toString() === learnerId);
    if (existingRatingIndex !== -1) {
      // Update existing rating
      course.ratings[existingRatingIndex].rating = rating;
    } else {
      // Add new rating
      course.ratings.push({ learnerId, rating });
    }
    
    // Recalculate average rating and total ratings
    const totalRatings = course.ratings.length;
    const averageRating = course.ratings.reduce((acc, r) => acc + r.rating, 0) / totalRatings;
    
    course.totalRatings = totalRatings;
    course.averageRating = averageRating;
    
    await course.save();
    res.json({ message: 'Rating added/updated successfully', course });
  } catch (error) {
    console.error('Error adding/updating rating:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteRating = async (req, res) => {
  try {
    const { courseId, ratingId } = req.params;
    const course = await Courses.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    const ratingIndex = course.ratings.findIndex(r => r._id.toString() === ratingId);
    if (ratingIndex === -1) {
      return res.status(404).json({ message: 'Rating not found' });
    }
    
    course.ratings.splice(ratingIndex, 1);
    
    // Recalculate average rating and total ratings
    const totalRatings = course.ratings.length;
    const averageRating = totalRatings > 0 ? course.ratings.reduce((acc, r) => acc + r.rating, 0) / totalRatings : 0;
    
    course.totalRatings = totalRatings;
    course.averageRating = averageRating;
    
    await course.save();
    res.json({ message: 'Rating deleted successfully', course });
  } catch (error) {
    console.error('Error deleting rating:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getCourseRatings,
  fetchUserRating,
  addOrUpdateRating,
  deleteRating,
};
