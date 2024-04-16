import { configureStore } from '@reduxjs/toolkit';
import tutorReducer from '../features/tutors/TutorsSlice.jsx';
import courseReducer from '../features/courses/coursesSlice.jsx';
import LearnerSlice from '../features/learners/LearnersSlice.jsx';
import lessonsReducer from '../features/lessons/LessonsSlice.jsx';

const store = configureStore({
  reducer: {
    tutor: tutorReducer,
    learner: LearnerSlice,
    courses: courseReducer,
    lessons: lessonsReducer
  }
});

export default store;