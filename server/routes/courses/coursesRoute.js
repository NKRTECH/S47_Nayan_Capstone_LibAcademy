const express = require("express");
const router = express.Router();
// const addCoursesController = require("../../controllers/courses/addCoursesController");
const getCoursesController = require("../../controllers/courses/getCoursesController");

router.get('/getCourses', getCoursesController);

module.exports = router