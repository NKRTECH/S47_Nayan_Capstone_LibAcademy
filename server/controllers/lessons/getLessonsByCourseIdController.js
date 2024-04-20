const Courses = require("../../models/courses/coursesModel");
const Lessons = require("../../models/lessons/lessonsModel");

const getLessonsByCourseIdController = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        console.log('courseid:--',courseId);
        const lessons = await Lessons.find({ courseId: courseId }).populate('courseId').exec();
        // console.log(lessons);
        if (!lessons || lessons.length === 0) {
            return res.status(404).json({ message: 'No lessons found for this course' });
        }
        res.status(200).json({ message: 'Lessons fetched successfully', lessons });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching lessons', error });
    }
}
module.exports = getLessonsByCourseIdController;