// routes/LearnerRoutes.js
import { lazy } from 'react';

export const LearnerRoutes = [
  { path: '/learner', element: lazy(() => import('../pages/learners/LearnerHomePage')) },
  { path: '/learner/profile', element: lazy(() => import('../pages/learners/LearnerProfilePage')) },
  { path: '/learner/courses/:courseId', element: lazy(() => import('../pages/learners/LearnerCoursePage')) },
  { path: '/learner/courses/:courseId/lessons/:lessonId', element: lazy(() => import('../pages/learners/LearnerCourseLessonsPage')) },
  { path: '/learner/my-courses', element: lazy(() => import('../pages/learners/LearnerMyCoursesPage')) },
  { path: '/payment-redirect', element: lazy(() => import('../pages/learners/PaymentRedirect')) },
  { path: '/payment-success', element: lazy(() => import('../pages/learners/PaymentSuccess')) },
];