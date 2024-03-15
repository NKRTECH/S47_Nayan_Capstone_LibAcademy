// controllers/loginTutorController.js
const bcrypt = require('bcrypt');
const Tutors = require('../../models/tutors/tutorsModel');

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

        res.status(200).json({data:tutor});
    } catch (error) {
        // Handle errors
        console.error('Error logging in tutor:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = loginTutorController;
