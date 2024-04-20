import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './NavTutor.css';

const NavTutor = () => {
  const { status, tutorData } = useSelector(state => state.tutor);
  // console.log('tutorData:--',tutorData)
  // console.log(localStorage.getItem('tutorData'));
  // console.log('status:--',status);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">LibAcademy</Link>
      </div>
      <nav className="navigation">
        <ul>
          <li><Link to="/tutor/">Home</Link></li>
          <li><Link to="/tutor/courses">Courses</Link></li>
          <li><Link to="tutor/about">About Us</Link></li>
          
          {/* Conditionally render the tutor's name if registration is successful */}
          {tutorData && (
            <li>Welcome &nbsp;{tutorData.firstName}</li>
          ) }
          {tutorData && <li><Link to="/tutor/profile">Profile</Link></li>}
        </ul>
      </nav>
    </header>
  );
};

export default NavTutor;