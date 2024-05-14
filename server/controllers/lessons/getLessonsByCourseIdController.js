const Courses = require("../../models/courses/coursesModel");
const Lessons = require("../../models/lessons/lessonsModel");

const getLessonsByCourseIdController = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        console.log('courseid:--', courseId);

        // Fetch the course with enrolled learners
        const course = await Courses.findById(courseId).populate('learnerIds').exec();
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        const lessons = await Lessons.find({ courseId: courseId }).populate('courseId').populate('tutorId').exec();
        if (!lessons || lessons.length === 0) {
            return res.status(404).json({ message: 'No lessons found for this course', course });
        }

        res.status(200).json({ message: 'Lessons fetched successfully', lessons, enrolledLearners: course.learnerIds, course });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching lessons', error });
    }
}
module.exports = getLessonsByCourseIdController;
