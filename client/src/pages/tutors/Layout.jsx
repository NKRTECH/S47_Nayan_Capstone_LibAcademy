// Layout.jsx
import React from 'react';
import HeaderTutor from '../../components/tutor/HeaderTutor';
import './Layout.css'; // Import the CSS file

const Layout = ({ children }) => {
 return (
    <>
      <HeaderTutor />
      <main className="main-content">{children}</main> {/* Use the class if you're styling with a class */}
    </>
 );
};

export default Layout;
