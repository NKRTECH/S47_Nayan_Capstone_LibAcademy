import React from 'react';
import { Link } from 'react-router-dom';
import './NavUser.css';

const NavUser = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">LibAcademy</Link>
      </div>
      <nav className="navigation">
        <ul>
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/courses" className="nav-link">Courses</Link></li>
          <li><Link to="/about" className="nav-link">About Us</Link></li>
          <li><Link to="/tutor/registration" className="nav-link">Register as Tutor</Link></li>
          <li><Link to="/learner/registration" className="nav-link">Register as Learner</Link></li>
          <li><Link to="/tutor/login" className="nav-link">Login as Tutor</Link></li>
          <li><Link to="/learner/login" className="nav-link">Login as Learner</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default NavUser;
