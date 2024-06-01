const Learners = require("../../models/learners/learnersModel");

const getCoursesByLearnerController = async (req, res) => {
    const learnerId = req.params.learnerId;
    try {
        // Find the learner by ID and populate the enrolledCoursesIds field excluding the learnerId
        const learner = await Learners.findById(learnerId).populate({
            path: 'enrolledCoursesIds',
            select: '-learnerIds', // Exclude the learnerId field
        });

        if (!learner) {
            return res.status(404).json({ message: "Learner not found" });
        }

        // Extract the courses from the populated enrolledCoursesIds field
        const enrolledCourses = learner.enrolledCoursesIds;

        return res.status(200).json({ enrolledCourses });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = getCoursesByLearnerController;
