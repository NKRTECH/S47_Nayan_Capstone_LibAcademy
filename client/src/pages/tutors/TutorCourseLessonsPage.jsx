import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Alert,
  Container,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const BASE_URL = import.meta.env.VITE_API_URL;

const CreateLessonButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const EditButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.secondary.dark,
  },
}));

const CardContentWrapper = styled(CardContent)(({ theme }) => ({
  backgroundColor: "#205295",
  color: "#ffffff",
  borderRadius: "10px",
  "&:hover": {
    backgroundColor: "#1b3b5f",
  },
}));

function TutorCourseLessonsPage() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/lessons/fetchLessonsByCourseId/${courseId}`
        );
        setLessons(response.data);
        setError(null);
      } catch (error) {
        console.error(
          "Error fetching lessons:",
          error.response?.data || error.message
        );
        setError(
          error.response?.data?.message ||
            "An error occurred while fetching lessons."
        );
      }
    };

    fetchLessons();
  }, [courseId]);

  const handleLessonClick = (lessonId) => {
    navigate(`/tutor/courses/${courseId}/lessons/${lessonId}`);
  };

  const handleEditClick = (event, lessonId) => {
    event.stopPropagation();
    navigate(`/tutor/courses/${courseId}/lessons/edit/${lessonId}`);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Container
        sx={{ flexGrow: 1, paddingTop: "16px", paddingBottom: "16px" }}
      >
        <Typography variant="h4" gutterBottom>
          Course Lessons
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            marginBottom: "16px",
          }}
        >
          <CreateLessonButton
            variant="contained"
            onClick={() => navigate(`/tutor/courses/${courseId}/createlesson`)}
          >
            Create Lesson
          </CreateLessonButton>
        </Box>
        {error && <Alert severity="error">{error}</Alert>}
        <Grid container spacing={2}>
          {lessons.lessons?.map((lesson) => (
            <Grid item xs={12} sm={6} md={4} key={lesson._id}>
              <Card
                sx={{ cursor: "pointer", height: "100%",borderRadius: "10px" }}
                onClick={() => handleLessonClick(lesson._id)}
              >
                <CardContentWrapper>
                  <Typography variant="h6" gutterBottom>
                    {lesson.title}
                  </Typography>
                  <EditButton
                    variant="contained"
                    onClick={(event) => handleEditClick(event, lesson._id)}
                  >
                    Edit
                  </EditButton>
                </CardContentWrapper>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default TutorCourseLessonsPage;
