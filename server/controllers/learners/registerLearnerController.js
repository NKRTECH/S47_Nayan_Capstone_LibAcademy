const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Learner = require('../../models/learners/learnersModel');

const secret_key = 'mysecretkey';

const registerLearnerController = async (req, res) => {
    try {
        const email = req.body.email;

        // Check if the learner already exists
        const existingLearner = await Learner.findOne({ email });
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
        const { password, ...learnerDataWithoutPassword } = newLearner.toObject();

        // Generate JWT token
        const token = jwt.sign(
            { learnerId: newLearner._id, email: newLearner.email, role: 'learner' },
            secret_key,
            // process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Set JWT as an HTTP-only cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Secure cookie in production
            sameSite: 'strict', // Prevent CSRF attacks
            maxAge: 3600000, // 1 hour expiration time
            // other cookie options if needed
        });

        // Return success response with JWT token
        res.status(201).json({ learner: learnerDataWithoutPassword, token });
    } catch (error) {
        // Handle errors
        console.error('Error registering learner:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const registerLearnerWithGoogleOAuth = async (req, res) => {
    try {
        const { credential } = req.body;

        // Verify the ID token (this is a simplified example; you should use a library like google-auth-library)
        const decodedToken = jwt.decode(credential);
        console.log('Decoded token:--', decodedToken);
        const { email, given_name, family_name } = decodedToken;

        // Check if the user already exists
        const existingLearner = await Learner.findOne({ email });
        if (existingLearner) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        // Create a new learner document
        const newLearner = await Learner.create({
            email: email,
            firstName: given_name,
            lastName: family_name,
        });

        // Generate JWT token with role claim
        const token = jwt.sign(
            { learnerId: newLearner._id, email: newLearner.email, role: 'learner' },
            secret_key,
            { expiresIn: '1h' }
        );

        // Return the JWT token
        res.json({learner: newLearner ,token });
    } catch (error) {
        // Handle errors
        console.error('Error registering learner with Google OAuth:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { registerLearnerController, registerLearnerWithGoogleOAuth };