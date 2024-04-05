// PrivateRouteLearner.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateRouteLearner = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('jwt');
  if (!token) {
    return <Navigate to="/learner/login" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const { role } = decodedToken;

    if (role !== 'learner') {
      return <Navigate to="/" />;
    }
  } catch (error) {
    console.error('Error decoding token:', error);
    return <Navigate to="/learner/login" />;
  }

  return <Route {...rest} element={<Component />} />;
};

export default PrivateRouteLearner;
