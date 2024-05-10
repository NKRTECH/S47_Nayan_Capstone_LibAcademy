import { useEffect, useState } from 'react';
import './TutorLoginPage.css'; // Adjust the import path as necessary
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { tutorLoginThunk } from '../../features/tutors/TutorThunks';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';
const googleClientId = '963011057711-md4pthsv1vv72dport7bp2pgg11rlj8t.apps.googleusercontent.com';


const TutorLoginPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate(); // Using useNavigate hook to handle navigation
    const isLoggedIn = useSelector(state => state.tutor.isLoggedIn); // Access the isLoggedIn flag
    console.log(isLoggedIn);
    const [credentials, setCredentials] = useState({
       username: '',
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
        dispatch(tutorLoginThunk(credentials))
        .then((action)=>{
         console.log('action:--', action);
            if(action.type === 'tutor/login/fulfilled'){
               console.log('Tutor logged in successfully:--', action.payload);
                navigate('/tutor/');
            }
        }).catch((error) => {
            console.error('Error logging in tutor:', error);
        });
     };

     const handleGoogleSuccess = async (response) => {
      const { credential } = response;
      try {
        const result = await axios.post(`${BASE_URL}/tutors/login/google`, { credential });
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('tutorData', JSON.stringify(result.data.tutor));
        navigate('/tutor/');
        window.location.reload();
      } catch (error) {
        console.error('Error logging in with Google OAuth:', error);
        alert(error.response.data.message);
      }
    };
  
    const handleGoogleError = (error) => {
      console.error('Google Sign-In error:', error);
    };

    return (
       <div className="login-page">
         <h2>Tutor Login</h2>
         <form onSubmit={handleSubmit}>
           <input 
            type="text" 
            name="username" 
            value={credentials.username} 
            onChange={handleChange} 
            placeholder="Username" 
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
            <button type="submit">Login</button>
         </form>
         <div className="google-signin">
           <GoogleOAuthProvider clientId={googleClientId}>
             <GoogleLogin onSuccess={handleGoogleSuccess} onFailure={handleGoogleError} scope="profile email" />
           </GoogleOAuthProvider>
         </div>
       </div>
    );
};

export default TutorLoginPage;