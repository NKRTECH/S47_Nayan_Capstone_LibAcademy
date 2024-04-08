import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { tutorLoginAPI, tutorRegistrationAPI } from './TutorsApi'; // You'll need to implement this API function to communicate with your backend

// Async thunk action for registering a tutor
export const tutorRegisterThunk = createAsyncThunk(
  'tutor/register',
  async (formData, thunkAPI) => {
    try {
      const response = await tutorRegistrationAPI(formData);
      // Assuming your backend returns some data upon successful registration
      console.log('Registration successful!', response);
      return response;
    } catch (error) {
      console.error('Error in registerTutor:', error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Async thunk action for logging in
export const tutorLoginThunk = createAsyncThunk(
    'tutor/login',
    async (credentials, thunkAPI) => {
       try {
         const response = await tutorLoginAPI(credentials);
         // Assuming your backend returns a token upon successful login
         console.log('Login successful!', response);
         return response;
       } catch (error) {
         console.error('Error in login:', error.response.data);
         return thunkAPI.rejectWithValue(error.response.data);
       }
    }
   );

   export const tutorLogoutThunk = () => async (dispatch) => {
    try {
      // Clear tutor data and token from localStorage
      localStorage.removeItem('tutorData');
      localStorage.removeItem('token');
      // Dispatch the logout action to reset the Redux state
      dispatch(logout());
    } catch (error) {
      // Handle any errors
      console.error('Error logging out:', error);
    }
  };