import {  createAsyncThunk } from '@reduxjs/toolkit';
import {  learnerLoginAPI, learnerRegistrationAPI } from './LearnersAPI';

// Async thunk action for registering a tutor
export const learnerRegisterThunk = createAsyncThunk(
  'learner/register',
  async (formData, thunkAPI) => {
    try {
      const response = await learnerRegistrationAPI(formData);
      console.log('Registration successful!', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in registerLearner:', error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const learnerLoginThunk = createAsyncThunk(
  'learner/login',
  async (formData, thunkAPI) => {
    try {
      const response = await learnerLoginAPI(formData);
      console.log('Login successful!', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in loginLearner:', error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)