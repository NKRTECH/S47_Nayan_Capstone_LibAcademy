// courseSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { createCourseThunk } from './CoursesThunks';

const initialState = {
  courses: [],
  loading: false,
  error: null
};

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  // reducers: {
  //   // Action creator for setting loading state
  //   setLoading(state, action) {
  //     state.loading = action.payload;
  //   },
  //   // Action creator for setting error state
  //   setError(state, action) {
  //     state.error = action.payload;
  //   },
  //   // Action creator for adding a new course
  //   addCourse(state, action) {
  //     state.courses.push(action.payload);
  //   },
  //   // Action creator for updating an existing course
  //   updateCourse(state, action) {
  //     const { courseId, updatedCourse } = action.payload;
  //     const index = state.courses.findIndex(course => course._id === courseId);
  //     if (index !== -1) {
  //       state.courses[index] = updatedCourse;
  //     }
  //   },
  //   // Action creator for deleting a course
  //   deleteCourse(state, action) {
  //     const courseId = action.payload;
  //     state.courses = state.courses.filter(course => course._id !== courseId);
  //   }
  // },
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
      });
  }
});

// export const { setLoading, setError, addCourse, updateCourse, deleteCourse } = courseSlice.actions;

export default courseSlice.reducer;