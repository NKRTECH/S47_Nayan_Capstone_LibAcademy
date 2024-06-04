const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Learners = require('../../models/learners/learnersModel');

const secret_key = 'mysecretkey';

const loginLearnerController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the learner exists in the database and convert to plain object
        const learner = await Learners.findOne({ email }).lean();
        if (!learner) {
            return res.status(404).json({ message: 'Learner not registered' });
        }

        // Compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(password, learner.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Remove the password field before sending the response
        delete learner.password;

        // Generate JWT token
        const token = jwt.sign(
            { learnerId: learner._id, email: learner.email, role: 'learner' },
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
        });

        // Send success response
        res.status(200).json({ token, learner:learner});
    } catch (error) {
        // Handle errors
        console.error('Error logging in learner:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const loginLearnerWithGoogleOAuth = async (req, res) => {
    try {
        const { credential } = req.body;

        // Verify the ID token (this is a simplified example; you should use a library like google-auth-library)
        const decodedToken = jwt.decode(credential);
        const { email } = decodedToken;

        // Check if the learner exists in the database
        const learner = await Learners.findOne({ email });
        if (!learner) {
            return res.status(404).json({ message: 'Learner not registered' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { learnerId: learner._id, email: learner.email, role: 'learner' },
            secret_key,
            { expiresIn: '1h' }
        );

        // Set JWT as an HTTP-only cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000,
        });

        // Send success response
        res.status(200).json({ token, learner: learner.toObject() });
    } catch (error) {
        console.error('Error logging in learner with Google OAuth:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { loginLearnerController, loginLearnerWithGoogleOAuth };