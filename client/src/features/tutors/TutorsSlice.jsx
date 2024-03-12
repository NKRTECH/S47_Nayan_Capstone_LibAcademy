import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { tutorRegistrationAPI } from './TutorsApi'; // You'll need to implement this API function to communicate with your backend

// Async thunk action for registering a tutor
export const registerTutor = createAsyncThunk(
  'tutor/register',
  async (formData, thunkAPI) => {
    try {
      const response = await tutorRegistrationAPI(formData);
      // Assuming your backend returns some data upon successful registration
      console.log('Registration successful!', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in registerTutor:', error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const tutorSlice = createSlice({
  name: 'tutor',
  initialState: {
    status: 'idle', // Possible values: 'idle', 'loading', 'succeeded', 'failed'
    error: null,
    tutorData: null // Initially null, will store tutor data after successful registration
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerTutor.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerTutor.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.tutorData = action.payload; // Store the tutor data upon successful registration
        console.log(action.payload);
      })
      .addCase(registerTutor.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.message : 'Something went wrong';
      });
  }
});

export default tutorSlice.reducer;