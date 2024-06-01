import { createSlice } from '@reduxjs/toolkit';
import { fetchCoursesByLearnerIdThunk, learnerLoginThunk, learnerRegisterThunk } from './LearnersThunks';
import { setLearnerAuthToken } from './LearnersAPI';

// Check if learner data exists in local storage
const initialLearnerDataString = localStorage.getItem('learnerData');
const initialLearnerData = initialLearnerDataString ? JSON.parse(initialLearnerDataString) : null;

const initialState = {
  status: 'idle',
  learnerData: initialLearnerData,
  enrolledCourses: [],
  loading: false,
  error: null,
  isLoggedIn: !!initialLearnerData, // Set isLoggedIn based on existence of learnerData
};

const learnerSlice = createSlice({
  name: 'learner',
  initialState,
  reducers: {
    logout: (state) => {
      // Clear learner data and token from localStorage
      localStorage.removeItem('learnerData');
      localStorage.removeItem('token');
      state.learnerData = null;
      // Dispatch the logout action to reset the Redux state
      state.isLoggedIn = false;
      // Remove the Authorization header
      setLearnerAuthToken(null);
    }
  },
  extraReducers: (builder) => {
    builder  
      //**********************learner registration **************** */
      .addCase(learnerRegisterThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(learnerRegisterThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.learnerData = action.payload.learner;
        localStorage.setItem('learnerData', JSON.stringify(action.payload.learner)); // Save to local storage
        localStorage.setItem('token', action.payload.token); // Store the token in localStorage
        state.isLoggedIn = true;
        // console.log(action.payload);
      })
      .addCase(learnerRegisterThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.message : 'Something went wrong';
      })
      //**********************learner login **************** */
      .addCase(learnerLoginThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(learnerLoginThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.learnerData = action.payload.learner;
        localStorage.setItem('learnerData', JSON.stringify(action.payload.learner)); // Save to local storage
        localStorage.setItem('token', action.payload.token); // Store the token in localStorage
        state.isLoggedIn = true;
      })
      .addCase(learnerLoginThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.message : 'Something went wrong';
      })
      //**********************fetchCoursesByLearnerId **************** */
      .addCase(fetchCoursesByLearnerIdThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCoursesByLearnerIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.enrolledCourses = action.payload.enrolledCourses;
        console.log('Courses by learner fetched successfully payload:', action.payload);
      })
      .addCase(fetchCoursesByLearnerIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : 'Something went wrong';
      })
    }
});

export const { logout } = learnerSlice.actions;
export default learnerSlice.reducer;
