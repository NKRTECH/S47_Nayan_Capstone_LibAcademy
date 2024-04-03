import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCourseCategoriesAPI } from '../../features/courses/CoursesAPI';

const LearnerHomepage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories when component mounts
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const categories = await getCourseCategoriesAPI();
      console.log('Categories: ', categories);
      setCategories(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <div className="learner-homepage">
      {/* <NavUser /> */}
      <div className="content">
        <h1>Welcome to LibAcademy, Learner!</h1>
        <p>Explore our featured and recommended courses below:</p>
        {/* Featured courses carousel and recommended courses components go here */}

        {/* Categories dropdown menu */}
        <div className="categories-dropdown">
          <select>
            <option value="">Explore Categories</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>
          <Link to="/explore" className="explore-button">Explore</Link>
        </div>
      </div>
    </div>
  );
};

export default LearnerHomepage;
