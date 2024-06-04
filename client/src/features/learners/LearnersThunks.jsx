import {  createAsyncThunk } from '@reduxjs/toolkit';
import {  fetchCoursesByLearnerIdAPI, learnerLoginAPI, learnerRegistrationAPI } from './LearnersAPI';

// Async thunk action for registering a tutor
export const learnerRegisterThunk = createAsyncThunk(
  'learner/register',
  async (formData, thunkAPI) => {
    try {
      const response = await learnerRegistrationAPI(formData);
      console.log('Registration successful!', response);
      const { token } = response; // Assuming the API response contains a token
      localStorage.setItem('token', token); // Store the token in localStorage
      return response;
    } catch (error) {
      console.error('Error in registerLearner:', error.response.data);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const learnerLoginThunk = createAsyncThunk(
  'learner/login',
  async (formData, thunkAPI) => {
    try {
      const response = await learnerLoginAPI(formData);
      console.log('Login successful!', response);
      // const { token, learner } = response; // Assuming the API response contains a token
      // console.log('learner:--', learner);
      // localStorage.setItem('learnerData', JSON.stringify(learner)); // Save to local storage
      // localStorage.setItem('token', token); // Store the token in localStorage
      // console.log('Token:--', token);
      return response;
    } catch (error) {
      console.error('Error in loginLearner:', error.response.data);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
)

export const fetchCoursesByLearnerIdThunk = createAsyncThunk(
  'learner/fetchCoursesByLearnerId',
  async (learnerId, thunkAPI) => {
    try {
      const response = await fetchCoursesByLearnerIdAPI(learnerId);
      console.log('Courses by learner fetched successfully thunk:', response);
      return response;
    } catch (error) {
      console.error('Error fetching courses:', error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)