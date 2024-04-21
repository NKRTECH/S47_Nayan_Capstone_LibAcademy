import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


const CreateLessons = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [alt, setAlt] = useState('');
  const [description, setDescription] = useState('');
  const [courseId, setCourseId] = useState('');
  const [priority, setPriority] = useState(0);
  const [videoFile, setVideoFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { courseId: urlCourseId } = useParams();
  const tutorId = useSelector((state) => state.tutor.tutorData._id);


  useEffect(() => {
    if (urlCourseId) {
      setCourseId(urlCourseId);
    }
  }, [urlCourseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const content = {
      text,
      media: [{
        type: 'video',
        alt,
        description
      }]
    };

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', JSON.stringify(content));
    formData.append('courseId', courseId);
    formData.append('videoFile', videoFile);
    formData.append('tutorId', tutorId);
    formData.append('priority', priority);

    try {
      const token = localStorage.getItem("token"); // Retrieve your token from localStorage
      const response = await axios.post('http://localhost:3000/api/lessons/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Lesson created successfully: ', response.data);
      navigate(`/tutor/courses/${courseId}/lessons`);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <br />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Lesson text"
        required
      />
      <br />
      <input
        type="text"
        value={alt}
        onChange={(e) => setAlt(e.target.value)}
        placeholder="Alt text for video"
      />
      <br />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Video description"
      />
      <br />
      <input
        type="text"
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
        placeholder="Course ID"
        required
        readOnly={true}
      />
      <br />
      <input
        type="number"
        value={priority}
        onChange={(e) => setPriority(Number(e.target.value))}
        placeholder="Order of lesson"
      />
      <br />
      <input
        type="file"
        onChange={(e) => setVideoFile(e.target.files[0])}
        accept="video/*"
        required
      />
      <br />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create Lesson'}
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
};

export default CreateLessons;



// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { createLessonThunk, fetchLessonsByCourseId } from '../../features/lessons/LessonsThunks';
// import { useNavigate, useParams } from 'react-router-dom';

// const CreateLessons = () => {
//   const [title, setTitle] = useState('');
//   const [text, setText] = useState('');
//   const [alt, setAlt] = useState('');
//   const [description, setDescription] = useState('');
//   const [courseId, setCourseId] = useState('');
//   const [priority, setPriority] = useState(0);
//   const [videoFile, setVideoFile] = useState(null);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isLoading, error } = useSelector((state) => state.lessons);
//   const tutorId = useSelector((state) => state.tutor.tutorData._id);
//   const { courseId: urlCourseId } = useParams();

//   useEffect(() => {
//     if (urlCourseId) {
//       setCourseId(urlCourseId);
//     }
//   }, [urlCourseId]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const content = {
//       text,
//       media: [{
//         type: 'video',
//         alt,
//         description
//       }]
//     };
//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('content', JSON.stringify(content));
//     formData.append('courseId', courseId);
//     formData.append('videoFile', videoFile);
//     formData.append('tutorId', tutorId);
//     formData.append('priority', priority);

//     dispatch(createLessonThunk(formData))
//     .then((action)=>{
//       if(action.type === 'lessons/createLesson/fulfilled'){
//         console.log('Lesson created successfully: ', action);
//         dispatch(fetchLessonsByCourseId(courseId)); // Refetch lessons
//         navigate(`/tutor/courses/${courseId}/lessons`);
//       }
//     })
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="Title"
//         required
//       />
//       <br />
//       <textarea
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Lesson text"
//         required
//       />
//       <br />
//       <input
//         type="text"
//         value={alt}
//         onChange={(e) => setAlt(e.target.value)}
//         placeholder="Alt text for video"
//       />
//       <br />
//       <textarea
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         placeholder="Video description"
//       />
//       <br />
//       <input
//         type="text"
//         value={courseId}
//         onChange={(e) => setCourseId(e.target.value)}
//         placeholder="Course ID"
//         required
//         readOnly={true}
//       />
//       <br />
//       <input
//         type="number"
//         value={priority}
//         onChange={(e) => setPriority(Number(e.target.value))}
//         placeholder="Order of lesson"
//       />
//       <br />
//       <input
//         type="file"
//         onChange={(e) => setVideoFile(e.target.files[0])}
//         accept="video/*"
//         required
//       />
//       <br />
//       <button type="submit" disabled={isLoading}>
//         {isLoading ? 'Creating...' : 'Create Lesson'}
//       </button>
//       {error && <p>{error.message}</p>}
//     </form>
//   );
// };

// export default CreateLessons;