// Layout.jsx
import React from 'react';
import NavUser from './NavUser';
import './LayoutUser.css'; // Import the CSS file


const LayoutUser = ({ children }) => {
 return (
    <>
      <NavUser />
      <main className="main-content">{children}</main> {/* Use the class if you're styling with a class */}
    </>
 );
};

export default LayoutUser;
