// controllers/tutorController.js
const bcrypt = require('bcrypt');
const Tutors = require('../../models/tutors/tutors');

const registerTutorController = async (req, res) => {
    try {
        // Generate a salt and hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new tutor document with the hashed password
        const tutor = await Tutors.create({
            ...req.body,
            password: hashedPassword // Replace plain password with hashed password
        });
        
        // Omit the password field from the response for security reasons
        const { password, ...tutorDataWithoutPassword } = tutor.toObject();
        res.status(201).send(tutorDataWithoutPassword);
        } catch (error) {
        res.status(400).send(error);
    }
};
module.exports = registerTutorController;