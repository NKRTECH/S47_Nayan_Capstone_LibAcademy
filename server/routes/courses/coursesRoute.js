const express = require("express");
const router = express.Router();
const multer = require('multer');
const Course = require('../../models/courses/coursesModel'); 

const getCoursesController = require("../../controllers/courses/getCoursesController");
const uploadCourseController = require("../../controllers/courses/uploadCourseController");
const { getCourseCategories } = require("../../controllers/courses/getCourseCategoryController");

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // Set the destination directory for uploaded files
    cb(null, 'uploads/courses'); // Change 'uploads/' to your desired upload directory
  },
  filename: function(req, file, cb) {
    // Set the file name for uploaded files
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// POST route for creating a new course
router.post('/create', upload.single('file'), uploadCourseController);

// GET route for getting course categories
router.get('/courseCategories', getCourseCategories);




module.exports = router