import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoursesByLearnerIdThunk } from "../../features/learners/LearnersThunks";
import CourseCard from "../../components/course/CourseCard";
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LearnerMyCoursesPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enrolledCourses, loading, error, learnerData } = useSelector(
    (state) => state.learner
  );
  const learnerId = learnerData?._id;

    useEffect(() => {
      // Check if enrolledCourses is an empty array
      if (Array.isArray(enrolledCourses) && enrolledCourses.length === 0) {
        dispatch(fetchCoursesByLearnerIdThunk(learnerId));
      }
    }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ marginTop: 4, marginBottom: 4 }}>
        <Typography variant="h4" gutterBottom>
          My Courses
        </Typography>
        {loading && <CircularProgress />}
        {error && (
          <Alert severity="error">Error loading courses: {error}</Alert>
        )}
        {!loading &&
          !error &&
          Array.isArray(enrolledCourses) &&
          enrolledCourses.length === 0 && (
            <Typography variant="body1" color="textSecondary">
              You are not enrolled in any courses.
            </Typography>
          )}

        <Grid container spacing={3}>
          {enrolledCourses?.map((course) => (
            <Grid
              item
              key={course._id}
              xs={12}
              sm={6}
              md={4}

            >
              <CourseCard course={course} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
