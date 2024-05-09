import { useEffect, useState } from 'react';
import './LearnerLoginPage.css'; // Adjust the import path as necessary
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { learnerLoginThunk } from '../../features/learners/LearnersThunks';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
const BASE_URL = 'http://localhost:3000/api';


const googleClientId = '963011057711-md4pthsv1vv72dport7bp2pgg11rlj8t.apps.googleusercontent.com';


const LearnerLoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Using useNavigate hook to handle navigation

    const [credentials, setCredentials] = useState({
       email: '',
       password: ''
    });

    const handleChange = (e) => {
       const { name, value } = e.target;
       setCredentials(prevState => ({
         ...prevState,
         [name]: value
       }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(learnerLoginThunk(credentials))
        .then((action)=>{
          console.log(action);
          if(action.type === 'learner/login/fulfilled'){
            navigate('/learner/');
          }
        })
     };

     const handleGoogleSuccess = async (response) => {
      try {
        // Send the ID token to your backend for token generation
        const result = await axios.post(`${BASE_URL}/learners/login/google`, { credential: response.credential });
        console.log('Token generation result:', result.data);

        // Set the token in localStorage
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('learnerData', JSON.stringify(result.data.learner));
        // Navigate to the desired page after successful login
        navigate('/learner/');
        window.location.reload();
    } catch (error) {
        console.error('Error generating token with Google OAuth:', error);
        alert(error.response.data.message);
    }
  };

  const handleGoogleError = (error) => {
      console.error('Google Sign-In error:', error);
  };

    // useEffect(() => {
    //     // Only navigate if isLoggedIn is true and hasNavigated is false
    //     if (isLoggedIn && !hasNavigated) {
    //       navigate('/learner/');
    //       // Set hasNavigated to true to prevent further navigation
    //       setHasNavigated(true);
    //     }
    //  }, [isLoggedIn, navigate, hasNavigated]); // Include hasNavigated in the dependency array

     return (
        <div className="login-box">
          <div className="login-container">
            <h2>Learner Login</h2>
            <form onSubmit={handleSubmit} className="login-form">
              <input 
               type="email" 
               name="email" 
               value={credentials.email} 
               onChange={handleChange} 
               placeholder="Email" 
               required
              />
              <input 
               type="password" 
               name="password" 
               value={credentials.password} 
               onChange={handleChange} 
               placeholder="Password" 
               required
               />
               <button type="submit" className="login-button">Login</button>
               <GoogleOAuthProvider clientId={googleClientId}>
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onFailure={handleGoogleError}
                        scope="profile email"
                    />
                </GoogleOAuthProvider>
            </form>
          </div>
        </div>
     );
};

export default LearnerLoginPage;
