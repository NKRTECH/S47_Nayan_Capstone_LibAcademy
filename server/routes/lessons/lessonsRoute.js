const express = require('express');
const router = express.Router();
const { uploadLessonVideo, createLesson } = require('../../controllers/lessons/createLessonsController');

router.post('/create', uploadLessonVideo, createLesson);

module.exports = router;
