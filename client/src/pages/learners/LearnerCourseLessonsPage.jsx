import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Box, Card, CardContent } from "@mui/material";
import { styled } from "@mui/system";

// Styled container for the video section
const VideoContainer = styled(Box)({
  position: "relative",
  paddingBottom: "56.25%", // 16:9 aspect ratio
  height: 0,
  overflow: "hidden",
  width: "100%",
  backgroundColor: "#000",
  marginBottom: "20px",
  "& iframe": {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
});

const LessonContent = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const LearnerCourseLessonsPage = () => {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [error, setError] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_URL;
  const FILE_URL = import.meta.env.VITE_FILE_URL;

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/lessons/fetchLessonById/${lessonId}`
        );
        setLesson(response.data.lesson);
        setError(null);
      } catch (error) {
        console.error(
          "Error fetching lesson:",
          error.response?.data || error.message
        );
        setError(
          error.response?.data?.message ||
            "An error occurred while fetching the lesson."
        );
      }
    };

    fetchLesson();
  }, [lessonId]);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!lesson) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <VideoContainer>
        {lesson.content.media
          .filter((item) => item.type === "video")
          .map((media, index) => (
            <iframe
              key={index}
              src={`${FILE_URL}${media.url}`}
              title={media.alt}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ))}
      </VideoContainer>

      <LessonContent>
        <Typography variant="h4" gutterBottom>
          {lesson.title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {lesson.content.text}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {lesson.content.media[0].description}
        </Typography>
        <Typography
          variant="caption"
          color="textSecondary"
          display="block"
          gutterBottom
        >
          Updated on: {new Date(lesson.updatedAt).toLocaleDateString()}
        </Typography>
      </LessonContent>

      {lesson.content.media
        .filter((item) => item.type !== "video")
        .map((media, index) => (
          <LessonContent key={index}>
            {media.type === "image" && (
              <img
                src={media.url}
                alt={media.alt}
                style={{ width: "100%", marginBottom: "10px" }}
              />
            )}
            {media.type === "audio" && (
              <audio controls>
                <source src={media.url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
            <Typography variant="body2">{media.description}</Typography>
          </LessonContent>
        ))}

      {lesson.content.embedded &&
        lesson.content.embedded.map((embedCode, index) => (
          <LessonContent
            key={index}
            dangerouslySetInnerHTML={{ __html: embedCode }}
          />
        ))}
    </Container>
  );
};

export default LearnerCourseLessonsPage;
