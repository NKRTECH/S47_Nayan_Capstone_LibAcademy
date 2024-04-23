import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoursesByCategories } from '../../features/courses/CoursesThunks';
import { resetCourses } from '../../features/courses/coursesSlice';
import styles from './CoursesByCategories.module.css'; // Import as a module
import CourseCard from '../../components/course/CourseCard';

const CoursesByCategory = ({ categories }) => {
    const dispatch = useDispatch();
    const courses = useSelector((state) => state.courses.courses);
    const status = useSelector((state) => state.courses.status);
    const error = useSelector((state) => state.courses.error);

    const handleSearch = () => {
        dispatch(fetchCoursesByCategories(categories));
    };

    return (
        <div className={styles.coursesContainer}>
            <button className={styles.searchButton} onClick={handleSearch}>Search</button>
            {status === 'loading' && <div>Loading...</div>}
            {status === 'succeeded' && courses.length === 0 && <div>No courses found</div>}
            {status === 'succeeded' && (
                <div className={styles.coursesList}>
                    {courses.map((course) => (
                        <div key={course._id} className={styles.courseCardWrapper}>
                            <CourseCard course={course} />
                        </div>
                    ))}
                </div>
            )}
            {status === 'failed' && (
                <div>
                    <div className={styles.errorMessage}>{error}</div>
                    <button className={styles.retryButton} onClick={handleSearch}>Retry</button>
                </div>
            )}
        </div>
    );
};

export default CoursesByCategory;