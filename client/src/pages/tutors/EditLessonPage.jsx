// src/pages/EditLessonPage.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
const BASE_URL = 'http://localhost:3000/api';

const EditLessonPage = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [alt, setAlt] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [courseId, setCourseId] = useState('');
  const [priority, setPriority] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { lessonId } = useParams();

  useEffect(() => {
    const fetchLesson = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/lessons/fetchLessonById/${lessonId}`);
        const lesson = response.data.lesson;
        setTitle(lesson.title);
        setText(lesson.content.text);
        setAlt(lesson.content.media[0]?.alt || '');
        setDescription(lesson.content.media[0]?.description || '');
        setCourseId(lesson.courseId);
        setPriority(lesson.priority);
        setIsLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching lesson');
        setIsLoading(false);
      }
    };

    if (lessonId) {
      fetchLesson();
    }
  }, [lessonId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('text', text);
    formData.append('alt', alt);
    formData.append('description', description);
    formData.append('courseId', courseId);
    formData.append('priority', priority);
    if (videoFile) {
      formData.append('videoFile', videoFile);
    }

    try {
      await axios.put(`${BASE_URL}/lessons/update/${lessonId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate(`/tutor/courses/${courseId}/lessons`);
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating lesson');
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this lesson?')) {
      setIsLoading(true);
      try {
        await axios.delete(`${BASE_URL}/lessons/delete/${lessonId}`);
        navigate(`/tutor/courses/${courseId}/lessons`);
      } catch (err) {
        setError(err.response?.data?.message || 'Error deleting lesson');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      <h1>Edit Lesson</h1>
      {error && <p className="error">{error}</p>}
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
          type="number"
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
          placeholder="Order of lesson"
        />
        <br />
        <input
          type="text"
          value={courseId}
          placeholder="Course ID"
          required
          readOnly={true}
        />

        <br />
        <input
          type="file"
          onChange={(e) => setVideoFile(e.target.files[0])}
          accept="video/*"
        />
        <br />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Lesson'}
        </button>
      </form>
      <button type="button" onClick={handleDelete} disabled={isLoading}>
        {isLoading ? 'Deleting...' : 'Delete Lesson'}
      </button>

    </div>
  );
};

export default EditLessonPage;