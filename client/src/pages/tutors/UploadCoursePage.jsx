import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCourseThunk } from '../../features/courses/CoursesThunks';
import { getCourseCategoriesAPI } from '../../features/courses/CoursesAPI';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Paper,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import { styled } from '@mui/material/styles';

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

const UploadCoursePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tutorId = useSelector((state) => state.tutor.tutorData._id);
  const isUploaded = useSelector((state) => state.courses.isUploaded);

  const [courseData, setCourseData] = useState({
    category: '',
    title: '',
    description: '',
    tutorId: tutorId,
    file: null,
    price: '',
    duration: '',
    startDate: ''
  });

  const [courseCategories, setCourseCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      const categories = await getCourseCategoriesAPI();
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

  const handleFileChange = (e) => {
    setCourseData({
      ...courseData,
      file: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('category', courseData.category);
    formData.append('title', courseData.title);
    formData.append('description', courseData.description);
    formData.append('tutorId', courseData.tutorId);
    formData.append('file', courseData.file);
    formData.append('price', courseData.price);
    formData.append('duration', courseData.duration);
    formData.append('startDate', courseData.startDate);

    try {
      const action = await dispatch(createCourseThunk(formData));
      if (action.type === 'courses/create/fulfilled') {
        navigate('/tutor/courses');
      }
    } catch (err) {
      setError('Error creating course');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isUploaded) {
      navigate('/tutor/courses');
    }
  }, [isUploaded, navigate]);

  return (
    <StyledContainer component={Paper}>
      <Typography variant="h4" gutterBottom>
        Upload New Course
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={courseData.title}
          onChange={handleChange}
          name="title"
          margin="normal"
          required
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={courseData.description}
          onChange={handleChange}
          name="description"
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel>Category</InputLabel>
          <Select
            label="Category"
            value={courseData.category}
            onChange={handleChange}
            name="category"
            required
          >
            {courseCategories.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box mt={2}>
          <input
            type="file"
            onChange={handleFileChange}
            accept="application/pdf, image/*, video/*"
            style={{ display: 'none' }}
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button variant="contained" component="span">
              Upload File
            </Button>
            {courseData.file && (
              <Typography variant="body2" sx={{ marginTop: 1 }}>
                {courseData.file.name}
              </Typography>
            )}
          </label>
        </Box>
        <TextField
          label="Price"
          variant="outlined"
          fullWidth
          type="number"
          value={courseData.price}
          onChange={handleChange}
          name="price"
          margin="normal"
        />
        <TextField
          label="Duration"
          variant="outlined"
          fullWidth
          value={courseData.duration}
          onChange={handleChange}
          name="duration"
          margin="normal"
        />
        <TextField
          label="Start Date"
          variant="outlined"
          fullWidth
          type="date"
          value={courseData.startDate}
          onChange={handleChange}
          name="startDate"
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <Box display="flex" justifyContent="flex-start" alignItems="center" mt={2}>
          <StyledButton variant="contained" color="primary" type="submit" disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : 'Upload Course'}
          </StyledButton>
        </Box>
      </form>
    </StyledContainer>
  );
};

export default UploadCoursePage;
