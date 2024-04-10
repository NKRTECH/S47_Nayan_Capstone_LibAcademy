// src/components/LessonForm.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createLessonThunk } from '../../features/lessons/LessonsThunks';
import { useParams } from 'react-router-dom';

const CreateLessons = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [alt, setAlt] = useState('');
  const [description, setDescription] = useState('');
  const [courseId, setCourseId] = useState('');
  const [priority, setPriority] = useState(0);
  const [videoFile, setVideoFile] = useState(null);

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.lessons);
  const tutorId = useSelector((state) => state.tutor.tutorData._id);

   // Use useParams to access the URL parameters
  const { courseId: urlCourseId } = useParams(); // Access courseId from the URL

 // You can now use urlCourseId in your component, for example, to set the initial courseId state
  useState(() => {
     setCourseId(urlCourseId);
  }, [urlCourseId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const lessonData = { title, content, alt, description, courseId, videoFile, priority };
    const formData = new FormData();
    // Append all fields to formData
    formData.append('title', lessonData.title);
    formData.append('content', lessonData.content);
    formData.append('alt', lessonData.alt);
    formData.append('description', lessonData.description);
    formData.append('courseId', lessonData.courseId);
    formData.append('videoFile', lessonData.videoFile);
    formData.append('tutorId', tutorId);
    // console.log(lessonData);
    formData.append('priority', lessonData.priority);
    dispatch(createLessonThunk(formData));
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
      <br /> <br />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
      />
      <br /> <br />
      <input
        type="text"
        value={alt}
        onChange={(e) => setAlt(e.target.value)}
        placeholder="Alt text for video"
      />
      <br /> <br />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Video description"
      />
      <br /> <br />
      <input
        type="text"
        value={courseId}
        placeholder="Course ID"
        required
        readOnly={true}
      />
      <br /> <br />
      <label htmlFor="priority">Set lesson order </label>
      <input 
      type="number" 
      value={priority} 
      onChange={(e) => setPriority(e.target.value)} 
      placeholder="Order of lesson" 
      />
      <br /> <br />
      <input
        type="file"
        onChange={(e) => setVideoFile(e.target.files[0])}
        accept="video/*"
        required
      />
      <br /> <br />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create Lesson'}
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
};

export default CreateLessons;
