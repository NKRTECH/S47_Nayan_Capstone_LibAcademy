// routes/userRoutes.js
import { lazy } from 'react';

export const UserRoutes = [
  { path: '/', element: lazy(() => import('../components/user/NavUser')) },
  { path: '/tutor/registration', element: lazy(() => import('../pages/tutors/TutorRegistrationPage')) },
  { path: '/tutor/login', element: lazy(() => import('../pages/tutors/TutorLoginPage')) },
  { path: '/learner/login', element: lazy(() => import('../pages/learners/LearnerLoginPage')) },
  { path: '/learner/registration', element: lazy(() => import('../pages/learners/LearnerRegistrationPage')) },
];
