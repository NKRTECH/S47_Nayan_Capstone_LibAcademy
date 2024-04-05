// LearnerProfilePage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './LearnerProfilePage.css'; // Import CSS file for styling
import { logout } from '../../features/learners/LearnersSlice';

const LearnerProfilePage = () => {
  const learnerData = useSelector(state => state.learner.learnerData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State to manage editable fields
  const [editableData, setEditableData] = useState({
    firstName: learnerData.firstName || '',
    lastName: learnerData.lastName || '',
    email: learnerData.email || '',
    // Add more fields as needed
  });

  // State to track if the profile is in edit mode
  const [isEditMode, setIsEditMode] = useState(false);

  // Function to handle changes in editable fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Function to toggle edit mode
  const toggleEditMode = () => {
    setIsEditMode(prevMode => !prevMode);
  };

  // Function to submit updated profile data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/api/learner/profile', editableData);
      console.log('Profile updated:', response.data);
      // Optionally update local state or Redux store with updated data
      // Exit edit mode after successful update
      toggleEditMode();
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle error
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    // // Clear learner data and token from localStorage
    // localStorage.removeItem('learnerData');
    // localStorage.removeItem('token');

    // Redirect to the login page or perform any other necessary action
    navigate('/');
  };

  return (
    <div className="profile-page">
      <h2 className="profile-heading">Learner Profile</h2>
      {isEditMode ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">First Name:</label>
            <input 
              type="text" 
              id="name" 
              name="firstName" 
              value={editableData.firstName} 
              onChange={handleChange} 
              className="form-input" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Last Name:</label>
            <input 
              type="text" 
              id="name" 
              name="lastName" 
              value={editableData.lastName} 
              onChange={handleChange} 
              className="form-input" 
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={editableData.email} 
              readOnly
              className="form-input" 
            />
          </div>
          <button type="submit" className="btn-submit">Save Changes</button>
          <button onClick={toggleEditMode} className="btn-cancel">Cancel</button>
        </form>
      ) : (
        <div className="profile-read-only">
          <div><strong>First Name:</strong> {learnerData.firstName}</div>
          <div><strong>Last Name:</strong> {learnerData.lastName}</div>
          <div><strong>Email:</strong> {learnerData.email}</div>
          <button onClick={toggleEditMode} className="btn-edit">Edit</button>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      )}
    </div>
  );
};

export default LearnerProfilePage;
