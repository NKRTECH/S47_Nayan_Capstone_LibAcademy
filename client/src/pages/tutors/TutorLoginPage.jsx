import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { tutorLoginThunk } from "../../features/tutors/TutorThunks";

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

const TutorLoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check form validity before dispatching the thunk
    const form = e.target;
    if (form.checkValidity() === false) {
      // This will trigger the browser's built-in validation UI
      form.reportValidity();
      return;
    }

    dispatch(tutorLoginThunk(credentials))
      .then((action) => {
        if (action.type === "tutor/login/fulfilled") {
          navigate("/tutor/");
          // window.location.reload();
        }else if(action.type === "tutor/login/rejected"){
          setErrorMessage(action.payload);
          setOpenSnackbar(true);
        }
      })
      .catch((error) => {
          console.error("Error logging in:", error);
          setErrorMessage("An error occurred while logging in.");
          setOpenSnackbar(true);
      });
  };

  const handleGoogleSuccess = async (response) => {
    const { credential } = response;
    try {
      const result = await axios.post(`${BASE_URL}/tutors/login/google`, {
        credential,
      });
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("tutorData", JSON.stringify(result.data.tutor));
      navigate("/tutor/");
      window.location.reload();
    } catch (error) {
      console.error("Error logging in with Google OAuth:", error);
      setErrorMessage(error.response.data.message);
      setOpenSnackbar(true);
    }
  };

  const handleGoogleError = (error) => {
    console.error("Google Sign-In error:", error);
    setErrorMessage("An error occurred during Google Sign-In.");
    setOpenSnackbar(true);
  };


  return (
    <Container component="main" maxWidth="xs">
      <StyledPaper>
        <Typography component="h1" variant="h5">
          Tutor Login
        </Typography>
        <Form onSubmit={handleSubmit} noValidate>
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
            autoFocus
            value={credentials.email}
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
            value={credentials.password}
            onChange={handleChange}
          />
          <SubmitButton type="submit" fullWidth variant="contained">
            Login
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
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TutorLoginPage;
