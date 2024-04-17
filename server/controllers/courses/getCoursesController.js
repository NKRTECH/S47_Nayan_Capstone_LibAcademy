const mongoose = require('mongoose');
const Courses = require('../../models/courses/coursesModel');

// Example function to get a course by ID with categories populated
async function getCourseWithCategories(courseId) {
 try {
    const course = await Courses.findById(courseId).populate('categories');
    return course;
 } catch (error) {
    console.error(error);
    throw error; // Or handle the error as needed
 }
}