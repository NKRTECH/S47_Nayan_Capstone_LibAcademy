import { useState } from 'react';
import './TutorRegistrationPage.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { tutorRegisterThunk } from '../../features/tutors/TutorThunks';

const TutorRegistrationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Using useNavigate hook to handle navigation
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(tutorRegisterThunk(formData))
      .then(() => {
        // Redirect to the homepage after successful registration
        navigate('/tutor-home');
      })
      .catch(error => {
        console.error('Registration failed:', error);
      });
  };
  return (
    <div className="tutor-registration-container">
      <h2>Tutor Registration</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="firstName" 
          value={formData.firstName} 
          onChange={handleChange} 
          placeholder="First Name" 
          required 
        />
        <input 
          type="text" 
          name="lastName" 
          value={formData.lastName} 
          onChange={handleChange} 
          placeholder="Last Name" 
        />
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          placeholder="Email" 
          required 
        />
        <input 
          type="password" 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
          placeholder="Password" 
          required 
        />
        <input 
          type="password" 
          name="confirmPassword" 
          value={formData.confirmPassword} 
          onChange={handleChange} 
          placeholder="Confirm Password" 
          required 
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default TutorRegistrationPage;
