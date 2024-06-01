import { useState, useEffect, useRef } from 'react';
import { getCourseCategoriesAPI } from '../../features/courses/CoursesAPI';
import CoursesByCategory from './CoursesByCategories';
import styles from './LearnerHomePage.module.css'; // Import the CSS module
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoursesByLearnerIdThunk } from '../../features/learners/LearnersThunks';

const LearnerHomepage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isFilteringOpen, setIsFilteringOpen] = useState(false);
  const dispatch = useDispatch();
  const { learnerData, enrolledCourses } = useSelector((state) => state.learner);
  const learnerId = learnerData._id;
  const [filteringCriteria, setFilteringCriteria] = useState([
    { id: 'categories', name: 'Categories', isOpen: false },
    {id: 'popular', name: 'Popular', isOpen: false },
    {id: 'trending', name: 'Trending', isOpen: false },
    {id: 'free', name: 'Free', isOpen: false },
    {id: 'paid', name: 'Paid', isOpen: false },
    {id: 'new', name: 'New', isOpen: false},
    {id: 'featured', name: 'Featured', isOpen: false},
    {id: 'topRated', name: 'Top Rated', isOpen: false},
    {id: 'recentlyUpdated', name: 'Recently Updated', isOpen: false},
    // Add more criteria here
  ]);

  const filteringPanelRef = useRef(null); // Reference to the filtering panel

  useEffect(() => {
    fetchCategories();
    // Add event listener when component mounts
    document.addEventListener('click', handleClickOutside);
    // Clean up event listener when component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
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
      console.error('Error fetching categories:', error);
    }
  };

  

  const handleCategoryChange = (event) => {
    const { id, checked } = event.target;
    setSelectedCategories(prevSelectedCategories => {
      if (checked) {
        return [...prevSelectedCategories, id];
      } else {
        return prevSelectedCategories.filter(categoryId => categoryId!== id);
      }
    });
  };

  const toggleFiltering = (event) => {
    event.stopPropagation(); // Prevent event propagation
    setIsFilteringOpen(!isFilteringOpen);
  };

  const toggleCriterion = (criterionId) => {
    setFilteringCriteria(prevCriteria => prevCriteria.map(criterion => {
      if (criterion.id === criterionId) {
        return {...criterion, isOpen: !criterion.isOpen };
      } else {
        return {...criterion, isOpen: false };
      }
    }));
  };

  const handleClickOutside = (event) => {
    // Close filtering panel if clicked outside of it
    if (filteringPanelRef.current && !filteringPanelRef.current.contains(event.target)) {
      setIsFilteringOpen(false);
    }
  };

  return (
    <div className={styles['learner-homepage']}>
      <div className={styles['content']}>
        <h1 className={styles['welcome-heading']}>Welcome to LibAcademy, Learner!</h1>

        {/* Filtering Button */}
        <button onClick={toggleFiltering} className={styles['filter-button']}>Filter courses</button>

        {/* Filtering Panel */}
        {isFilteringOpen && (
          <div ref={filteringPanelRef} className={styles['filtering-panel']}>
            <h2>Filter by</h2>
            {filteringCriteria.map(criterion => (
              <div key={criterion.id} className={styles['filter-criterion']}>
                <button onClick={() => toggleCriterion(criterion.id)} className={styles['filter-criterion-button']}>
                  {criterion.name}
                </button>
                {criterion.isOpen && (
                  <div className={`${styles['filter-criterion-options']} custom-filter-options`}>
                    {criterion.id === 'categories' && categories.map(category => (
                      <div key={category._id} className={styles['category-option']}>
                        <div className={styles['checkbox-wrapper']}>
                          <input
                            type="checkbox"
                            id={category._id}
                            className={styles['custom-checkbox']}
                            checked={selectedCategories.includes(category._id)}
                            onChange={handleCategoryChange}
                          />
                          <span className={styles['checkmark']}></span>
                        </div>
                        <label htmlFor={category._id} className={styles['category-label']}>{category.name}</label>
                      </div>
                    ))}
                    {/* Add more options here */}
                  </div>
                )}

              </div>
            ))}
            <button onClick={toggleFiltering} className={styles['close-filter-button']}>Close</button>
          </div>
        )}

        {/* Pass selected categories to CoursesByCategory */}
        <CoursesByCategory categories={selectedCategories} />
      </div>
    </div>
  );
};

export default LearnerHomepage;