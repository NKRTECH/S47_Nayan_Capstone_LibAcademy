import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";
import { tutorRegisterThunk } from "../../features/tutors/TutorThunks";

const BASE_URL = import.meta.env.VITE_API_URL;
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: theme.palette.background.default,
  boxShadow: theme.shadows[5],
}));

const Form = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  color: theme.palette.common.white,
}));

const GoogleBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  width: "100%",
  display: "flex",
  justifyContent: "center",
}));

const TutorRegistrationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    if (form.checkValidity() === false) {
      form.reportValidity();
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setOpenSnackbar(true);
      return;
    }

    dispatch(tutorRegisterThunk(formData))
      .then((action) => {
        console.log('action object--', action)
        if (action.type === "tutor/register/fulfilled") {
          navigate("/tutor/");
          window.location.reload();
        } else if (action.type === "tutor/register/rejected") {
          console.error("Registration failed:", action.payload);
          setError(action.payload || "Registration failed");
          setOpenSnackbar(true);
        }
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        setError(error.message || "Registration failed");
        setOpenSnackbar(true);
      });
  };

  const handleGoogleSuccess = async (response) => {
    const { credential } = response;
    try {
      const result = await axios.post(`${BASE_URL}/tutors/register/google`, {
        credential,
      });
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("tutorData", JSON.stringify(result.data.tutor));
      navigate("/tutor/");
      window.location.reload();
    } catch (error) {
      console.error("Error registering with Google OAuth:", error);
      setError(error.response?.data?.message || "Google registration failed");
      setOpenSnackbar(true);
    }
  };

  const handleGoogleError = (error) => {
    console.error("Google Sign-In error:", error);
    setError("Google Sign-In failed");
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <StyledPaper>
        <Typography component="h1" variant="h5">
          Tutor Registration
        </Typography>
        <Form onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            type="text"
            autoComplete="fname"
            autoFocus
            value={formData.firstName}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            type="text"
            autoComplete="lname"
            value={formData.lastName}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <SubmitButton type="submit" fullWidth variant="contained">
            Register
          </SubmitButton>
        </Form>
        <GoogleBox>
          <GoogleOAuthProvider clientId={googleClientId}>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onFailure={handleGoogleError}
              scope="profile email"
            />
          </GoogleOAuthProvider>
        </GoogleBox>
      </StyledPaper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TutorRegistrationPage;
