import axios from "axios";
import { createLessonAPI } from "./LessonsAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";
const BASE_URL = 'http://localhost:3000/api';


export const createLessonThunk = createAsyncThunk(
    'lessons/createLesson',
    async (lessonData, thunkAPI) => {
      try {
        const response = await createLessonAPI(lessonData);
        console.log('lesson created successfully', response);
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  export const fetchLessonsByCourseId = createAsyncThunk(
    'lessons/fetchLessonsByCourse',
    async (courseId, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${BASE_URL}/lessons/fetchLessonsByCourseId/${courseId}`);
        console.log('Lessons fetched successfully:--', response.data);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

export const fetchLessonById = createAsyncThunk(
  'lessons/fetchLessonById',
  async (lessonId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/lessons/fetchLessonById/${lessonId}`);
      console.log('Lesson fetched successfully:--', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);