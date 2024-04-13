import React, { useEffect } from 'react';
import { Routes, Route} from 'react-router-dom';

// Import your components for the routes
import HomePageTutor from './pages/tutors/HomePageTutor';
import TutorRegistrationPage from './pages/tutors/TutorRegistrationPage';
import TutorLoginPage from './pages/tutors/TutorLoginPage';
import LayoutTutor from './components/tutor/LayoutTutor';
import TutorProfilePage from './pages/tutors/TutorProfilePage';
import UploadCoursePage from './pages/tutors/UploadCoursePage';
import LearnerRegistrationPage from './pages/learners/LearnerRegistrationPage';
import LearnerLoginPage from './pages/learners/LearnerLoginPage';
import NavUser from './components/user/NavUser';
import LayoutUser from './components/user/LayoutUser';
import LearnerHomepage from './pages/learners/LearnerHomePage';
import LayoutLearner from './components/learner/LayoutLearner';
import Unauthorized from './Unauthorized';
import Protected from './Protected';
import LearnerProfilePage from './pages/learners/LearnerProfilePage';
import TutorCoursePage from './pages/tutors/TutorCoursePage';
import CreateLessons from './pages/tutors/CreateLessons';
import TutorCourseLessonsPage from './pages/tutors/TutorCourseLessonsPage';
import LessonContentPage from './pages/tutors/TutorLessonContentPage';


const MainRoutes = () => {
  return (
    <Routes>
      {/* User Routes */}

      <Route path="/" element={<LayoutUser><Protected component={NavUser} allowedRoles={['user']}/></LayoutUser>} />
      <Route path="/tutor/registration" element={<LayoutUser><Protected component={TutorRegistrationPage} allowedRoles={['user']}/></LayoutUser>} />
      <Route path="/tutor/login" element={<LayoutUser><Protected component={TutorLoginPage} allowedRoles={['user']}/></LayoutUser>} />
      <Route path="/learner/login" element={<LayoutUser><Protected component={LearnerLoginPage} allowedRoles={['user']}/></LayoutUser>} />
      <Route path="/learner/registration" element={<LayoutUser><Protected component={LearnerRegistrationPage} allowedRoles={['user']}/></LayoutUser>} />

      {/* Tutor Routes */}
      <Route path="/tutor/" element={<LayoutTutor><Protected component={HomePageTutor} allowedRoles={['tutor']} /></LayoutTutor>} />
      <Route path="/tutor/profile" element={<LayoutTutor><Protected component={TutorProfilePage} allowedRoles={['tutor']} /></LayoutTutor>} />
      <Route path='/courses' element={<LayoutTutor><Protected component={TutorCoursePage} allowedRoles={['tutor']} /></LayoutTutor>} />
      <Route path="/courses/create" element={<LayoutTutor><Protected component={UploadCoursePage} allowedRoles={['tutor']} /></LayoutTutor>} />
      <Route path='/courses/:courseId/createlesson' element={<LayoutTutor><Protected component={CreateLessons} allowedRoles={['tutor']} /></LayoutTutor>} />
      {/* <Route path="/courses/:courseId" element={<LayoutTutor><Protected component={TutorCourseLessonsPage} allowedRoles={['tutor']} /></LayoutTutor>} /> */}
      <Route path='/courses/:courseId/lessons' element={<LayoutTutor><Protected component={TutorCourseLessonsPage} allowedRoles={['tutor']} /></LayoutTutor>} />
      <Route path='/courses/:courseId/lessons/:lessonId' element={<LayoutTutor><Protected component={LessonContentPage} allowedRoles={['tutor']} /></LayoutTutor>} />



      {/* Learner Routes */}
      <Route path="/learner/" element={<LayoutLearner><Protected component={LearnerHomepage} allowedRoles={['learner']} /></LayoutLearner>} />
      <Route path="/learner/profile" element={<LayoutLearner><Protected component={LearnerProfilePage} allowedRoles={['learner']} /></LayoutLearner>} />
      
      {/* Unauthorized Route */}
      <Route path="/unauthorized" element={<Unauthorized  />} />
    </Routes>
  );
};

export default MainRoutes;

