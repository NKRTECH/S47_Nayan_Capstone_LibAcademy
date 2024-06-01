const express = require('express');
const tutorsRoutes = require('../routes/tutors/tutorsRoute');
const learnersRoutes = require('../routes/learners/learnersRoute');
const coursesRoutes = require('../routes/courses/coursesRoute');
const lessonsRoutes = require("../routes/lessons/lessonsRoute");
const paymentsRoutes = require("../routes/payments/paymentsRoute");
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();


const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// ***************Routes*************************

//*****************for tutors***************** */
app.use('/api/tutors', tutorsRoutes);

//*****************for learners***************** */
app.use('/api/learners', learnersRoutes);
app.use('/api/payments', paymentsRoutes);

//*****************for courses***************** */
app.use('/api/courses', coursesRoutes);

//********************for lessons**************** */
app.use('/api/lessons', lessonsRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));