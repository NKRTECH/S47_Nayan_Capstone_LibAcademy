import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const BASE_URL = import.meta.env.VITE_API_URL;

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

const EditLessonPage = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [alt, setAlt] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [courseId, setCourseId] = useState("");
  const [priority, setPriority] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { lessonId } = useParams();

  useEffect(() => {
    const fetchLesson = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/lessons/fetchLessonById/${lessonId}`
        );
        const lesson = response.data.lesson;
        setTitle(lesson.title);
        setText(lesson.content.text);
        setAlt(lesson.content.media[0]?.alt || "");
        setDescription(lesson.content.media[0]?.description || "");
        setCourseId(lesson.courseId);
        setPriority(lesson.priority);
        setIsLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching lesson");
        setIsLoading(false);
      }
    };

    if (lessonId) {
      fetchLesson();
    }
  }, [lessonId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("text", text);
    formData.append("alt", alt);
    formData.append("description", description);
    formData.append("courseId", courseId);
    formData.append("priority", priority);
    if (videoFile) {
      formData.append("videoFile", videoFile);
    }

    try {
      await axios.put(`${BASE_URL}/lessons/update/${lessonId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate(`/tutor/courses/${courseId}/lessons`);
    } catch (err) {
      setError(err.response?.data?.message || "Error updating lesson");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      setIsLoading(true);
      try {
        await axios.delete(`${BASE_URL}/lessons/delete/${lessonId}`);
        navigate(`/tutor/courses/${courseId}/lessons`);
      } catch (err) {
        setError(err.response?.data?.message || "Error deleting lesson");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <StyledContainer component={Paper}>
      <Typography variant="h4" gutterBottom>
        Edit Lesson
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Lesson text"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          label="Alt text for video"
          variant="outlined"
          fullWidth
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Video description"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Order of lesson"
          variant="outlined"
          fullWidth
          type="number"
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
          margin="normal"
        />
        <TextField
          label="Course ID"
          variant="outlined"
          fullWidth
          value={courseId}
          margin="normal"
          required
          InputProps={{
            readOnly: true,
          }}
        />
        <Box mt={2}>
          <input
            type="file"
            onChange={(e) => setVideoFile(e.target.files[0])}
            accept="video/*"
            style={{ display: "none" }}
            id="video-upload"
          />
          <label htmlFor="video-upload">
            <Button variant="contained" component="span">
              Upload Video
            </Button>
            {videoFile && (
              <Typography variant="body2" sx={{ marginTop: 1 }}>
                {videoFile.name}
              </Typography>
            )}
          </label>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <StyledButton
            variant="contained"
            color="primary"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Update Lesson"}
          </StyledButton>
          <StyledButton
            variant="contained"
            color="secondary"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Delete Lesson"}
          </StyledButton>
        </Box>
      </form>
    </StyledContainer>
  );
};

export default EditLessonPage;
