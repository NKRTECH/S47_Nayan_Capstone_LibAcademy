// controllers/loginTutorController.js
const bcrypt = require('bcrypt');
const Tutors = require('../../models/tutors/tutorsModel');
const jwt = require('jsonwebtoken');

const secret_key = 'mysecretkey';

const loginTutorController = async (req, res) => {
    try {
        const { username, password } = req.body;
        const email = username

        // Check if the tutor exists in the database
        const tutor = await Tutors.findOne({ email });
        if (!tutor) {
            return res.status(404).json({ message: 'Tutor not found, here it is problem' });
        }

        // Compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(password, tutor.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign(
            { tutorId: tutor._id, email: tutor.email, role: 'tutor', },
            secret_key,
            // process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({tutor:tutor.toObject(),token});
    } catch (error) {
        // Handle errors
        console.error('Error logging in tutor:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const loginTutorWithGoogleOAuth = async (req, res) => {
    try {
      const { credential } = req.body;
  
      // Verify the ID token (this is a simplified example; you should use a library like google-auth-library)
      const decodedToken = jwt.decode(credential);
      console.log('Decoded token:--', decodedToken);
      const { email } = decodedToken;
  
      // Check if the tutor exists
      const tutor = await Tutors.findOne({ email });
      if (!tutor) {
        return res.status(404).json({ message: 'Tutor not found' });
      }
  
      // Generate JWT token with role claim
      const token = jwt.sign(
        { tutorId: tutor._id, email: tutor.email, role: 'tutor' },
        secret_key,
        { expiresIn: '1h' }
      );
  
      // Return the JWT token
      res.json({tutor: tutor.toObject(), token});
    } catch (error) {
      console.error('Error logging in tutor with Google OAuth:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  module.exports = { loginTutorController, loginTutorWithGoogleOAuth };