// courseSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { createCourseThunk, fetchCoursesByCategories, fetchCoursesByTutor } from './CoursesThunks';

const initialState = {
  courses: [],
  tutorCourses: [],
  status: 'idle',
  loading: false,
  error: null
};

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = 'idle';
    },
    resetCourses: (state) => {
      state.courses = [];
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCourseThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCourseThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.courses.push(action.payload);
      })
      .addCase(createCourseThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : 'Something went wrong';
      })
      //*********************fetch courses by categories******************* */
      .addCase(fetchCoursesByCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCoursesByCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.courses = action.payload.courses;
        // state.courses.pop();
        // state.courses.push(action.payload.courses);
        console.log('action.payload:----', action.payload.courses);
      })
      .addCase(fetchCoursesByCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      //****************************fetch courses by tutor******** */
      .addCase(fetchCoursesByTutor.fulfilled, (state, action) => {
        state.tutorCourses = action.payload.courses;
        console.log('action.payload:----', action.payload.courses);
        // console.log(action.payload.courses[2].lessonIds);
      });
  }
});

export const { resetStatus, resetCourses } = courseSlice.actions;

export default courseSlice.reducer;