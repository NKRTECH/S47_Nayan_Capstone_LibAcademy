const express = require('express');
const router = express.Router();
const registerTutorController = require('../../controllers/tutors/registerTutorController');

router.post('/register', registerTutorController);

module.exports = router;