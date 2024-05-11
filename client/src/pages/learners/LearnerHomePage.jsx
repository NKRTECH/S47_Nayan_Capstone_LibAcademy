// import { useState, useEffect } from 'react';
// // import { Link } from 'react-router-dom';
// // import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// import { getCourseCategoriesAPI } from '../../features/courses/CoursesAPI';
// import CoursesByCategory from './CoursesByCategories';

// const LearnerHomepage = () => {
//  const [categories, setCategories] = useState([]);
//  const [selectedCategories, setSelectedCategories] = useState([]); // New state for selected categories

//  useEffect(() => {
//     // Fetch categories when component mounts
//     fetchCategories();
//  }, []);

//  const fetchCategories = async () => {
//     try {
//       const categories = await getCourseCategoriesAPI();
//       console.log('Categories: ', categories);
//       setCategories(categories);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
//  };

//  const handleCategoryChange = (event) => {
//     const { id, checked } = event.target;
//     setSelectedCategories(prevSelectedCategories => {
//       if (checked) {
//         // Add the category ID to the selected categories if it's checked
//         return [...prevSelectedCategories, id];
//       } else {
//         // Remove the category ID from the selected categories if it's unchecked
//         return prevSelectedCategories.filter(categoryId => categoryId !== id);
//       }
//     });
//  };

//  return (
//     <div className="learner-homepage">
//       <div className="content">
//         <h1>Welcome to LibAcademy, Learner!</h1>
//         <p>Explore our featured and recommended courses below:</p>

//         {/* Categories checkboxes */}
//         <div className="categories-checkboxes">
//           {categories.map(category => (
//             <div key={category._id}>
//               <input
//                 type="checkbox"
//                 id={category._id}
//                 name={category._id}
//                 checked={selectedCategories.includes(category._id)}
//                 onChange={handleCategoryChange}
//               />
//               <label htmlFor={category._id}>{category.name}</label>
//             </div>
//           ))}
//         </div>
//         {/* Pass selected categories to CoursesByCategory */}
//         <CoursesByCategory categories={selectedCategories} />
//       </div>
//     </div>
//  );
// };

// export default LearnerHomepage;

// import { useState, useEffect } from 'react';
// import { getCourseCategoriesAPI } from '../../features/courses/CoursesAPI';
// import CoursesByCategory from './CoursesByCategories';
// import styles from './LearnerHomePage.module.css'; // Import the CSS module

// const LearnerHomepage = () => {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [isFilteringOpen, setIsFilteringOpen] = useState(false);
//   const [filteringCriteria, setFilteringCriteria] = useState([
//     { id: 'categories', name: 'Categories', isOpen: false },
//     // Add more criteria here
//   ]);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const categories = await getCourseCategoriesAPI();
//       setCategories(categories);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//     }
//   };

//   const handleCategoryChange = (event) => {
//     const { id, checked } = event.target;
//     setSelectedCategories(prevSelectedCategories => {
//       if (checked) {
//         return [...prevSelectedCategories, id];
//       } else {
//         return prevSelectedCategories.filter(categoryId => categoryId!== id);
//       }
//     });
//   };

//   const toggleFiltering = () => {
//     setIsFilteringOpen(!isFilteringOpen);
//   };

//   const toggleCriterion = (criterionId) => {
//     setFilteringCriteria(prevCriteria => prevCriteria.map(criterion => {
//       if (criterion.id === criterionId) {
//         return {...criterion, isOpen:!criterion.isOpen };
//       }
//       return criterion;
//     }));
//   };

//   return (
//     <div className={styles['learner-homepage']}>
//     <div className={styles['content']}>
//       <h1 className={styles['welcome-heading']}>Welcome to LibAcademy, Learner!</h1>

//       {/* Filtering Button */}
//       <button onClick={toggleFiltering} className={styles['filter-button']}>Filter courses</button>

//       {/* Filtering Panel */}
//       {isFilteringOpen && (
//         <div className={styles['filtering-panel']}>
//           <h2>Filter by</h2>
//           {filteringCriteria.map(criterion => (
//             <div key={criterion.id} className={styles['filter-criterion']}>
//               <button onClick={() => toggleCriterion(criterion.id)} className={styles['filter-criterion-button']}>
//                 {criterion.name}
//               </button>
//               {criterion.isOpen && (
//                 <div className={styles['filter-criterion-options']}>
//                   {/* Example: Categories */}
//                   {criterion.id === 'categories' && categories.map(category => (
//                     <div key={category._id}>
//                       <input
//                         type="checkbox"
//                         id={category._id}
//                         name={category._id}
//                         checked={selectedCategories.includes(category._id)}
//                         onChange={handleCategoryChange}
//                       />
//                       <label htmlFor={category._id}>{category.name}</label>
//                     </div>
//                   ))}
//                   {/* Add more options here */}
//                 </div>
//               )}
//             </div>
//           ))}
//           <button onClick={toggleFiltering} className={styles['close-filter-button']}>Close</button>
//         </div>
//       )}

//       {/* Pass selected categories to CoursesByCategory */}
//       <CoursesByCategory categories={selectedCategories} />
//     </div>
//   </div>
//   );
// };

// export default LearnerHomepage;

import { useState, useEffect, useRef } from 'react';
import { getCourseCategoriesAPI } from '../../features/courses/CoursesAPI';
import CoursesByCategory from './CoursesByCategories';
import styles from './LearnerHomePage.module.css'; // Import the CSS module

const LearnerHomepage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isFilteringOpen, setIsFilteringOpen] = useState(false);
  const [filteringCriteria, setFilteringCriteria] = useState([
    { id: 'categories', name: 'Categories', isOpen: false },
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
        return {...criterion, isOpen:!criterion.isOpen };
      }
      return criterion;
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
                  <div className={styles['filter-criterion-options']}>
                    {/* Example: Categories */}
                    {criterion.id === 'categories' && categories.map(category => (
                      <div key={category._id}>
                        <input
                          type="checkbox"
                          id={category._id}
                          name={category._id}
                          checked={selectedCategories.includes(category._id)}
                          onChange={handleCategoryChange}
                        />
                        <label htmlFor={category._id}>{category.name}</label>
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
