import { configureStore } from '@reduxjs/toolkit';
import tutorReducer from '../features/tutors/TutorsSlice.jsx';

const store = configureStore({
  reducer: {
    tutor: tutorReducer
    // Add more reducers here if you have any
  }
});

export default store;
