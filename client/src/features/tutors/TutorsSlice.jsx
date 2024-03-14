import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { tutorLoginThunk, tutorRegisterThunk } from './TutorThunks';


const tutorSlice = createSlice({
  name: 'tutor',
  initialState: {
    status: 'idle', // Possible values: 'idle', 'loading', 'succeeded', 'failed'
    error: null,
    isLoggedIn: false, // Add this flag
    isRegistered: false,
    tutorData: null // Initially null, will store tutor data after successful registration
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(tutorRegisterThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(tutorRegisterThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.tutorData = action.payload; // Store the tutor data upon successful registration
        console.log(action.payload);
      })
      .addCase(tutorRegisterThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.message : 'Something went wrong';
      })
      .addCase(tutorLoginThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(tutorLoginThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.tutorData = action.payload; // Store the tutor data upon successful tutorLoginThunk
        state.isLoggedIn = true; // Set this flag to true on successful login
        console.log(action.payload);
      })
      .addCase(tutorLoginThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.message : 'Something went wrong';
      });
    }
});

export default tutorSlice.reducer;