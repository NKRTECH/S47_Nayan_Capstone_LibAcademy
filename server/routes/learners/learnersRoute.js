const express = require('express');
const router = express.Router();
const registerLearnerController = require('../../controllers/learners/registerLearnerController');

router.post('/register', registerLearnerController);

module.exports = router;