const express = require('express');
const router = express.Router();
const { uploadLessonVideo, createLesson } = require('../../controllers/lessons/createLessonsController');
const getLessonsByCourseIdController = require('../../controllers/lessons/getLessonsByCourseIdController');
const getLessonContentByIdController = require('../../controllers/lessons/getLessonContentByIdController');
const updateLessonController = require('../../controllers/lessons/updateLessonController');
const deleteLessonController = require('../../controllers/lessons/deleteLessonController');

router.post('/create', uploadLessonVideo, createLesson);
router.post('/fetchLessonsByCourseId/:courseId', getLessonsByCourseIdController);
router.get('/fetchLessonById/:lessonId', getLessonContentByIdController);
router.put('/update/:lessonId', uploadLessonVideo, updateLessonController);
router.delete('/delete/:lessonId', deleteLessonController);



module.exports = router;
