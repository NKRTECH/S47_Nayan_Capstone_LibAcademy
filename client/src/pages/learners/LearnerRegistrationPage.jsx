// // LearnerRegistrationPage.js

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import './LearnerRegistrationPage.css';
// import { learnerRegisterThunk } from '../../features/learners/LearnersThunks';
// import { useNavigate } from 'react-router-dom';
// import { GoogleOAuth } from '@react-oauth/google';

// const googleClientId = '963011057711-md4pthsv1vv72dport7bp2pgg11rlj8t.apps.googleusercontent.com';

// const LearnerRegistrationPage = () => {
//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
//   const { status, error, isLoggedIn } = useSelector((state) => state.learner);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(learnerRegisterThunk(formData));
//   };

//   useEffect(() => {
//     if (isLoggedIn) {
//       navigate('/learner/');
//     }
//  }, [isLoggedIn]);

//   return (
//     <div className="registration-container">
//       <div className="registration-box">
//         <h2>Register as a Learner</h2>
//         {status === 'failed' && <p className="error-message">{error}</p>}
//         <form onSubmit={handleSubmit} className="registration-form">
//           <input type="text" name="firstName" placeholder="first name" value={formData.firstName} onChange={handleChange} />
//           <input type="text" name="lastName" placeholder="last name" value={formData.lastName} onChange={handleChange} />
//           <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
//           <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
//           <button type="submit" className="registration-button" disabled={status === 'loading'}>Register</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LearnerRegistrationPage;


// LearnerRegistrationPage.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './LearnerRegistrationPage.css';
import { learnerRegisterThunk } from '../../features/learners/LearnersThunks';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
const BASE_URL = 'http://localhost:3000/api';


const googleClientId = '963011057711-md4pthsv1vv72dport7bp2pgg11rlj8t.apps.googleusercontent.com';

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
    dispatch(learnerRegisterThunk(formData))
    .then((action)=>{
       console.log('action:--', action);
          if(action.type === 'learner/register/fulfilled'){
             console.log('Learner registered successfully:--', action.payload);
              navigate('/learner/');
          }
      }).catch((error) => {
          console.error('Error registering learner:', error);
    })
 };

 const handleGoogleSuccess = async (response) => {
  console.log('Google response:--', response);
  const { credential } = response;

  try {
    // Send the ID token to your backend for verification and registration
    const result = await axios.post(`${BASE_URL}/learners/register/google`, { credential });
    console.log('Registration result:', result.data);
    localStorage.setItem('token', result.data.token);
    localStorage.setItem('learnerData', JSON.stringify(result.data.learner));
    navigate('/learner/');
    window.location.reload();
  } catch (error) {
    console.error('Error registering with Google OAuth:', error);
  }
};

 const handleGoogleError = (error) => {
    console.error(error);
    // Handle errors from Google Sign-In
 };

//  useEffect(() => {
//     if (isLoggedIn) {
//       navigate('/learner/');
//     }
//  }, [isLoggedIn, navigate]);

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
        <div className="google-signin">
          <GoogleOAuthProvider clientId={googleClientId}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onFailure={handleGoogleError}
              scope="profile email"
            />
          </GoogleOAuthProvider>
        </div>
      </div>
    </div>
 );
};

export default LearnerRegistrationPage;