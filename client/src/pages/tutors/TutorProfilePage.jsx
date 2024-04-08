// TutorProfilePage.jsx
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { useDispatch, useSelector } from 'react-redux';
import './TutorProfilePage.css'; // Import CSS file for styling
import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/tutors/TutorsSlice';

const TutorProfilePage = () => {
  const tutorData = useSelector(state => state.tutor.tutorData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State to manage editable fields
  const [editableData, setEditableData] = useState({
    firstName: tutorData.firstName || '',
    lastName: tutorData.lastName || '',
    email: tutorData.email || '',
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
      const response = await axios.put('http://localhost:3000/api/tutor/profile', editableData);
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
    // Dispatch logout action
    dispatch(logout());
    // Redirect to the login page or perform any other necessary action
    navigate('/');
    window.location.reload();

  };

  return (
    <div className="profile-page">
      <h2 className="profile-heading">Tutor Profile</h2>
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
          <div><strong>First Name:</strong> {tutorData.firstName}</div>
          <div><strong>Last Name:</strong> {tutorData.lastName}</div>
          <div><strong>Email:</strong> {tutorData.email}</div>
          <button onClick={toggleEditMode} className="btn-edit">Edit</button>
          <button onClick={handleLogout} className="btn-logout">Logout</button> {/* Logout button */}

        </div>
      )}
    </div>
  );
};

export default TutorProfilePage;
