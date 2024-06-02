import React, { useState, useEffect, useRef } from "react";
import { getCourseCategoriesAPI } from "../../features/courses/CoursesAPI";
import CoursesByCategory from "./CoursesByCategories";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoursesByLearnerIdThunk } from "../../features/learners/LearnersThunks";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";

const Root = styled("div")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
}));

const WelcomeHeading = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const FilterButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const FilteringPanel = styled(Paper)(({ theme }) => ({
  position: "fixed",
  top: "70px",
  left: "25%",
  width: "300px",
  maxHeight: "calc(100vh - 100px)",
  overflowY: "auto",
  padding: "20px",
  zIndex: 999, // Ensure it's above other elements
  marginTop: theme.spacing(2),
}));

const FilterCriterion = styled("div")(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const CloseFilterButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const FilterCriterionButton = styled(Button)(({ theme }) => ({
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
}));

const FilterCriterionOptions = styled(FormGroup)(({ theme }) => ({
  padding: theme.spacing(1),
  marginTop: theme.spacing(1),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  maxHeight: "150px", // Set a fixed height
  overflowY: "auto", // Enable scrolling
}));

const CriterionContent = styled("span")({
  flexGrow: 1,
});

const CategoryOption = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(0.5),
  padding: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const CheckboxLabel = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  fontSize: "0.875rem",
}));

const CustomCheckbox = styled(Checkbox)({
  padding: "4px", // Reduce padding around the checkbox
});

const LearnerHomepage = () => {
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
    <Root>
      <div>
        <WelcomeHeading variant="h1">
          Welcome to LibAcademy, Learner!
        </WelcomeHeading>

        {/* Filtering Button */}
        <div style={{ position: "relative" }}>
          <FilterButton
            onClick={toggleFiltering}
            variant="contained"
            color="primary"
          >
            Filter courses
          </FilterButton>
          {isFilteringOpen && (
            <FilteringPanel ref={filteringPanelRef}>
              <Typography variant="h2">Filter by</Typography>
              {filteringCriteria.map((criterion) => (
                <FilterCriterion key={criterion.id}>
                  <FilterCriterionButton
                    onClick={() => toggleCriterion(criterion.id)}
                    variant="outlined"
                  >
                    <CriterionContent>{criterion.name}</CriterionContent>
                    {criterion.isOpen ? "-" : "+"}
                  </FilterCriterionButton>
                  {criterion.isOpen && (
                    <FilterCriterionOptions>
                      {criterion.id === "categories" &&
                        categories.map((category) => (
                          <CategoryOption key={category._id}>
                            <FormControlLabel
                              control={
                                <CustomCheckbox
                                  id={category._id}
                                  checked={selectedCategories.includes(
                                    category._id
                                  )}
                                  onChange={handleCategoryChange}
                                />
                              }
                              label={
                                <CheckboxLabel>{category.name}</CheckboxLabel>
                              }
                            />
                          </CategoryOption>
                        ))}
                      {/* Add more options here */}
                    </FilterCriterionOptions>
                  )}
                </FilterCriterion>
              ))}
              <CloseFilterButton onClick={toggleFiltering} variant="outlined">
                Close
              </CloseFilterButton>
            </FilteringPanel>
          )}
        </div>

        {/* Pass selected categories to CoursesByCategory */}
        <CoursesByCategory categories={selectedCategories} />
      </div>
    </Root>
  );
};

export default LearnerHomepage;
