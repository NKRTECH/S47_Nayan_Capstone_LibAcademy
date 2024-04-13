const express = require('express');
const router = express.Router();
const { uploadLessonVideo, createLesson } = require('../../controllers/lessons/createLessonsController');
const getLessonsByCourseIdController = require('../../controllers/lessons/getLessonsByCourseIdController');
const getLessonContentByIdController = require('../../controllers/lessons/getLessonContentByIdController');

router.post('/create', uploadLessonVideo, createLesson);
router.get('/fetchLessonsByCourseId/:courseId', getLessonsByCourseIdController);
router.get('/fetchLessonById/:lessonId', getLessonContentByIdController);

module.exports = router;
