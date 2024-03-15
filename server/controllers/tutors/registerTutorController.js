// controllers/tutorController.js
const bcrypt = require('bcrypt');
const Tutors = require('../../models/tutors/tutorsModel');

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
        
        // Omit the password field from the response for security reasons
        const { password, ...tutorDataWithoutPassword } = tutor.toObject();
        console.log(tutorDataWithoutPassword);
        res.status(201).json({data:tutorDataWithoutPassword});
    } catch (error) {
        // Handle errors
        console.error('Error registering tutor:', error);
        res.status(500).send({ message: 'Internal server error' });
    }
};

module.exports = registerTutorController;
