import { useEffect, useState } from 'react';
import './LearnerLoginPage.css'; // Adjust the import path as necessary
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { learnerLoginThunk } from '../../features/learners/LearnersThunks';
// import { learnerLoginThunk } from '../../features/learners/LearnerThunks';

const LearnerLoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Using useNavigate hook to handle navigation
    const isLoggedIn = useSelector(state => state.learner.isLoggedIn); // Access the isLoggedIn flag

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
        dispatch(learnerLoginThunk(credentials));
     };

    useEffect(() => {
        if (isLoggedIn) {
          navigate('/learner-home');
        }
     }, [isLoggedIn, navigate]);

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
            </form>
          </div>
        </div>
     );
};

export default LearnerLoginPage;
