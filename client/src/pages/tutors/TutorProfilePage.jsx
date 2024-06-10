import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/tutors/TutorsSlice';
import { Box, Button, Container, TextField, Typography, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#181818', // Darker hazy black with a slight whitish tone
      paper: '#2e2e2e',   // Slightly lighter background for profile box
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    },
  },
});

const TutorProfilePage = () => {
  const tutorData = useSelector(state => state.tutor.tutorData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [editableData, setEditableData] = useState({
    firstName: tutorData.firstName || '',
    lastName: tutorData.lastName || '',
    email: tutorData.email || '',
  });

  const [isEditMode, setIsEditMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const toggleEditMode = () => {
    setIsEditMode(prevMode => !prevMode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:3000/api/tutor/profile', editableData);
      console.log('Profile updated:', response.data);
      toggleEditMode();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    window.location.reload();
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh", // Ensure this covers the full height of the viewport
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          width: "100%",
        }}
      >
        <Container maxWidth="sm">
          <Paper
            sx={{
              padding: 4,
              backgroundColor: theme.palette.background.paper,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Typography variant="h4" gutterBottom>
              Tutor Profile
            </Typography>
            {isEditMode ? (
              <form onSubmit={handleSubmit}>
                <TextField
                  label="First Name"
                  name="firstName"
                  value={editableData.firstName}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    style: { color: theme.palette.text.secondary },
                  }}
                  InputProps={{ style: { color: theme.palette.text.primary } }}
                />
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={editableData.lastName}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    style: { color: theme.palette.text.secondary },
                  }}
                  InputProps={{ style: { color: theme.palette.text.primary } }}
                />
                <TextField
                  label="Email"
                  name="email"
                  value={editableData.email}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  InputProps={{
                    readOnly: true,
                    style: { color: theme.palette.text.primary },
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Button type="submit" variant="contained" color="primary">
                    Save Changes
                  </Button>
                  <Button
                    onClick={toggleEditMode}
                    variant="outlined"
                    color="secondary"
                  >
                    Cancel
                  </Button>
                </Box>
              </form>
            ) : (
              <Box>
                <Typography variant="body1">
                  <strong>First Name:</strong> {tutorData.firstName}
                </Typography>
                <Typography variant="body1">
                  <strong>Last Name:</strong> {tutorData.lastName}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {tutorData.email}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Button
                    onClick={toggleEditMode}
                    variant="contained"
                    color="primary"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={handleLogout}
                    variant="outlined"
                    color="secondary"
                  >
                    Logout
                  </Button>
                </Box>
              </Box>
            )}
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default TutorProfilePage;
