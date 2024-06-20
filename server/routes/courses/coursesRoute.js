const express = require("express");
const router = express.Router();
const multer = require('multer');
const Course = require('../../models/courses/coursesModel'); 

const getCoursesController = require("../../controllers/courses/getCoursesController");
const uploadCourseController = require("../../controllers/courses/uploadCourseController");
const { getCourseCategories } = require("../../controllers/courses/getCourseCategoryController");
const getCoursesByCategoriesController = require("../../controllers/courses/getCoursesByCategoriesController");
// Import the authentication middleware
const { isAuthenticated, checkRole } = require('../../middleware/authMiddleware');
const getCoursesByTutor = require("../../controllers/courses/getCoursesByTutor");
const getCoursesByLearnerController = require("../../controllers/courses/getCoursesByLearnerController");
const { getCourseRatings, addOrUpdateRating, deleteRating, fetchUserRating } = require("../../controllers/courses/handleCourseRatingController");
const { getCourseReviews, addCourseReview, deleteCourseReview, updateCourseReview } = require("../../controllers/courses/handleCourseReviewController");

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

// POST route for creating a new course, accessible only by tutors
router.post('/create', isAuthenticated, checkRole('tutor'), upload.single('file'), uploadCourseController);

// GET route for getting course categories
router.get('/courseCategories', getCourseCategories);

// GET route for fetching courses by multiple categories
router.get('/fetchCoursesByCategories', getCoursesByCategoriesController);

// GET route for fetching courses by tutor
router.get('/fetchCoursesByTutor/:tutorId', getCoursesByTutor);

// GET route for fetching courses in which a learner is enrolled
router.get('/fetchCoursesByLearnerId/:learnerId', getCoursesByLearnerController);

router.post('/:courseId/reviews', addCourseReview);
router.get('/:courseId/reviews', getCourseReviews);
router.put('/:courseId/reviews/:reviewId', updateCourseReview);
router.delete('/:courseId/reviews/:reviewId', deleteCourseReview);

router.get('/:courseId/ratings', getCourseRatings);
router.get('/:courseId/ratings/:learnerId', fetchUserRating);
router.post('/:courseId/ratings', addOrUpdateRating);
router.delete('/:courseId/ratings/:ratingId', deleteRating);

module.exports = router