import { createSlice } from '@reduxjs/toolkit';
import { tutorLoginThunk, tutorRegisterThunk } from './TutorThunks';

const initialTutorDataString = localStorage.getItem('tutorData');
const initialTutorData = initialTutorDataString ? JSON.parse(initialTutorDataString) : null;

const initialState = {
  status: 'idle',
  tutorData: initialTutorData,
  loading: false,
  error: null,
  isLoggedIn: !!initialTutorData, // Set isLoggedIn based on existence of tutorData
};

const tutorSlice = createSlice({
  name: 'tutor',
  initialState,
  reducers: {
    logout: (state) => {
      // Clear tutor data and token from localStorage
      localStorage.removeItem('tutorData');
      localStorage.removeItem('token');
      state.tutorData = null;
      // Dispatch the logout action to reset the Redux state
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder  
      //**********************tutor registration **************** */
      .addCase(tutorRegisterThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(tutorRegisterThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        // state.tutorData = action.payload; // Store the tutor data upon successful registration
        localStorage.setItem('tutorData', JSON.stringify(action.payload.tutor)); // Save to local storage
        localStorage.setItem('token', action.payload.token); // Store the token in localStorage
        // console.log(action.payload);
      })
      .addCase(tutorRegisterThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.message : 'Something went wrong';
      })  
      //**********************tutor login **************** */
      .addCase(tutorLoginThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(tutorLoginThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.tutorData = action.payload.tutor; // Store the tutor data upon successful tutorLoginThunk
        state.isLoggedIn = true; // Set this flag to true on successful login
        localStorage.setItem('tutorData', JSON.stringify(action.payload.tutor)); // Save to local storage
        localStorage.setItem('token', action.payload.token); // Store the token in localStorage

        console.log(action.payload);
      })
      .addCase(tutorLoginThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.message : 'Something went wrong';
      });
    }
});
export const { logout } = tutorSlice.actions;
export default tutorSlice.reducer;