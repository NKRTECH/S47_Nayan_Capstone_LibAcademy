const express = require('express');
const Course = require('../../models/courses/coursesModel'); // Course model

const uploadCourseController = async (req, res) => {
 try {
   const { title, description, tutorId, price, duration, startDate } = req.body;
   //  console.log(req.body);
    const fileUrl = req.file ? req.file.path : null; // Get the file path from Multer
   //  const fileUrl = req.file ? req.file.path.replace(/\\/g, '/') : null;
    const categoryIds = req.body.category.split(','); // Assuming category is a comma-separated string of IDs
   //  console.log(categoryIds);

   const course = await Course.create({
      categories: categoryIds, // Use the IDs directly
      title,
      description,
      tutorId,
      fileUrl, // Save the file URL in the database
      price, // Course price
      duration, // Estimated time to complete the course
      startDate // Start date of the course, if applicable
    });

   //  console.log('Course created:', course);

    res.status(201).json(course);
 } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'Server error' });
 }
};

module.exports = uploadCourseController;
