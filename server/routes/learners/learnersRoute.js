const express = require('express');
const router = express.Router();
const registerLearnerController = require('../../controllers/learners/registerLearnerController');
const loginLearnerController = require('../../controllers/learners/loginLearnerController');

router.post('/register', registerLearnerController);
router.post('/login', loginLearnerController);

module.exports = router;