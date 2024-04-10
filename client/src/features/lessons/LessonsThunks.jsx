import { createLessonAPI } from "./LessonsAPI";
import { createAsyncThunk } from "@reduxjs/toolkit";

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