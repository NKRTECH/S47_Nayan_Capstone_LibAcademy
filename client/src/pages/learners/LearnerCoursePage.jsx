import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { CircularProgress, Typography, Paper, Box } from "@mui/material";
import { styled } from "@mui/system";
import LessonCard from "../../components/learner/LessonCard";

const BASE_URL = import.meta.env.VITE_API_URL;

const Container = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  background: "linear-gradient(to bottom, #0c1445, #0d1142)",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  color: "#ffffff",
  fontFamily: "'Roboto', sans-serif",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: "rgba(255, 255, 255, 0.3)",
  borderRadius: "15px",
  boxShadow: theme.shadows[5],
  maxWidth: "900px",
  width: "100%",
  marginBottom: theme.spacing(2),
  position: "relative",
  overflow: "hidden",
}));

const Star = React.memo(
  styled("div")(({ theme }) => ({
    position: "absolute",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.5)",
    width: "2px",
    height: "2px",
    animation: "$twinkle 1s infinite",
    zIndex: 1,
  }))
);

const Title = styled(Typography)(({ theme }) => ({
  color: "#ffffff",
  marginBottom: theme.spacing(2),
  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
  fontFamily: "'Roboto Slab', serif",
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  color: "#ffffff",
  marginBottom: theme.spacing(3),
  textShadow: "1px 1px 3px rgba(0,0,0,0.2)",
  fontFamily: "'Roboto Slab', serif",
}));

const ErrorMessage = styled(Typography)(({ theme }) => ({
  color: "#ff1744",
  backgroundColor: "#f8bbd0",
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  fontFamily: "'Roboto', sans-serif",
}));

const LoadingSpinner = styled(CircularProgress)(({ theme }) => ({
  color: "#ffffff",
  display: "block",
  margin: `${theme.spacing(4)} auto`,
}));

const LessonsContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  display: "grid",
  gap: theme.spacing(2),
}));

const LearnerCoursePage = () => {
  const learnerId = useSelector((state) => state.learner.learnerData?._id);
  const { courseId } = useParams();
  const location = useLocation();
  const course = location.state?.course;
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.post(
          `${BASE_URL}/lessons/fetchLessonsByCourseId/${courseId}`,
          { learnerId }
        );
        console.log("Lessons fetched successfully by courseId:", response.data);
        setLessons(response.data.lessons);
        setIsEnrolled(response.data.isEnrolled);
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
        setIsEnrolled(false);
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [courseId, learnerId]);

  return (
    <Container>
      <StyledPaper elevation={0}>
        {[...Array(200)].map((_, index) => (
          <Star
            key={index}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
        <Title variant="h2">Lessons for {course?.title}</Title>
        <Subtitle variant="h5">
          Instructor:{" "}
          {`${course?.tutorId?.firstName} ${course?.tutorId?.lastName}`}
        </Subtitle>
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage variant="body1">{error}</ErrorMessage>
        ) : (
          <LessonsContainer>
            {lessons?.map((lesson) => (
              <LessonCard
                key={lesson._id}
                lesson={lesson}
                isEnrolled={isEnrolled}
              />
            ))}
          </LessonsContainer>
        )}
      </StyledPaper>
    </Container>
  );
};

export default LearnerCoursePage;
