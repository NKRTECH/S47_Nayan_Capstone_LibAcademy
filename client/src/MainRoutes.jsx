import { Routes, Route} from 'react-router-dom';

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
import EditLessonPage from './pages/tutors/EditLessonPage';



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
      <Route path='/tutor/courses' element={<LayoutTutor><Protected component={TutorCoursePage} allowedRoles={['tutor']} /></LayoutTutor>} />
      <Route path="/tutor/courses/create" element={<LayoutTutor><Protected component={UploadCoursePage} allowedRoles={['tutor']} /></LayoutTutor>} />
      <Route path='/tutor/courses/:courseId/createlesson' element={<LayoutTutor><Protected component={CreateLessons} allowedRoles={['tutor']} /></LayoutTutor>} />
      {/* <Route path="/courses/:courseId" element={<LayoutTutor><Protected component={TutorCourseLessonsPage} allowedRoles={['tutor']} /></LayoutTutor>} /> */}
      <Route path='/tutor/courses/:courseId/lessons' element={<LayoutTutor><Protected component={TutorCourseLessonsPage} allowedRoles={['tutor']} /></LayoutTutor>} />
      <Route path='/tutor/courses/:courseId/lessons/:lessonId' element={<LayoutTutor><Protected component={LessonContentPage} allowedRoles={['tutor']} /></LayoutTutor>} />
      <Route path="/tutor/courses/:courseId/lessons/edit/:lessonId" element={<LayoutTutor><Protected component={EditLessonPage} allowedRoles={['tutor']} /></LayoutTutor>} />


      {/* Learner Routes */}
      <Route path="/learner/" element={<LayoutLearner><Protected component={LearnerHomepage} allowedRoles={['learner']} /></LayoutLearner>} />
      <Route path="/learner/profile" element={<LayoutLearner><Protected component={LearnerProfilePage} allowedRoles={['learner']} /></LayoutLearner>} />
      
      {/* Unauthorized Route */}
      <Route path="/unauthorized" element={<Unauthorized  />} />
    </Routes>
  );
};

export default MainRoutes;