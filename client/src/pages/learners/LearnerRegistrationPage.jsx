// LearnerRegistrationPage.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './LearnerRegistrationPage.css';
import { learnerRegisterThunk } from '../../features/learners/LearnersThunks';

const LearnerRegistrationPage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { status, error } = useSelector((state) => state.learner);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(learnerRegisterThunk(formData));
  };

  return (
    <div className="registration-container">
      <div className="registration-box">
        <h2>Register as a Learner</h2>
        {status === 'failed' && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="registration-form">
          <input type="text" name="name" placeholder="name" value={formData.name} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
          <button type="submit" className="registration-button" disabled={status === 'loading'}>Register</button>
        </form>
      </div>
    </div>
  );
};

export default LearnerRegistrationPage;