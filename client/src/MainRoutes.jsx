import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePageTutor from './pages/tutors/HomePageTutor';
import TutorRegistrationPage from './pages/tutors/TutorRegistrationPage';
import TutorLoginPage from './pages/tutors/TutorLoginPage';
import LayoutTutor from './components/tutor/LayoutTutor';
import TutorProfilePage from './pages/tutors/TutorProfilePage';
import UploadCoursePage from './pages/courses/UploadCoursePage';
import LearnerRegistrationPage from './pages/learners/LearnerRegistrationPage';
import LearnerLoginPage from './pages/learners/LearnerLoginPage';
import NavUser from './components/user/NavUser';
import LayoutUser from './components/user/LayoutUser';
import LearnerHomepage from './pages/learners/LearnerHomePage';
import LayoutLearner from './components/learner/LayoutLearner';



function MainRoutes() {
 return (
    <Routes>


      {/* ******************************* User Routes ************************** */}
      <Route path="/" element={<LayoutTutor><NavUser /></LayoutTutor>} />
      <Route path="/tutor/registration" element={<LayoutUser><TutorRegistrationPage /></LayoutUser>} />
      <Route path='/tutor/login' element={<LayoutUser><TutorLoginPage /></LayoutUser>} />
      <Route path="/learner/login" element={<LayoutUser><LearnerLoginPage /></LayoutUser>} />
      <Route path="/learner/registration" element={<LayoutUser><LearnerRegistrationPage /></LayoutUser>} />


      {/******************************* Tutor Routes ***************************/}
      <Route path="/tutor-home" element={<LayoutTutor><HomePageTutor /></LayoutTutor>} />
      <Route path='/tutor/profile' element={<LayoutTutor><TutorProfilePage /></LayoutTutor>} />

      {/* *******************************Learner Routes ************************** */}
      <Route path='/learner-home' element={<LayoutLearner><LearnerHomepage /></LayoutLearner>} />
      

      {/******************************* Course Routes ***************************/}
      <Route path="/course/create" element={<LayoutTutor><UploadCoursePage /></LayoutTutor>} />
      
    </Routes>
 );
}

export default MainRoutes;