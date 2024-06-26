const Lesson = require('../../models/lessons/lessonsModel');
const Courses = require('../../models/courses/coursesModel'); // Import the Courses model
const multer = require('multer');
const path = require('path'); // Required for path.extname

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/lessons');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const uploadLessonVideo = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
  fileFilter: function (req, file, cb) {
    const filetypes = /mp4|avi|mov/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Error: File upload only supports the following filetypes - " + filetypes));
  }
}).single('videoFile'); // Assuming 'videoFile' is the field name for the uploaded file

const createLesson = async (req, res) => {
  try {
    const { title, content, courseId, tutorId, priority } = req.body;
    const videoFile = req.file; // Access the uploaded file

    if (!videoFile) {
      return res.status(400).json({ message: 'No video file uploaded' });
    }

    // Parse the content JSON string to get the text, alt, and description
    const parsedContent = JSON.parse(content);
    const { text, media } = parsedContent;
    const { alt, description } = media.length > 0 ? media[0] : {};

    // Check if priority order already exists for that course
    const checkPriority = await Lesson.findOne({ courseId, priority });
    if (checkPriority) {
      return res.status(400).json({ message: 'Priority order already exists for that course' });
    }

    // Create a new lesson
    const lesson = new Lesson({
      title,
      content: {
        text,
        media: [{
          type: 'video',
          url: videoFile.path, // Store the path to the uploaded file
          alt, // Use the alt text from the parsed content
          description // Use the description from the parsed content
        }]
      },
      courseId, // Associate the lesson with the provided courseId
      tutorId,
      priority
    });

    const savedLesson = await lesson.save();


    // Find the course by its ID and update it by adding the new lesson ID
    const course = await Courses.findById(courseId);
    if (!course) {
      // If the course is not found, you can decide how to handle it.
      // For example, you could remove the created lesson and send a 404 error.
    //   await Lesson.findByIdAndDelete(savedLesson._id);
      return res.status(404).json({ message: 'Course not found' });
    }
    course.lessonIds.push(savedLesson._id); // Add the new lesson ID to the lessonIds array
    await course.save(); // Save the updated course

    res.status(201).json({ message: 'Lesson created successfully', lesson: savedLesson });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', error });
    }
    res.status(500).json({ message: 'Error creating lesson', error });
  }
};

// Export the upload middleware to be used in your routes
module.exports = {
  uploadLessonVideo,
  createLesson
};
