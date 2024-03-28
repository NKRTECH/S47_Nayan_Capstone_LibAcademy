import {  createAsyncThunk } from '@reduxjs/toolkit';
import {  learnerRegistrationAPI } from './LearnersAPI';

// Async thunk action for registering a tutor
export const learnerRegisterThunk = createAsyncThunk(
  'learner/register',
  async (formData, thunkAPI) => {
    try {
      const response = await learnerRegistrationAPI(formData);
      // Assuming your backend returns some data upon successful registration
      console.log('Registration successful!', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in registerTutor:', error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
