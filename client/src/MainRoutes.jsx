import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePageTutor from './pages/tutors/HomePageTutor';
import TutorRegistrationPage from './pages/tutors/TutorRegistrationPage';
import TutorLoginPage from './pages/tutors/TutorLoginPage';
import Layout from './pages/tutors/Layout';
import TutorProfilePage from './pages/tutors/TutorProfilePage';
import UploadCoursePage from './pages/courses/UploadCoursePage';


function MainRoutes() {
 return (
    <Routes>
      {/******************************* Tutor Routes ***************************/}
      <Route path="/" element={<Layout><HomePageTutor /></Layout>} />
      <Route path="/tutor/registration" element={<Layout><TutorRegistrationPage /></Layout>} />
      <Route path='/tutor/login' element={<Layout><TutorLoginPage /></Layout>} />
      <Route path='/tutor/profile' element={<Layout><TutorProfilePage /></Layout>} />
      
      {/******************************* Course Routes ***************************/}
      <Route path="/course/create" element={<Layout><UploadCoursePage /></Layout>} />
    </Routes>
 );
}

export default MainRoutes;