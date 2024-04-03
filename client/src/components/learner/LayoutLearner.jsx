// Layout.jsx
import React from 'react';
import './LayoutLearner.css';
import NavLearner from './NavLearner';

const LayoutLearner = ({ children }) => {
 return (
    <>
      <NavLearner />
      <main className="main-content">{children}</main> {/* Use the class if you're styling with a class */}
    </>
 );
};

export default LayoutLearner;