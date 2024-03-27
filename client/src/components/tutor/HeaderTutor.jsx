import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './HeaderTutor.css';

const HeaderTutor = () => {
  const { status, tutorData } = useSelector(state => state.tutor);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">LibAcademy</Link>
      </div>
      <nav className="navigation">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/courses">Courses</Link></li>
          <li><Link to="/about">About Us</Link></li>
          
          {/* Conditionally render the tutor's name if registration is successful */}
          {status === 'succeeded' && tutorData && (
            <li>Welcome &nbsp;{tutorData.firstName}</li>
          ) || <li><Link to="/tutor/registration">Tutor Registration</Link></li>}
          {status === 'succeeded' && <li><Link to="/tutor/profile">Profile</Link></li>}
          {status !== 'succeeded' && <li><Link to="/tutor/login">Tutor Login</Link></li>}
        </ul>
      </nav>
    </header>
  );
};

export default HeaderTutor;