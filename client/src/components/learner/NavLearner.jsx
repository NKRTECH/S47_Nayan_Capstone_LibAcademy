import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './NavLearner.css';

const NavLearner = () => {
  const { status, learnerData } = useSelector(state => state.learner);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">LibAcademy</Link>
      </div>
      <nav className="navigation">
        <ul>
          <li><Link to="/learner-home">Home</Link></li>
          <li><Link to="/courses">Courses</Link></li>
          <li><Link to="/about">About Us</Link></li>
          
          {/* Conditionally render the learner's name if registration is successful */}
          {status === 'succeeded' && learnerData && (
            <li>Welcome &nbsp;{learnerData.name}</li>
          ) || <li><Link to="/learner/registration">Learner Registration</Link></li>}
          {status === 'succeeded' && <li><Link to="/learner/profile">Profile</Link></li>}
          {status !== 'succeeded' && <li><Link to="/learner/login">Learner Login</Link></li>}
        </ul>
      </nav>
    </header>
  );
};

export default NavLearner;