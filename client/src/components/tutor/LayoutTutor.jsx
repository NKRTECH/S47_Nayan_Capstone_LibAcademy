// Layout.jsx
import React from 'react';
import './LayoutTutor.css';
import NavTutor from './NavTutor';

const LayoutTutor = ({ children }) => {
 return (
    <>
      <NavTutor />
      <main className="main-content">{children}</main> {/* Use the class if you're styling with a class */}
    </>
 );
};

export default LayoutTutor;