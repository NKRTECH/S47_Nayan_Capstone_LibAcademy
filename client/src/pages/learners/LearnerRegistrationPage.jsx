// LearnerRegistrationPage.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './LearnerRegistrationPage.css';
import { learnerRegisterThunk } from '../../features/learners/LearnersThunks';
import { useNavigate } from 'react-router-dom';

const LearnerRegistrationPage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const { status, error, isLoggedIn } = useSelector((state) => state.learner);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(learnerRegisterThunk(formData));
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/learner/');
    }
 }, [isLoggedIn]);

  return (
    <div className="registration-container">
      <div className="registration-box">
        <h2>Register as a Learner</h2>
        {status === 'failed' && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="registration-form">
          <input type="text" name="firstName" placeholder="first name" value={formData.firstName} onChange={handleChange} />
          <input type="text" name="lastName" placeholder="last name" value={formData.lastName} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
          <button type="submit" className="registration-button" disabled={status === 'loading'}>Register</button>
        </form>
      </div>
    </div>
  );
};

export default LearnerRegistrationPage;