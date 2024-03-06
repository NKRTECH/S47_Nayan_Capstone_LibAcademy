// controllers/registerLearnerController.js
const Learner = require('../../models/learners/learners');

const registerLearnerController = async (req, res) => {
    try {

        // Create a new learner document
        const learner = await Learner.create(req.body);

        // Return success response
        res.status(201).json({ message: 'Learner registered successfully', learner: learner });;
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = registerLearnerController;