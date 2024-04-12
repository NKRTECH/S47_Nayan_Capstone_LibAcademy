import axios from "axios";

const BASE_URL = 'http://localhost:3000/api';

// Function to set the token as the default Authorization header
export const setAuthToken = token => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };
  
  // Call the setAuthToken function with the actual token
  // You need to call this function whenever the token changes, for example after login
  // Replace 'yourActualTokenHere' with the method to retrieve your actual token
//   const token = localStorage.getItem("token");
//   setAuthToken(token);


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


export const getCoursesByCategoriesAPI = async (categories) => {
    console.log('Categories api: ', categories);
    try {
        const response = await axios.get(`${BASE_URL}/courses/fetchCoursesByCategories`, {
            params: {
                categories: categories.join(','),
            },
        });
        console.log('Courses fetched successfully!', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching courses by categories:', error);
        throw new Error('Network response was not ok');
    }
};