import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CourseCard from "../../components/course/CourseCard";

const BASE_URL = import.meta.env.VITE_API_URL;

const CreateCourseButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const ErrorBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.error.main,
  color: theme.palette.error.contrastText,
  marginBottom: theme.spacing(2),
}));

function TutorCoursePage() {
  const [tutorCourses, setTutorCourses] = useState([]);
  const { tutorData } = useSelector((state) => state.tutor);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (tutorData) {
      const fetchCoursesByTutor = async () => {
        try {
          const response = await axios.get(
            `${BASE_URL}/courses/fetchCoursesByTutor/${tutorData._id}`
          );
          setTutorCourses(response.data.courses);
          setError(null);
        } catch (error) {
          console.error("Error fetching courses:", error);
          setError(error.response.data.message);
        }
      };
      fetchCoursesByTutor();
    }
  }, [tutorData]);

  useEffect(() => {
    console.log("Tutor courses:", tutorCourses);
  }, [tutorCourses]);

  return (
    <Box
      sx={{ padding: "16px", minHeight: "100vh", width: "100%" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: 'left',
          marginBottom: "16px",
        }}
      >
        <CreateCourseButton
          variant="contained"
          onClick={() => navigate("/tutor/courses/create")}
        >
          Create Course
        </CreateCourseButton>
      </Box>
      {error && <ErrorBox>{error}</ErrorBox>}
      <Grid container spacing={2}>
        {tutorCourses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course._id}>
            <Box sx={{ height: "100%" }}>
              <CourseCard course={course} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default TutorCoursePage;
