const Lesson = require("../../models/lessons/lessonsModel");

const getLessonContentByIdController = async (req, res) => {
    try {
        const lessonId = req.params.lessonId;
        console.log('lessonId:--',lessonId);
        const lesson = await Lesson.findById(lessonId);
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }
        // console.log('lesson:--',lesson);
        res.status(200).json({ message: 'Lesson fetched successfully', lesson });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching lesson', error });
    }
}
module.exports = getLessonContentByIdController