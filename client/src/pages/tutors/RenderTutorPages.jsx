import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout'; // Import the Layout component
import HomePageTutor from './HomePageTutor';
import TutorRegistrationPage from './TutorRegistrationPage';
import TutorLoginPage from './TutorLoginPage';
import TutorProfilePage from './TutorProfilePage';

function RenderTutorPages() {
 return (
    
      <Routes>
        {/* Define routes using the <Route> component */}
        <Route path="/" element={<Layout><HomePageTutor /></Layout>} />
        <Route path="/tutor/registration" element={<Layout><TutorRegistrationPage /></Layout>} />
        <Route path='/tutor/login' element={<Layout><TutorLoginPage /></Layout>} />
        <Route path='/tutor/profile' element={<Layout><TutorProfilePage /></Layout>} />
      </Routes>
    
 );
}

export default RenderTutorPages;
