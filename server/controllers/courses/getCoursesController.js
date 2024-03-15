const Courses = require("../../models/courses/coursesModel");

// Controller to fetch courses from the database
const getCourses = async (req, res) => {
  try {
    // Fetch courses from the database
    const courses = await Courses.find();
    res.json(courses); // Send courses as JSON response
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = getCourses;