import { useEffect, useState } from 'react';
import './TutorLoginPage.css'; // Adjust the import path as necessary
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { tutorLoginThunk } from '../../features/tutors/TutorThunks';

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
        dispatch(tutorLoginThunk(credentials));
     };

    useEffect(() => {
        if (isLoggedIn) {
          navigate('/home-tutor');
        }
     }, [isLoggedIn, navigate]);

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
       </div>
    );
};

export default TutorLoginPage;