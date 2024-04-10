// src/features/lessons/lessonsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createLessonThunk } from './LessonsThunks';


const lessonsSlice = createSlice({
  name: 'lessons',
  initialState: {
    lesson: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLessonThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createLessonThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lesson = action.payload;
      })
      .addCase(createLessonThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reset } = lessonsSlice.actions;
export default lessonsSlice.reducer;
