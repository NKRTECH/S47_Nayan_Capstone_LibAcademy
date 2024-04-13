// src/features/lessons/lessonsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createLessonThunk, fetchLessonById, fetchLessonsByCourseId } from './LessonsThunks';


const lessonsSlice = createSlice({
  name: 'lessons',
  initialState: {
    lessons: null,
    isLoading: false,
    error: null,
    lesson: null
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
        state.lessons = action.payload;
      })
      .addCase(createLessonThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //********************fetch lesson by course id********** */
      .addCase(fetchLessonsByCourseId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLessonsByCourseId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lessons = action.payload.lessons;
        console.log('action.payload:----', action.payload.lessons);
      })
      .addCase(fetchLessonsByCourseId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //********************fetch lesson by lessonId********** */
      .addCase(fetchLessonById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLessonById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lesson = action.payload.lesson;
        console.log('action.payload:----', action.payload.lesson);
      })
      .addCase(fetchLessonById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reset } = lessonsSlice.actions;
export default lessonsSlice.reducer;
