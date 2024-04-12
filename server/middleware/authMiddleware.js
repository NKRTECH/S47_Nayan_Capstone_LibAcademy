// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const secret_key = 'mysecretkey';

const isAuthenticated = (req, res, next) => {
  try {
    // Check if the token is provided in the request body
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify and decode the token
    const decodedToken = jwt.verify(token, secret_key);
    req.user = {
      _id: decodedToken.learnerId || decodedToken.tutorId, // Support both learnerId and tutorId
      email: decodedToken.email,
      role: decodedToken.role
    };
    console.log('req.user:--', req.user);

    next(); // Continue to the next middleware or route handler
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// Middleware to check for a specific role
const checkRole = (role) => (req, res, next) => {
  if (req.user && req.user.role === role) {
    next();
  } else {
    res.status(403).json({ message: `Requires ${role} role` });
  }
};

module.exports = { isAuthenticated, checkRole };
