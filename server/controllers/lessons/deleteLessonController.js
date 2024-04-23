// src/controllers/lessons/deleteLessonController.js

const Lesson = require('../../models/lessons/lessonsModel');
const Courses = require('../../models/courses/coursesModel');
const fs = require('fs');
const path = require('path');

const deleteLessonController = async (req, res) => {
  const { lessonId } = req.params;

  try {
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    // Remove lesson ID from course model
    await Courses.updateOne(
      { _id: lesson.courseId },
      { $pull: { lessonIds: lessonId } }
    );

    // Delete video file from server
    const videoFilePath = lesson.content.media[0]?.url;
    if (videoFilePath) {
      const fullPath = path.join(__dirname, '..', '..', videoFilePath);
      // Check if the file exists before attempting to delete
      if (fs.existsSync(fullPath)) {
        fs.unlink(fullPath, (err) => {
          if (err) {
            console.error('Error deleting video file:', err);
          }
        });
      }
    }

    // Delete lesson from database
    await Lesson.findByIdAndDelete(lessonId);

    res.json({ message: 'Lesson deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting lesson', error });
  }
};

module.exports = deleteLessonController;