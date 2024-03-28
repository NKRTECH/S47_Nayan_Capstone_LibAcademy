import { createSlice } from '@reduxjs/toolkit';
import { learnerRegisterThunk } from './LearnersThunks';


const learnerSlice = createSlice({
  name: 'learner',
  initialState : {
    status: 'idle',
    email: '',
    password: '',
    username: '',
    loading: false,
    error: null,
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
        state.tutorData = action.payload; // Store the tutor data upon successful registration
        console.log(action.payload);
      })
      .addCase(learnerRegisterThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.message : 'Something went wrong';
      })
    }
});

export default learnerSlice.reducer;