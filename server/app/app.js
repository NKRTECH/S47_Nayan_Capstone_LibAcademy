const express = require('express');
const mongoose = require('mongoose');
const tutorRoutes = require('../routes/tutors/tutorsRoute');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/tutors', tutorRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
