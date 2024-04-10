import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api'; // Replace this with your actual backend API URL

export const createLessonAPI = async (lessonData) => {
    try {
        const response = await axios.post(`${BASE_URL}/lessons/create`, lessonData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        return response.data;
    } catch (error) {
        console.error('Error in createLesson:', error);
        throw error; // Re-throw the error if you want to handle it further up the call stack
    }
};