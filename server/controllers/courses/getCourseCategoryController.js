// Import necessary modules
const CourseCategory = require('../../models/courses/courseCategoryModel');
// Controller function to get all course categories
const getCourseCategories = async (req, res) => {
  try {
    // Fetch all course categories from the database
    const categories = await CourseCategory.find();

    // Return the fetched categories as JSON response
    res.status(200).json(categories);
  } catch (error) {
    // Handle errors
    console.error('Error fetching course categories:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getCourseCategories
};
