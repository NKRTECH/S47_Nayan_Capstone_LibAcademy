// routes/TutorRoutes.js
import { lazy } from 'react';

export const TutorRoutes = [
  { path: '/tutor', element: lazy(() => import('../pages/tutors/HomePageTutor')) },
  { path: '/tutor/profile', element: lazy(() => import('../pages/tutors/TutorProfilePage')) },
  { path: '/tutor/courses', element: lazy(() => import('../pages/tutors/TutorCoursePage')) },
  { path: '/tutor/courses/create', element: lazy(() => import('../pages/tutors/UploadCoursePage')) },
  { path: '/tutor/courses/:courseId/createlesson', element: lazy(() => import('../pages/tutors/CreateLessons')) },
  { path: '/tutor/courses/:courseId/lessons', element: lazy(() => import('../pages/tutors/TutorCourseLessonsPage')) },
  { path: '/tutor/courses/:courseId/lessons/:lessonId', element: lazy(() => import('../pages/tutors/TutorLessonContentPage')) },
  { path: '/tutor/courses/:courseId/lessons/edit/:lessonId', element: lazy(() => import('../pages/tutors/EditLessonPage')) },
];
