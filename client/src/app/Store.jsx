import { configureStore } from '@reduxjs/toolkit';
import tutorReducer from '../features/tutors/TutorsSlice.jsx';
import courseReducer from '../features/courses/coursesSlice.jsx';
import LearnerSlice from '../features/learners/LearnersSlice.jsx';

const store = configureStore({
  reducer: {
    tutor: tutorReducer,
    learner: LearnerSlice,
    courses: courseReducer
  }
});

export default store;