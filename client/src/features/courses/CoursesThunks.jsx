import { createAsyncThunk } from "@reduxjs/toolkit";
import { createCourseAPI, setAuthToken } from "./CoursesAPI";
import { getCoursesByCategoriesAPI } from '../../features/courses/CoursesAPI';
import axios from "axios";
const BASE_URL = 'http://localhost:3000/api';


export const createCourseThunk = createAsyncThunk(
    'courses/create',
    async (courseData, thunkAPI) => {
        const token = localStorage.getItem("token");
        setAuthToken(token);
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


export const fetchCoursesByTutor = createAsyncThunk(
  'courses/fetchCoursesByTutor',
  async (tutorId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/courses/fetchCoursesByTutor/${tutorId}`);
      console.log('response:--',response)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

