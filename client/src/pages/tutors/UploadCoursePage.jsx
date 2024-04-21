import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCourseThunk } from '../../features/courses/CoursesThunks';
import './UploadCoursePage.css'; // Import CSS file for styling
import { getCourseCategoriesAPI } from '../../features/courses/CoursesAPI';
import { useNavigate } from 'react-router-dom';

const UploadCoursePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tutorId = useSelector((state) => state.tutor.tutorData._id);
  const isUploaded = useSelector((state) => state.courses.isUploaded);
  console.log(isUploaded);
  
  const [courseData, setCourseData] = useState({
    category: [],
    title: '',
    description: '',
    tutorId: tutorId,
    file: null // For storing the uploaded file
  });

  const [courseCategories, setCourseCategories] = useState([]);
  
  const fetchCategories = async () => {
    try {
      const categories = await getCourseCategoriesAPI();
      console.log('Categories: ', categories);
      setCourseCategories(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setCourseData({
      ...courseData,
      [e.target.name]: e.target.value
    });
  };
  const handleCategoryChange = (e) => {
    const { name, checked, value } = e.target;
    if (checked) {
      setCourseData((prevState) => ({
        ...prevState,
        category: [...prevState.category, value],
      }));
    } else {
      setCourseData((prevState) => ({
        ...prevState,
        category: prevState.category.filter((categoryId) => categoryId !== value),
      }));
    }
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
    dispatch(createCourseThunk(formData))
    .then((action)=>{
        console.log('action:--', action);
        if(action.type === 'courses/create/fulfilled'){
           console.log('Course created successfully:--', action.payload);
            navigate('/tutor/courses');
        }
    }).catch((error) => {
        console.error('Error creating course:', error);
    });
  };
  useEffect(()=>{
    if(isUploaded){
      navigate('/tutor/courses');
    }
  },[isUploaded, navigate])

  return (
    <div className="upload-course-container">
      <h2>Upload New Course</h2>
      <form onSubmit={handleSubmit} className="upload-course-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={courseData.title} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" value={courseData.description} onChange={handleChange}></textarea>
        </div>

        <div className="form-group">
          <label>Categories:</label>
          {courseCategories.map(category => (
            <div key={category._id}>
              <input
              type="checkbox"
              id={category._id}
              name="category"
              value={category._id}
              checked={courseData.category.includes(category._id)}
              onChange={handleCategoryChange}
              />
              <label htmlFor={category._id}>{category.name}</label>
            </div>
          ))}
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