const express = require('express');
const router = express.Router();
const {registerLearnerController, registerLearnerWithGoogleOAuth} = require('../../controllers/learners/registerLearnerController');
const {loginLearnerController, loginLearnerWithGoogleOAuth} = require('../../controllers/learners/loginLearnerController');

router.post('/register', registerLearnerController);
router.post('/register/google', registerLearnerWithGoogleOAuth);
router.post('/login', loginLearnerController);
router.post('/login/google', loginLearnerWithGoogleOAuth);

module.exports = router;