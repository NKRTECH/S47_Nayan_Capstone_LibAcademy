// controllers/tutorController.js
const bcrypt = require('bcrypt');
const Tutors = require('../../models/tutors/tutorsModel');
const jwt = require('jsonwebtoken');

const secret_key = 'mysecretkey';


const registerTutorController = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if the tutor already exists
        const existingTutor = await Tutors.findOne({ email });
        if (existingTutor) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new tutor document with the hashed password
        const tutor = await Tutors.create({
            ...req.body,
            password: hashedPassword // Replace plain password with hashed password
        });

        const token = jwt.sign(
            { tutorId: tutor._id, email: tutor.email, role: 'tutor' },
            secret_key,
            // process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        // Omit the password field from the response for security reasons
        const { password, ...tutorDataWithoutPassword } = tutor.toObject();
        console.log(tutorDataWithoutPassword);
        res.status(201).json({tutor:tutorDataWithoutPassword, token});
    } catch (error) {
        // Handle errors
        console.error('Error registering tutor:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
};

const registerTutorWithGoogleOAuth = async (req, res) => {
    try {
      const { credential } = req.body;
  
      // Verify the ID token (this is a simplified example; you should use a library like google-auth-library)
      const decodedToken = jwt.decode(credential);
      console.log('Decoded token:--', decodedToken);
      const { email, given_name, family_name } = decodedToken;
  
      // Check if the tutor already exists
      const existingTutor = await Tutors.findOne({ email });
      if (existingTutor) {
        return res.status(400).json({ message: 'Email is already registered' });
      }
  
      // Create a new tutor document
      const newTutor = await Tutors.create({
        email: email,
        firstName: given_name,
        lastName: family_name,
      });

      newTutor.toObject();
      // Remove the password field before sending the response
      delete newTutor.password;
      
      // Generate JWT token with role claim
      const token = jwt.sign(
        { tutorId: newTutor._id, email: newTutor.email, role: 'tutor' },
        secret_key,
        { expiresIn: '1h' }
      );
  
      // Return the JWT token
      res.json({tutor: newTutor, token});
    } catch (error) {
      console.error('Error registering tutor with Google OAuth:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  module.exports = { registerTutorController, registerTutorWithGoogleOAuth };