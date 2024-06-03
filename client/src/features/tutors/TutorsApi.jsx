// TutorsApi.jsx
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

const setTutorAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

const tutorRegistrationAPI = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/tutors/register`, formData);
    console.log('tutorRegistrationAPI:--', response);
    // If registration is successful and you receive a token, set the Authorization header
    if (response.data.token) {
      console.log('response.data.token:--',response.data.token);
      setTutorAuthToken(response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Error in tutorRegistrationAPI:', error);
    throw error; // Re-throw the error if you want to handle it further up the call stack
  }
};

const tutorLoginAPI = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/tutors/login`, formData);
    console.log('tutorLoginAPI:--', response);
    // If login is successful and you receive a token, set the Authorization header
    if (response.data.token) {
      console.log('response.data.token:--',response.data.token);
      setTutorAuthToken(response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Error in tutorLoginAPI:', error);
    throw error; // Re-throw the error if you want to handle it further up the call stack
  }
};

export { tutorRegistrationAPI, tutorLoginAPI, setTutorAuthToken };


//**************************************************** */

// import axios from 'axios';

// const BASE_URL = 'http://localhost:3000/api'; // Replace this with your actual backend API URL

// const tutorRegistrationAPI = async (formData) => {
//  try {
//     const response = await axios.post(`${BASE_URL}/tutors/register`, formData);
//     console.log('tutorRegistrationAPI:--',response);
//     return response.data;
//  } catch (error) {
//     console.error('Error in tutorRegistrationAPI:', error);
//     throw error; // Re-throw the error if you want to handle it further up the call stack
//  }
// };

// const tutorLoginAPI = async (formData) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/tutors/login`, formData);
//     console.log('tutorLoginAPI:--',response);
//     return response.data;
//   } catch (error) {
//     console.error('Error in tutorLoginAPI:', error);
//     throw error; // Re-throw the error if you want to handle it further up the call stack
//   }
// };

// export { tutorRegistrationAPI, tutorLoginAPI };