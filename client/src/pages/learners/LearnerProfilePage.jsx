import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { styled } from "@mui/system";
import { logout } from "../../features/learners/LearnersSlice";
import { updateLearnerProfileThunk } from "../../features/learners/LearnersThunks";

const BASE_URL = import.meta.env.VITE_API_URL;

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1c1c1c",
      paper: "#2e2e2e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0bec5",
    },
  },
});

const ProfileContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minHeight: "100vh", // Ensure this covers the full height of the viewport
  padding: theme.spacing(3),
}));

const ProfilePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  width: "100%",
  maxWidth: 600,
  marginTop: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
}));

const ProfileForm = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1),
}));

const FormField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const LearnerProfilePage = () => {
  const learnerData = useSelector((state) => state.learner.learnerData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [editableData, setEditableData] = useState({
    firstName: learnerData.firstName || "",
    lastName: learnerData.lastName || "",
    email: learnerData.email,
  });

  const [isEditMode, setIsEditMode] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const toggleEditMode = () => {
    setIsEditMode((prevMode) => !prevMode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(
        updateLearnerProfileThunk({
          learnerId: learnerData._id,
          updatedData: editableData,
        })
      );
      toggleEditMode();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
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
        <ProfileContainer component="main">
          <Typography component="h1" variant="h5">
            Learner Profile
          </Typography>
          <ProfilePaper>
            {isEditMode ? (
              <ProfileForm onSubmit={handleSubmit}>
                <FormField
                  variant="outlined"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  value={editableData.firstName}
                  onChange={handleChange}
                />
                <FormField
                  variant="outlined"
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={editableData.lastName}
                  onChange={handleChange}
                />
                <FormField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  value={editableData.email}
                  InputProps={{
                    readOnly: true,
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
              </ProfileForm>
            ) : (
              <Box>
                <Typography variant="body1">
                  <strong>First Name:</strong> {learnerData.firstName}
                </Typography>
                <Typography variant="body1">
                  <strong>Last Name:</strong> {learnerData.lastName}
                </Typography>
                <Typography variant="body1">
                  <strong>Email:</strong> {learnerData.email}
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
                    variant="contained"
                    color="secondary"
                  >
                    Logout
                  </Button>
                </Box>
              </Box>
            )}
          </ProfilePaper>
        </ProfileContainer>
      </Box>
    </ThemeProvider>
  );
};

export default LearnerProfilePage;
