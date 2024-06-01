const Courses = require("../../models/courses/coursesModel");
const Lessons = require("../../models/lessons/lessonsModel");

const getLessonsByCourseIdController = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { learnerId } = req.body; // Get learnerId from the request body
        console.log('courseId:--', courseId);
        console.log('learnerId:--', learnerId);

        // Fetch the course with enrolled learners
        const course = await Courses.findById(courseId).exec();
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        
        let courseObject = course.toObject();
        const { learnerIds, ...sanitizedCourse } = courseObject;
        const lessons = await Lessons.find({ courseId: courseId }).populate('courseId').populate('tutorId').exec();
        if (!lessons || lessons.length === 0) {
            return res.status(404).json({ message: 'No lessons found for this course', course: sanitizedCourse });
        }

        // Check if the learner is enrolled in the course
        const isEnrolled = course.learnerIds.some(learner => learner.toString() === learnerId);
        console.log('isEnrolled:--', isEnrolled);
        if (!isEnrolled) {
            return res.status(200).json({ message: 'Learner is not enrolled in this course', isEnrolled: false, lessons, course: sanitizedCourse });
        }


        res.status(200).json({ message: 'Lessons fetched successfully',isEnrolled: true, lessons, course: sanitizedCourse });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching lessons', error });
    }
};

const getLessonsByCourseIdTutorController = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        // console.log(courseId);
        const lessons = await Lessons.find({ courseId: courseId }).populate('courseId').exec();
        if (!lessons || lessons.length === 0) {
            return res.status(404).json({ message: 'No lessons found for this course' });
        }
        res.status(200).json({ message: 'Lessons fetched successfully', lessons });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching lessons', error });
    }
}

module.exports = {
    getLessonsByCourseIdController,
    getLessonsByCourseIdTutorController
}
