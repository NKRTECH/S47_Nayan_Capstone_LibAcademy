const express = require('express');
const router = express.Router();
const {registerTutorController, registerTutorWithGoogleOAuth} = require('../../controllers/tutors/registerTutorController');
const {loginTutorController, loginTutorWithGoogleOAuth} = require('../../controllers/tutors/LoginTutorcontroller');

router.post('/register', registerTutorController);
router.post('/register/google', registerTutorWithGoogleOAuth);
router.post('/login', loginTutorController);
router.post('/login/google', loginTutorWithGoogleOAuth);

module.exports = router;