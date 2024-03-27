const express = require('express');
const router = express.Router();
const multer = require('multer');
const Course = require('../../models/courses/coursesModel'); // Assuming you have a Course model defined

const uploadCourseController = async (req, res) => {
  try {
    const {category, title, description } = req.body;
    const fileUrl = req.file ? req.file.path : null; // Get the file path from Multer
    const course = await Course.create({
      category,
      title,
      description,
      // tutorId,
      fileUrl // Save the file URL in the database
    });
    res.status(201).json(course);
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = uploadCourseController;