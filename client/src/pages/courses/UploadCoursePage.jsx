import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCourseThunk } from '../../features/courses/CoursesThunks';
import './UploadCoursePage.css'; // Import CSS file for styling

const UploadCoursePage = () => {
  const dispatch = useDispatch();
  const [courseData, setCourseData] = useState({
    category: '',
    title: '',
    description: '',
    file: null // For storing the uploaded file
  });

  const handleChange = (e) => {
    setCourseData({
      ...courseData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setCourseData({
      ...courseData,
      file: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('category', courseData.category);
    formData.append('title', courseData.title);
    formData.append('description', courseData.description);
    formData.append('tutorId', courseData.tutorId);
    formData.append('file', courseData.file);
    // console.log('typeof: ',typeof formData)
    // console.log('formData: ', formData)
    // console.log(createCourseThunk)

    // Dispatch action to update Redux store with the newly created course
    dispatch(createCourseThunk(formData));
  };

  return (
    <div className="upload-course-container">
      <h2>Upload New Course</h2>
      <form onSubmit={handleSubmit} className="upload-course-form">
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input type="text" id="category" name="category" value={courseData.category} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={courseData.title} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={courseData.description} onChange={handleChange}></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="file">File:</label>
          <input type="file" id="file" onChange={handleFileChange} />
        </div>
        <button type="submit" className="submit-btn">Upload Course</button>
      </form>
    </div>
  );
};

export default UploadCoursePage;