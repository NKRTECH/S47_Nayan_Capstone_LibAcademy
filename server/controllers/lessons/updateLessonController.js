// src/controllers/lessons/lessonsController.js

const Lesson = require("../../models/lessons/lessonsModel");
const fs = require('fs');
const path = require('path');

const updateLessonController = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const { title, text, alt, description, priority } = req.body;
    // Convert priority from string to number
    const priorityNumber = Number(priority);

    const videoFile = req.file; // This might be undefined if no new file was uploaded

    // Find the existing lesson
    const existingLesson = await Lesson.findById(lessonId);
    // console.log('existingLesson priority:--',typeof existingLesson.priority);
    // console.log('priority from req.body:--',typeof priorityNumber);
    if (!existingLesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    // Check if the new priority value conflicts with an existing lesson's priority
    if (priorityNumber !== existingLesson.priority) {
      const existingPriorityLesson = await Lesson.findOne({
        courseId: existingLesson.courseId,
        priority: priorityNumber
      });
      if (existingPriorityLesson) {
        return res.status(400).json({ message: 'Priority order already exists for that course' });
      }
    }

    // If a new video file is uploaded, use it, otherwise keep the existing video URL
    const videoUrl = videoFile ? videoFile.path : existingLesson.content.media[0]?.url;

    const updatedData = {
      title,
      content: {
        text,
        media: [{
          type: 'video',
          alt: alt || existingLesson.content.media[0]?.alt, // Use new alt text or existing one
          description: description || existingLesson.content.media[0]?.description, // Use new description or existing one
          url: videoUrl // Use new video URL or existing one
        }]
      },
      priority // Update the priority
    };

    // Update the lesson in the database
    const updatedLesson = await Lesson.findByIdAndUpdate(lessonId, updatedData, { new: true });

    // If a new video file is uploaded and an old file exists, delete the old file
    if (videoFile && existingLesson.content.media[0]?.url) {
      const oldVideoPath = existingLesson.content.media[0].url;
      const fullPath = path.join(__dirname, '..', '..', oldVideoPath);
      fs.unlink(fullPath, (err) => {
        if (err) {
          console.error('Error deleting old video file:', err);
        }
      });
    }
    res.json(updatedLesson);
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = updateLessonController;