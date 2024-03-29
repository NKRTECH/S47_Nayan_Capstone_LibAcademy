// controllers/loginLearnerController.js
const bcrypt = require('bcrypt');
const Learners = require('../../models/learners/learnersModel');

const loginLearnerController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the learner exists in the database
        const learner = await Learners.findOne({ email });
        if (!learner) {
            return res.status(404).json({ message: 'Learner not found' });
        }

        // Compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(password, learner.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        res.status(200).json({ data: learner });
    } catch (error) {
        // Handle errors
        console.error('Error logging in learner:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = loginLearnerController;
