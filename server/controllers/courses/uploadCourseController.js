const express = require('express');
const Course = require('../../models/courses/coursesModel'); // Course model

const uploadCourseController = async (req, res) => {
 try {
    const { title, description, tutorId } = req.body;
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
      fileUrl // Save the file URL in the database
    });
    console.log('Course created:', course);

    res.status(201).json(course);
 } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'Server error' });
 }
};

module.exports = uploadCourseController;




//******************************************************************** */


// const express = require('express');
// const Course = require('../../models/courses/coursesModel'); // Course model
// const CourseCategory = require('../../models/courses/courseCategoryModel'); // CourseCategory model

// const uploadCourseController = async (req, res) => {
//  try {
//     const { title, description } = req.body;
//     console.log(req.body);
//     const fileUrl = req.file ? req.file.path : null; // Get the file path from Multer
//     const categories = req.body.category.split(',');
//     console.log(categories);

//     // Ensure categories exist and get their _id values
//     const categoryIds = await Promise.all(categories.map(async (categoryName) => {
//       let category = await CourseCategory.findOne({ name: categoryName });
//       if (!category) {
//         // If the category doesn't exist, create it
//         category = new CourseCategory({ name: categoryName });
//         await category.save();
//       }
//       return category._id;
//     }));

//     const course = await Course.create({
//       categories: categoryIds, // Use the _id values of the categories
//       title,
//       description,
//       fileUrl // Save the file URL in the database
//     });

//     res.status(201).json(course);
//  } catch (error) {
//     console.error('Error creating course:', error);
//     res.status(500).json({ message: 'Server error' });
//  }
// };

// module.exports = uploadCourseController;

//*********************************************************************** */

// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const Course = require('../../models/courses/coursesModel'); // Assuming you have a Course model defined

// const uploadCourseController = async (req, res) => {
//   try {
//     const {category, title, description } = req.body;
//     const fileUrl = req.file ? req.file.path : null; // Get the file path from Multer
//     const course = await Course.create({
//       category,
//       title,
//       description,
//       // tutorId,
//       fileUrl // Save the file URL in the database
//     });
//     res.status(201).json(course);
//   } catch (error) {
//     console.error('Error creating course:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// module.exports = uploadCourseController;