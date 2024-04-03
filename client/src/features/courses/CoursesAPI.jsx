import axios from "axios";

const BASE_URL = 'http://localhost:3000/api'; // Replace this with your actual backend API URL


export const createCourseAPI = async (courseData) => {
    try {
        const response = await axios.post(`${BASE_URL}/courses/create`, courseData);
        console.log('course data: ', courseData);
        console.log('Course created successfully!', response.data);
        return response.data;
    } catch (error) {
        console.error('Error in createCourseAPI:', error);
        throw error; // Re-throw the error if you want to handle it further up the call stack
    }
};

export const getCourseCategoriesAPI = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/courses/courseCategories`);
        console.log('Course categories fetched successfully!', response.data);
        return response.data;
    } catch (error) {
        console.error('Error in getCourseCategoriesAPI:', error);
        throw error; // Re-throw the error if you want to handle it further up the call stack
    }
}