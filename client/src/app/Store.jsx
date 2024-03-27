import { configureStore } from '@reduxjs/toolkit';
import tutorReducer from '../features/tutors/TutorsSlice.jsx';
import courseReducer from '../features/courses/coursesSlice.jsx';

const store = configureStore({
  reducer: {
    tutor: tutorReducer,
    courses: courseReducer
    // Add more reducers here if you have any
  }
});

export default store;
