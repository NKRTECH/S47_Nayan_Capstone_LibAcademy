// LearnersAPI.jsx
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api'; // Replace this with your actual backend API URL

const setLearnerAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

const learnerRegistrationAPI = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/learners/register`, formData);
    console.log('learnerRegistrationAPI:--', response);
    // If registration is successful and you receive a token, set the Authorization header
    if (response.data.token) {
      console.log('response.data.token:--',response.data.token);
      setLearnerAuthToken(response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Error in tutorRegistrationAPI:', error);
    throw error; // Re-throw the error if you want to handle it further up the call stack
  }
};

const learnerLoginAPI = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/learners/login`, formData);
    console.log('learnerLoginAPI:--', response);
    // If login is successful and you receive a token, set the Authorization header
    if (response.data.token) {
      console.log('response.data.token:--',response.data.token);
      setLearnerAuthToken(response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Error in learnerLoginAPI:', error);
    throw error; // Re-throw the error if you want to handle it further up the call stack
  }
};

export { learnerRegistrationAPI, learnerLoginAPI, setLearnerAuthToken };


//*************************************************** */

// import axios from 'axios';

// const BASE_URL = 'http://localhost:3000/api'; // Replace this with your actual backend API URL

// const learnerRegistrationAPI = async (formData) => {
//  try {
//     const response = await axios.post(`${BASE_URL}/learners/register`, formData);
//     console.log('learnerRegistrationAPI:--',response);
//     return response.data;
//  } catch (error) {
//     console.error('Error in tutorRegistrationAPI:', error);
//     throw error; // Re-throw the error if you want to handle it further up the call stack
//  }
// };

// const learnerLoginAPI = async (formData) => {
//  try {
//     const response = await axios.post(`${BASE_URL}/learners/login`, formData);
//     console.log('learnerLoginAPI:--',response);
//     return response.data;
//  } catch (error) {
//     console.error('Error in learnerLoginAPI:', error);
//     throw error; // Re-throw the error if you want to handle it further up the call stack
//  }
// };

// export { learnerRegistrationAPI, learnerLoginAPI };