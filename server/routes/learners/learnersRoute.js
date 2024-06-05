const express = require('express');
const router = express.Router();
const {registerLearnerController, registerLearnerWithGoogleOAuth} = require('../../controllers/learners/registerLearnerController');
const {loginLearnerController, loginLearnerWithGoogleOAuth} = require('../../controllers/learners/loginLearnerController');
const updateLearnerDataController = require('../../controllers/learners/updateLearnerDataController');

router.post('/register', registerLearnerController);
router.post('/register/google', registerLearnerWithGoogleOAuth);
router.post('/login', loginLearnerController);
router.post('/login/google', loginLearnerWithGoogleOAuth);
router.put('/update/:learnerId', updateLearnerDataController);

module.exports = router;