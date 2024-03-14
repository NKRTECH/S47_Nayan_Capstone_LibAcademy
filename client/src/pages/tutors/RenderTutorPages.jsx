import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout'; // Import the Layout component
import HomePageTutor from './HomePageTutor';
import TutorRegistrationPage from './TutorRegistrationPage';
import TutorLoginPage from './TutorLoginPage';

function RenderTutorPages() {
 return (
    
      <Routes>
        {/* Define routes using the <Route> component */}
        <Route path="/" element={<Layout><HomePageTutor /></Layout>} />
        <Route path="/tutor-registration" element={<Layout><TutorRegistrationPage /></Layout>} />
        <Route path="/home-tutor" element={<Layout><HomePageTutor /></Layout>} />
        <Route path='/tutor-login' element={<Layout><TutorLoginPage /></Layout>} />
      </Routes>
    
 );
}

export default RenderTutorPages;
