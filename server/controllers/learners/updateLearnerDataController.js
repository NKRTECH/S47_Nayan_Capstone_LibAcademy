const Learners = require("../../models/learners/learnersModel");

const updateLearnerDataController = async (req, res) => {
    try {
        const learnerId = req.params.learnerId;
        console.log('Learner ID:', learnerId);

        // Find the learner by ID and update the data
        const updatedLearnerData = req.body;
        const learner = await Learners.findByIdAndUpdate(learnerId, updatedLearnerData, { new: true });
        if (!learner) {
            return res.status(404).json({ message: "Learner not found" });
        }
        return res.status(200).json({ learner });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = updateLearnerDataController