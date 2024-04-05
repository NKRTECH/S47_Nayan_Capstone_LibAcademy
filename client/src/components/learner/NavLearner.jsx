import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './NavLearner.css';

const NavLearner = () => {
  const { status, learnerData } = useSelector(state => state.learner);
  console.log('learnerData: ', learnerData);
  console.log('local storage:--',localStorage.getItem('learnerData'));

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">LibAcademy</Link>
      </div>
      <nav className="navigation">
        <ul>
          <li><Link to="/learner/">Home</Link></li>
          <li><Link to="/courses">Courses</Link></li>
          <li><Link to="/about">About Us</Link></li>
          
          {/* Conditionally render the learner's name if registration is successful */}
          {learnerData && (
            <li>Welcome &nbsp;{learnerData.firstName}</li>
          ) }
          {learnerData && <li><Link to="/learner/profile">Profile</Link></li>}
        </ul>
      </nav>
    </header>
  );
};

export default NavLearner;