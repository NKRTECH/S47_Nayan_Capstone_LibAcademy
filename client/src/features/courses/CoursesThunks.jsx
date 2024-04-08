import { createAsyncThunk } from "@reduxjs/toolkit";
import { createCourseAPI } from "./CoursesAPI";
import { getCoursesByCategoriesAPI } from '../../features/courses/CoursesAPI';

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


export const fetchCoursesByCategories = createAsyncThunk(
 'courses/fetchCoursesByCategories',
 async (categories) => {
    console.log('Categories thunk:-- ', categories);
    const response = await getCoursesByCategoriesAPI(categories);
    console.log('Courses fetched successfully!', response);
    return response;
 }
);