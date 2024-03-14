const express = require('express');
const router = express.Router();
const registerTutorController = require('../../controllers/tutors/registerTutorController');
const loginTutorController = require('../../controllers/tutors/LoginTutorcontroller');

router.post('/register', registerTutorController);
router.post('/login', loginTutorController);

module.exports = router;