//*************************************************************** */
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HomePageTutor from './pages/tutors/HomePageTutor';
// import TutorRegistrationPage from './pages/tutors/TutorRegistrationPage';
// import TutorLoginPage from './pages/tutors/TutorLoginPage';
// import LayoutTutor from './components/tutor/LayoutTutor';
// import TutorProfilePage from './pages/tutors/TutorProfilePage';
// import UploadCoursePage from './pages/courses/UploadCoursePage';
// import LearnerRegistrationPage from './pages/learners/LearnerRegistrationPage';
// import LearnerLoginPage from './pages/learners/LearnerLoginPage';
// import NavUser from './components/user/NavUser';

  {/* <Route path="/" element={<LayoutTutor><NavUser /></LayoutTutor>} />
  <Route path="/tutor/registration" element={<LayoutUser><TutorRegistrationPage /></LayoutUser>} />
  <Route path="/tutor/login" element={<LayoutUser><TutorLoginPage /></LayoutUser>} />
  <Route path="/learner/login" element={<LayoutUser><LearnerLoginPage /></LayoutUser>} />
<Route path="/learner/registration" element={<LayoutUser><LearnerRegistrationPage /></LayoutUser>} /> */}

  {/* Tutor Routes */}
  {/* <Route path="/tutor/" element={<LayoutTutor><GuardedRoute component={HomePageTutor} allowedRoles={['tutor']} /></LayoutTutor>} />
  <Route path="/tutor/profile" element={<LayoutTutor><GuardedRoute component={TutorProfilePage} allowedRoles={['tutor']} /></LayoutTutor>} />
<Route path="/courses/create" element={<LayoutTutor><GuardedRoute component={UploadCoursePage} allowedRoles={['tutor']} /></LayoutTutor>} /> */}

{/* Learner Routes */}
{/* <Route path="/learner/" element={<LayoutLearner><GuardedRoute component={LearnerHomepage} allowedRoles={['learner']} /></LayoutLearner>} /> */}
  
{/* Unauthorized Route */}
{/* <Route path="/unauthorized" element={<Unauthorized  />} /> */}
// import LayoutUser from './components/user/LayoutUser';
// import LearnerHomepage from './pages/learners/LearnerHomePage';
// import LayoutLearner from './components/learner/LayoutLearner';



// function MainRoutes() {
//  return (
//     <Routes>


//       {/* ******************************* User Routes ************************** */}
//       <Route path="/" element={<LayoutTutor><NavUser /></LayoutTutor>} />
//       <Route path="/tutor/registration" element={<LayoutUser><TutorRegistrationPage /></LayoutUser>} />
//       <Route path='/tutor/login' element={<LayoutUser><TutorLoginPage /></LayoutUser>} />
//       <Route path="/learner/login" element={<LayoutUser><LearnerLoginPage /></LayoutUser>} />
//       <Route path="/learner/registration" element={<LayoutUser><LearnerRegistrationPage /></LayoutUser>} />


//       {/******************************* Tutor Routes ***************************/}
//       <Route path="/tutor-home" element={<LayoutTutor><HomePageTutor /></LayoutTutor>} />
//       <Route path='/tutor/profile' element={<LayoutTutor><TutorProfilePage /></LayoutTutor>} />

//       {/* *******************************Learner Routes ************************** */}
//       <Route path='/learner-home' element={<LayoutLearner><LearnerHomepage /></LayoutLearner>} />


//       {/******************************* Course Routes ***************************/}
//       <Route path="/course/create" element={<LayoutTutor><UploadCoursePage /></LayoutTutor>} />

//     </Routes>
//  );
// }

// export default MainRoutes;


//******************************************* */
//   if (!token) {
  //     // If no token exists, redirect to the login page
  //     return <Navigate to="/" />;
  //   }

  //   try {
    //     // Decode the token to extract user information
    //     const decodedToken = jwtDecode(token);
//     let role;
//     if(!decodedToken){
//       role = 'user';
//     }else{
  //       role = decodedToken.role;
//     }
//     console.log('decodedToken: ', decodedToken);
//     console.log('role: ', role);

//     // Check if the user's role is allowed to access the route
//     if (!allowedRoles.includes(role)) {
  //       // If the user's role is not allowed, redirect to an unauthorized page
  //       if (role === 'learner') {
//         return navigate('/unauthorized',{state:{role: role}});
//       } else if (role === 'tutor') {
//         return navigate('/unauthorized',{state:{role: role}});
//       }else{
  //         return <Navigate to="/" />;
//       }
//     }
//   } catch (error) {
//     console.error('Error decoding token:', error);
//     // Handle decoding error if needed
//     return <Navigate to="/learner/login" />;
//   }

//   // If the user's role is allowed, render the component
//   // return <Route {...rest} element={<Component />} />;
//   return <Component />;
// const GuardedRoute = ({ component: Component, allowedRoles }) => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');
//   console.log('guarded route:  ---', token);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       // If no token exists, redirect to the login page
//       navigate("/");
//       return;
//     }

//     try {
//       // Decode the token to extract user information
//       const decodedToken = jwtDecode(token);
//       const role = decodedToken ? decodedToken.role : 'user';

//       // Check if the user's role is allowed to access the route
//       if (!allowedRoles.includes(role)) {
//         // If the user's role is not allowed, redirect to an unauthorized page
//         return navigate('/unauthorized', { state: { role } });
//       }
//     } catch (error) {
//       console.error('Error decoding token:', error);
//       // Handle decoding error if needed
//       navigate('/learner/login');
//     }
//   }, [navigate]);

//   // If the user's role is allowed, render the component
//   return <Component />;
// };
// };