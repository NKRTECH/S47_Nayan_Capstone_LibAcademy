import { useState } from 'react';
import './TutorRegistrationPage.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { tutorRegisterThunk } from '../../features/tutors/TutorThunks';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api'; 
const googleClientId = '963011057711-md4pthsv1vv72dport7bp2pgg11rlj8t.apps.googleusercontent.com';


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
      .then((action)=>{
        console.log(action);
        if(action.type === 'tutor/register/fulfilled'){
          navigate('/tutor/');
        }
      })
      .catch(error => {
        console.error('Registration failed:', error);
      });
  };
  
  const handleGoogleSuccess = async (response) => {
    const { credential } = response;
    try {
      const result = await axios.post(`${BASE_URL}/tutors/register/google`, { credential });
      localStorage.setItem('token', result.data.token);
      localStorage.setItem('tutorData', JSON.stringify(result.data.tutor));
      navigate('/tutor/');
      window.location.reload();
    } catch (error) {
      console.error('Error registering with Google OAuth:', error);
    }
  };

  const handleGoogleError = (error) => {
    console.error('Google Sign-In error:', error);
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
      <div className="google-signin">
        <GoogleOAuthProvider clientId={googleClientId}>
          <GoogleLogin onSuccess={handleGoogleSuccess} onFailure={handleGoogleError} scope="profile email" />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
};

export default TutorRegistrationPage;
