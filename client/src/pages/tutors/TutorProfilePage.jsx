// TutorProfilePage.jsx
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { useSelector } from 'react-redux';
import './TutorProfilePage.css'; // Import CSS file for styling

const TutorProfilePage = () => {
  const tutorData = useSelector(state => state.tutor.tutorData); // Fetch tutor data from Redux store

  // State to manage editable fields
  const [editableData, setEditableData] = useState({
    name: tutorData.name || '',
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
      const response = await axios.put('/api/tutor/profile', editableData);
      console.log('Profile updated:', response.data);
      // Optionally update local state or Redux store with updated data
      // Exit edit mode after successful update
      toggleEditMode();
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle error
    }
  };

  return (
    <div className="profile-page">
      <h2 className="profile-heading">Tutor Profile</h2>
      {isEditMode ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name:</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={editableData.name} 
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
              onChange={handleChange} 
              className="form-input" 
            />
          </div>
          <button type="submit" className="btn-submit">Save Changes</button>
        </form>
      ) : (
        <div className="profile-read-only">
          <div><strong>Name:</strong> {tutorData.name}</div>
          <div><strong>Email:</strong> {tutorData.email}</div>
          <button onClick={toggleEditMode} className="btn-edit">Edit</button>
        </div>
      )}
    </div>
  );
};

export default TutorProfilePage;
