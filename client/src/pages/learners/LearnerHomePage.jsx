import React, { useState, useEffect, useRef } from "react";
import { getCourseCategoriesAPI } from "../../features/courses/CoursesAPI";
import CoursesByCategory from "./CoursesByCategories";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoursesByLearnerIdThunk } from "../../features/learners/LearnersThunks";
import { makeStyles } from "@mui/styles";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  Typography,
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  welcomeHeading: {
    marginBottom: theme.spacing(2),
  },
  filterButton: {
    marginBottom: theme.spacing(2),
  },
  filteringPanel: {
    position: "fixed",
    top: "70px",
    left: "25%",
    width: "300px",
    maxHeight: "calc(100vh - 100px)",
    overflowY: "auto",
    padding: "20px",
    zIndex: 999, // Ensure it's above other elements
    marginTop: theme.spacing(2),
  },
  filterCriterion: {
    marginBottom: theme.spacing(2),
  },
  closeFilterButton: {
    marginTop: theme.spacing(2),
  },
  filterCriterionButton: {
    width: "100%", // Make buttons equal in width
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(1, 2),
    textTransform: "none",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
      boxShadow: theme.shadows[4],
    },
    "&:active": {
      backgroundColor: theme.palette.action.selected,
    },
  },
  filterCriterionOptions: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    maxHeight: "150px", // Set a fixed height
    overflowY: "auto", // Enable scrolling
  },
  criterionContent: {
    flexGrow: 1,
  },
  categoryOption: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(0.5),
    padding: theme.spacing(0.5),
    borderRadius: theme.shape.borderRadius,
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  checkboxLabel: {
    marginLeft: theme.spacing(1),
    fontSize: "0.875rem",
  },
  checkbox: {
    padding: "4px", // Reduce padding around the checkbox
  },
}));

const LearnerHomepage = () => {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isFilteringOpen, setIsFilteringOpen] = useState(false);
  const dispatch = useDispatch();
  const { learnerData, enrolledCourses } = useSelector(
    (state) => state.learner
  );
  const learnerId = learnerData._id;
  const [filteringCriteria, setFilteringCriteria] = useState([
    { id: "categories", name: "Categories", isOpen: false },
    { id: "popular", name: "Popular", isOpen: false },
    { id: "trending", name: "Trending", isOpen: false },
    { id: "free", name: "Free", isOpen: false },
    { id: "paid", name: "Paid", isOpen: false },
    { id: "new", name: "New", isOpen: false },
    { id: "featured", name: "Featured", isOpen: false },
    { id: "topRated", name: "Top Rated", isOpen: false },
    { id: "recentlyUpdated", name: "Recently Updated", isOpen: false },
    // Add more criteria here
  ]);

  const filteringPanelRef = useRef(null); // Reference to the filtering panel

  useEffect(() => {
    fetchCategories();
    // Add event listener when component mounts
    document.addEventListener("click", handleClickOutside);
    // Clean up event listener when component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (Array.isArray(enrolledCourses) && enrolledCourses.length === 0) {
      dispatch(fetchCoursesByLearnerIdThunk(learnerId));
    }
  }, [dispatch, enrolledCourses, learnerId]);

  const fetchCategories = async () => {
    try {
      const categories = await getCourseCategoriesAPI();
      setCategories(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategoryChange = (event) => {
    const { id, checked } = event.target;
    setSelectedCategories((prevSelectedCategories) => {
      if (checked) {
        return [...prevSelectedCategories, id];
      } else {
        return prevSelectedCategories.filter((categoryId) => categoryId !== id);
      }
    });
  };

  const toggleFiltering = (event) => {
    event.stopPropagation(); // Prevent event propagation
    setIsFilteringOpen(!isFilteringOpen);
  };

  const toggleCriterion = (criterionId) => {
    setFilteringCriteria((prevCriteria) =>
      prevCriteria.map((criterion) => {
        if (criterion.id === criterionId) {
          return { ...criterion, isOpen: !criterion.isOpen };
        } else {
          return { ...criterion, isOpen: false };
        }
      })
    );
  };

  const handleClickOutside = (event) => {
    // Close filtering panel if clicked outside of it
    if (
      filteringPanelRef.current &&
      !filteringPanelRef.current.contains(event.target)
    ) {
      setIsFilteringOpen(false);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Typography variant="h1" className={classes.welcomeHeading}>
          Welcome to LibAcademy, Learner!
        </Typography>

        {/* Filtering Button */}
        <div style={{ position: "relative" }}>
          <Button
            onClick={toggleFiltering}
            variant="contained"
            color="primary"
            className={classes.filterButton}
          >
            Filter courses
          </Button>
          {isFilteringOpen && (
            <Paper className={classes.filteringPanel} ref={filteringPanelRef}>
              <Typography variant="h2">Filter by</Typography>
              {filteringCriteria.map((criterion) => (
                <div key={criterion.id} className={classes.filterCriterion}>
                  <Button
                    onClick={() => toggleCriterion(criterion.id)}
                    variant="outlined"
                    className={classes.filterCriterionButton}
                  >
                    <span className={classes.criterionContent}>
                      {criterion.name}
                    </span>
                    {criterion.isOpen ? "-" : "+"}
                  </Button>
                  {criterion.isOpen && (
                    <FormGroup className={classes.filterCriterionOptions}>
                      {criterion.id === "categories" &&
                        categories.map((category) => (
                          <div
                            key={category._id}
                            className={classes.categoryOption}
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  id={category._id}
                                  checked={selectedCategories.includes(
                                    category._id
                                  )}
                                  onChange={handleCategoryChange}
                                  className={classes.checkbox}
                                />
                              }
                              label={
                                <Typography className={classes.checkboxLabel}>
                                  {category.name}
                                </Typography>
                              }
                            />
                          </div>
                        ))}
                      {/* Add more options here */}
                    </FormGroup>
                  )}
                </div>
              ))}
              <Button
                onClick={toggleFiltering}
                variant="outlined"
                className={classes.closeFilterButton}
              >
                Close
              </Button>
            </Paper>
          )}
        </div>

        {/* Pass selected categories to CoursesByCategory */}
        <CoursesByCategory categories={selectedCategories} />
      </div>
    </div>
  );
};

export default LearnerHomepage;
