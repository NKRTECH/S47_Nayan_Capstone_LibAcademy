// src/features/lessons/lessonsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createLessonThunk, fetchLessonById, fetchLessonsByCourseId, updateLessonThunk } from './LessonsThunks';


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
        console.log('action.payload for lessons:----', action.payload.lessons);
      })
      .addCase(fetchLessonsByCourseId.rejected, (state, action) => {
        state.isLoading = false;
        console.log('action.payload error:----', action.payload);
        state.error = action.payload;
      })

      //********************fetch lesson by lessonId********** */
      .addCase(fetchLessonById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLessonById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lesson = action.payload.lesson;
        console.log('action.payload fetch lesson by id:----', action.payload.lesson);
      })
      .addCase(fetchLessonById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //*********************update lesson***************** */
      .addCase(updateLessonThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateLessonThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        // Update the state with the new lesson data
        const index = state.lessons.findIndex((lesson) => lesson._id === action.payload._id);
        if (index !== -1) {
          state.lessons[index] = action.payload;
        }
      })
      .addCase(updateLessonThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reset } = lessonsSlice.actions;
export default lessonsSlice.reducer;