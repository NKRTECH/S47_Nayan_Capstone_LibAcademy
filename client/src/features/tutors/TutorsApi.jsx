import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api'; // Replace this with your actual backend API URL

const tutorRegistrationAPI = async (formData) => {
 try {
    const response = await axios.post(`${BASE_URL}/tutors/register`, formData);
    return response.data;
 } catch (error) {
    console.error('Error in tutorRegistrationAPI:', error);
    throw error; // Re-throw the error if you want to handle it further up the call stack
 }
};

const tutorLoginAPI = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/tutors/login`, formData);
    return response.data;
  } catch (error) {
    console.error('Error in tutorLoginAPI:', error);
    throw error; // Re-throw the error if you want to handle it further up the call stack
  }
};

export { tutorRegistrationAPI, tutorLoginAPI };