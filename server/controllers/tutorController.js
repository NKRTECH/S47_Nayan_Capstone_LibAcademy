// controllers/tutorController.js
const Tutors = require('../models/tutors/tutors');

const registerTutorController = async (req, res) => {
    try {
        // Use the create method to insert a new tutor document
        const tutor = await Tutors.create(req.body);
        res.status(201).send(tutor);
    } catch (error) {
        res.status(400).send(error);
    }
};
module.exports = registerTutorController