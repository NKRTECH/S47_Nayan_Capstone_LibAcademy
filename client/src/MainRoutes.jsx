import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LayoutUser from './components/user/LayoutUser';
import LayoutTutor from './components/tutor/LayoutTutor';
import LayoutLearner from './components/learner/LayoutLearner';
import Unauthorized from './Unauthorized';
import { RoleBasedRoutes } from './utils/RoleBasedRoutes';
import { jwtDecode } from 'jwt-decode';
import Protected from './Protected';
import { RoleBasedLazyLoad } from './utils/RoleBasedLazyLoads';

// Dummy function to simulate fetching user role
const getUserRole = () => {
  // This function should return the role of the current user ('user', 'tutor', 'learner', etc.)
    const token = localStorage.getItem("token");
    const decodedToken = token ? jwtDecode(token) : "";
    const role = decodedToken ? decodedToken.role : "user";
    console.log("role:-->", role);
    return role;
};

const MainRoutes = () => {
  const userRole = getUserRole();

  return (
    <>
   <Routes>
      {/* User Routes */}
      <Route path="/" element={<LayoutUser><Protected component={RoleBasedLazyLoad(() => import('./components/user/NavUser'), ['user'], userRole)} allowedRoles={['user']} /></LayoutUser>} />
      <Route path="/tutor/registration" element={<LayoutUser><Protected component={RoleBasedLazyLoad(() => import('./pages/tutors/TutorRegistrationPage'), ['user'], userRole)} allowedRoles={['user']} /></LayoutUser>} />
      <Route path="/tutor/login" element={<LayoutUser><Protected component={RoleBasedLazyLoad(() => import('./pages/tutors/TutorLoginPage'), ['user'], userRole)} allowedRoles={['user']} /></LayoutUser>} />
      <Route path="/learner/login" element={<LayoutUser><Protected component={RoleBasedLazyLoad(() => import('./pages/learners/LearnerLoginPage'), ['user'], userRole)} allowedRoles={['user']} /></LayoutUser>} />
      <Route path="/learner/registration" element={<LayoutUser><Protected component={RoleBasedLazyLoad(() => import('./pages/learners/LearnerRegistrationPage'), ['user'], userRole)} allowedRoles={['user']} /></LayoutUser>} />

      {/* Tutor Routes */}
      <Route path="/tutor/" element={<LayoutTutor><Protected component={RoleBasedLazyLoad(() => import('./pages/tutors/HomePageTutor'), ['tutor'], userRole)} allowedRoles={['tutor']} /></LayoutTutor>} />
      <Route path="/tutor/profile" element={<LayoutTutor><Protected component={RoleBasedLazyLoad(() => import('./pages/tutors/TutorProfilePage'), ['tutor'], userRole)} allowedRoles={['tutor']} /></LayoutTutor>} />
      <Route path='/tutor/courses' element={<LayoutTutor><Protected component={RoleBasedLazyLoad(() => import('./pages/tutors/TutorCoursePage'), ['tutor'], userRole)} allowedRoles={['tutor']} /></LayoutTutor>} />
      <Route path="/tutor/courses/create" element={<LayoutTutor><Protected component={RoleBasedLazyLoad(() => import('./pages/tutors/UploadCoursePage'), ['tutor'], userRole)} allowedRoles={['tutor']} /></LayoutTutor>} />
      <Route path='/tutor/courses/:courseId/createlesson' element={<LayoutTutor><Protected component={RoleBasedLazyLoad(() => import('./pages/tutors/CreateLessons'), ['tutor'], userRole)} allowedRoles={['tutor']} /></LayoutTutor>} />
      <Route path='/tutor/courses/:courseId/lessons' element={<LayoutTutor><Protected component={RoleBasedLazyLoad(() => import('./pages/tutors/TutorCourseLessonsPage'), ['tutor'], userRole)} allowedRoles={['tutor']} /></LayoutTutor>} />
      <Route path='/tutor/courses/:courseId/lessons/:lessonId' element={<LayoutTutor><Protected component={RoleBasedLazyLoad(() => import('./pages/tutors/TutorLessonContentPage'), ['tutor'], userRole)} allowedRoles={['tutor']} /></LayoutTutor>} />
      <Route path="/tutor/courses/:courseId/lessons/edit/:lessonId" element={<LayoutTutor><Protected component={RoleBasedLazyLoad(() => import('./pages/tutors/EditLessonPage'), ['tutor'], userRole)} allowedRoles={['tutor']} /></LayoutTutor>} />

      {/* Learner Routes */}
      <Route path="/learner/" element={<LayoutLearner><Protected component={RoleBasedLazyLoad(() => import('./pages/learners/LearnerHomePage'), ['learner'], userRole)} allowedRoles={['learner']} /></LayoutLearner>} />
      <Route path="/learner/profile" element={<LayoutLearner><Protected component={RoleBasedLazyLoad(() => import('./pages/learners/LearnerProfilePage'), ['learner'], userRole)} allowedRoles={['learner']} /></LayoutLearner>} />
      <Route path='/learner/courses/:courseId' element={<LayoutLearner><Protected component={RoleBasedLazyLoad(() => import('./pages/learners/LearnerCoursePage'), ['learner'], userRole)} allowedRoles={['learner']} /></LayoutLearner>} />
      <Route path='/learner/courses/:courseId/lessons/:lessonId' element={<LayoutLearner><Protected component={RoleBasedLazyLoad(() => import('./pages/learners/LearnerCourseLessonsPage'), ['learner'], userRole)} allowedRoles={['learner']} /></LayoutLearner>} />
      <Route path='/learner/my-courses' element={<LayoutLearner><Protected component={RoleBasedLazyLoad(() => import('./pages/learners/LearnerMyCoursesPage'), ['learner'], userRole)} allowedRoles={['learner']} /></LayoutLearner>} />
      <Route path="/payment-redirect" element={<LayoutLearner><Protected component={RoleBasedLazyLoad(() => import('./pages/learners/PaymentRedirect'), ['learner'], userRole)} allowedRoles={['learner']} /></LayoutLearner>} />
      <Route path='/payment-success' element={<LayoutLearner><Protected component={RoleBasedLazyLoad(() => import('./pages/learners/PaymentSuccess'), ['learner'], userRole)} allowedRoles={['learner']} /></LayoutLearner>} />

      {/* Unauthorized Route */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
    </>
  );
};

export default MainRoutes;





// import { Routes, Route} from 'react-router-dom';

// import HomePageTutor from './pages/tutors/HomePageTutor';
// import TutorRegistrationPage from './pages/tutors/TutorRegistrationPage';
// import TutorLoginPage from './pages/tutors/TutorLoginPage';
// import LayoutTutor from './components/tutor/LayoutTutor';
// import TutorProfilePage from './pages/tutors/TutorProfilePage';
// import UploadCoursePage from './pages/tutors/UploadCoursePage';
// import LearnerRegistrationPage from './pages/learners/LearnerRegistrationPage';
// import LearnerLoginPage from './pages/learners/LearnerLoginPage';
// import NavUser from './components/user/NavUser';
// import LayoutUser from './components/user/LayoutUser';
// import LearnerHomepage from './pages/learners/LearnerHomePage';
// import LayoutLearner from './components/learner/LayoutLearner';
// import Unauthorized from './Unauthorized';
// import Protected from './Protected';
// import LearnerProfilePage from './pages/learners/LearnerProfilePage';
// import TutorCoursePage from './pages/tutors/TutorCoursePage';
// import CreateLessons from './pages/tutors/CreateLessons';
// import TutorCourseLessonsPage from './pages/tutors/TutorCourseLessonsPage';
// import LessonContentPage from './pages/tutors/TutorLessonContentPage';
// import EditLessonPage from './pages/tutors/EditLessonPage';
// import LearnerCoursePage from './pages/learners/LearnerCoursePage';
// import PaymentRedirect from './pages/learners/PaymentRedirect';
// import PaymentSuccess from './pages/learners/PaymentSuccess';
// import LearnerMyCoursesPage from './pages/learners/LearnerMyCoursesPage';
// import LearnerCourseLessonsPage from './pages/learners/LearnerCourseLessonsPage';


// const MainRoutes = () => {
//   return (
//     <Routes>
//       {/* User Routes */}
//       <Route path="/" element={<LayoutUser><Protected component={NavUser} allowedRoles={['user']}/></LayoutUser>} />
//       <Route path="/tutor/registration" element={<LayoutUser><Protected component={TutorRegistrationPage} allowedRoles={['user']}/></LayoutUser>} />
//       <Route path="/tutor/login" element={<LayoutUser><Protected component={TutorLoginPage} allowedRoles={['user']}/></LayoutUser>} />
//       <Route path="/learner/login" element={<LayoutUser><Protected component={LearnerLoginPage} allowedRoles={['user']}/></LayoutUser>} />
//       <Route path="/learner/registration" element={<LayoutUser><Protected component={LearnerRegistrationPage} allowedRoles={['user']}/></LayoutUser>} />

//       {/* Tutor Routes */}
//       <Route path="/tutor/" element={<LayoutTutor><Protected component={HomePageTutor} allowedRoles={['tutor']} /></LayoutTutor>} />
//       <Route path="/tutor/profile" element={<LayoutTutor><Protected component={TutorProfilePage} allowedRoles={['tutor']} /></LayoutTutor>} />
//       <Route path='/tutor/courses' element={<LayoutTutor><Protected component={TutorCoursePage} allowedRoles={['tutor']} /></LayoutTutor>} />
//       <Route path="/tutor/courses/create" element={<LayoutTutor><Protected component={UploadCoursePage} allowedRoles={['tutor']} /></LayoutTutor>} />
//       <Route path='/tutor/courses/:courseId/createlesson' element={<LayoutTutor><Protected component={CreateLessons} allowedRoles={['tutor']} /></LayoutTutor>} />
//       {/* <Route path="/courses/:courseId" element={<LayoutTutor><Protected component={TutorCourseLessonsPage} allowedRoles={['tutor']} /></LayoutTutor>} /> */}
//       <Route path='/tutor/courses/:courseId/lessons' element={<LayoutTutor><Protected component={TutorCourseLessonsPage} allowedRoles={['tutor']} /></LayoutTutor>} />
//       <Route path='/tutor/courses/:courseId/lessons/:lessonId' element={<LayoutTutor><Protected component={LessonContentPage} allowedRoles={['tutor']} /></LayoutTutor>} />
//       <Route path="/tutor/courses/:courseId/lessons/edit/:lessonId" element={<LayoutTutor><Protected component={EditLessonPage} allowedRoles={['tutor']} /></LayoutTutor>} />



//       {/* Learner Routes */}
//       <Route path="/learner/" element={<LayoutLearner><Protected component={LearnerHomepage} allowedRoles={['learner']} /></LayoutLearner>} />
//       <Route path="/learner/profile" element={<LayoutLearner><Protected component={LearnerProfilePage} allowedRoles={['learner']} /></LayoutLearner>} />
//       <Route path='/learner/courses/:courseId' element={<LayoutLearner><Protected component={LearnerCoursePage} allowedRoles={['learner']} /></LayoutLearner>} />
//       <Route path='/learner/courses/:courseId/lessons/:lessonId' element={<LayoutLearner><Protected component={LearnerCourseLessonsPage} allowedRoles={['learner']} /></LayoutLearner>} />
//       <Route path='/learner/my-courses' element={<LayoutLearner><Protected component={LearnerMyCoursesPage} allowedRoles={['learner']} /></LayoutLearner>} />
//       <Route path="/payment-redirect" element={<LayoutLearner><Protected component={PaymentRedirect} allowedRoles={['learner']} /></LayoutLearner>} />
//       <Route path='/payment-success' element={<LayoutLearner><Protected component={PaymentSuccess} allowedRoles={['learner']} /></LayoutLearner>} />

      
//       {/* Unauthorized Route */}
//       <Route path="/unauthorized" element={<Unauthorized  />} />
//       <Route path="*" element={<div>404 Not Found</div>} />
//     </Routes>
//   );
// };

// export default MainRoutes;