// controllers/registerLearnerController.js
const bcrypt = require('bcrypt');
const Learner = require('../../models/learners/learnersModel');

const registerLearnerController = async (req, res) => {
    try {
        const email = req.body.email;

        // Check if the learner already exists
        const existingLearner = await Learner.findOne( {email} );
        if (existingLearner) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new learner document with hashed password
        const newLearner = await Learner.create({
            ...req.body,
            password: hashedPassword
        });
        const {password, ...learnerDataWithoutPassword} = newLearner.toObject();

        // Return success response
        res.status(201).json({ message: 'Learner registered successfully', learner: learnerDataWithoutPassword });
    } catch (error) {
        // Handle errors
        console.error('Error registering learner:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = registerLearnerController;
