import { createSlice } from '@reduxjs/toolkit';
import { learnerLoginThunk, learnerRegisterThunk } from './LearnersThunks';


const learnerSlice = createSlice({
  name: 'learner',
  initialState : {
    status: 'idle',
    learnerData: '',
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
        state.learnerData = action.payload; 
        console.log(action.payload);
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
        state.learnerData = action.payload; 
        console.log(action.payload);
      })
      .addCase(learnerLoginThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.message : 'Something went wrong';
      })
    }
});

export default learnerSlice.reducer;