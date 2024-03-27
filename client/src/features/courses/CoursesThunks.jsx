import { createAsyncThunk } from "@reduxjs/toolkit";
import { createCourseAPI } from "./CoursesAPI";

export const createCourseThunk = createAsyncThunk(
    'courses/create',
    async (courseData, thunkAPI) => {
        try {
            const response = await createCourseAPI(courseData);
            // Assuming your backend returns some data upon successful registration
            console.log('Course created successfully!', response);
            return response.data;
        } catch (error) {
            console.error('Error in createCourseThunk:', error.response.data);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);