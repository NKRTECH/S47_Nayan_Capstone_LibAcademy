import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Unauthorized.css'; // Import CSS file for styling

const Unauthorized = () => {
    const location = useLocation();
    console.log(location.state.role);

  return (
    <div className="unauthorized-container">
      <h1 className="unauthorized-title">Unauthorized Access</h1>
      <p className="unauthorized-message">You are not authorized to access this page.</p>
      <p className="unauthorized-message">Please log in with the correct account or role.</p>
      <p className="unauthorized-message">
        Click 
        {location.state && location.state.role === 'tutor' ? (
          <Link to="/tutor/" className="unauthorized-link"> here</Link>
        ) : (
          <Link to="/learner/" className="unauthorized-link">here</Link>
        )}
        to go back to the home page.</p>
    </div>
  );
};

export default Unauthorized;