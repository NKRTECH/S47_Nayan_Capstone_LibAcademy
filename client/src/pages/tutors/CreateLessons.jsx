import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';

const BASE_URL = import.meta.env.VITE_API_URL;

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginRight: theme.spacing(2),
}));

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
      const response = await axios.post(`${BASE_URL}/lessons/create`, formData, {
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
    <StyledContainer component={Paper}>
      <Typography variant="h4" gutterBottom>
        Create Lesson
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Lesson text"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Alt text for video"
          variant="outlined"
          fullWidth
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Video description"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Order of lesson"
          variant="outlined"
          fullWidth
          type="number"
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
          margin="normal"
        />
        <TextField
          label="Course ID"
          variant='filled'
          fullWidth
          value={courseId}
          margin="normal"
          required
          InputProps={{
            readOnly: true,
          }}
        />
        <Box mt={2}>
          <input
            type="file"
            onChange={(e) => setVideoFile(e.target.files[0])}
            accept="video/*"
            style={{ display: 'none' }}
            id="video-upload"
          />
          <label htmlFor="video-upload">
            <Button variant="contained" component="span">
              Upload Video
            </Button>
            {videoFile && <Typography variant="body2" sx={{ marginTop: 1 }}>{videoFile.name}</Typography>}
          </label>
        </Box>
        <Box display="flex" justifyContent="flex-start" alignItems="center" mt={2}>
          <StyledButton variant="contained" color="primary" type="submit" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : 'Create Lesson'}
          </StyledButton>
        </Box>
      </form>
    </StyledContainer>
  );
};

export default CreateLessons;
