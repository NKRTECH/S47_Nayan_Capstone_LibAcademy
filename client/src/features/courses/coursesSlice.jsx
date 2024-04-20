// courseSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { createCourseThunk, fetchCoursesByCategories, fetchCoursesByTutor } from './CoursesThunks';

const initialState = {
  courses: [],
  tutorCourses: [],
  status: 'idle',
  loading: false,
  error: null,
  isUploaded: false
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
        state.isUploaded = true;
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

// export const { setLoading, setError, addCourse, updateCourse, deleteCourse } = courseSlice.actions;
export const { resetStatus, resetCourses } = courseSlice.actions;

export default courseSlice.reducer;

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