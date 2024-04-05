// PrivateRouteTutor.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateRouteTutor = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('jwt');
  if (!token) {
    return <Navigate to="/tutor/login" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const { role } = decodedToken;

    if (role !== 'tutor') {
      return <Navigate to="/" />;
    }
  } catch (error) {
    console.error('Error decoding token:', error);
    return <Navigate to="/tutor/login" />;
  }

  return <Route {...rest} element={<Component />} />;
};

export default PrivateRouteTutor;
