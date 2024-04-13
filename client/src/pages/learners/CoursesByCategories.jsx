import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoursesByCategories } from '../../features/courses/CoursesThunks';
import { resetCourses, resetStatus } from '../../features/courses/coursesSlice';
import './CoursesByCategories.css';

const CoursesByCategory = ({ categories }) => {
    console.log('Received Categories:', categories); // Debugging line

    const dispatch = useDispatch();
    const courses = useSelector((state) => state.courses.courses);
    const status = useSelector((state) => state.courses.status);
    const error = useSelector((state) => state.courses.error);

    const handleSearch = () => {
        dispatch(fetchCoursesByCategories(categories));
    };

    return (
        <div className="courses-container">
            <button className="search-button" onClick={handleSearch}>Search</button>
            {status === 'loading' && <div>Loading...</div>}
            {status === 'succeeded' && courses.length === 0 && <div>No courses found</div>}
            {status === 'succeeded' && <button className="reset-button" onClick={() => dispatch(resetCourses())}>Reset</button>}
            {status === 'succeeded' && (
                <div className="courses-list">
                    {courses.map((course) => (
                        <div key={course._id} className="course-card">
                            <h2>{course.title}</h2>
                            <p>{course.description}</p>
                            <p>{`By ${course?.tutorId?.firstName} ${course?.tutorId?.lastName}`}</p>
                        </div>
                    ))}
                </div>
            )}
            {status === 'failed' && (
                <div>
                    <div className="error-message">{error}</div>
                    <button className="retry-button" onClick={handleSearch}>Retry</button>
                </div>
            )}
        </div>
    );
};

export default CoursesByCategory;


//*************************************************** */

// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCoursesByCategories } from '../../features/courses/CoursesThunks';
// import { resetStatus } from '../../features/courses/coursesSlice';

// const CoursesByCategory = ({ categories }) => {
//     console.log('Received Categories:', categories); // Debugging line

//     const dispatch = useDispatch();
//     const courses = useSelector((state) => state.courses.courses);
//     const status = useSelector((state) => state.courses.status);
//     const error = useSelector((state) => state.courses.error);

//     const handleSearch = () => {
//         // Dispatch an action to reset the status to 'idle'
//         // dispatch(resetStatus());
//         // Dispatch the fetch action again with the selected categories
//         dispatch(fetchCoursesByCategories(categories));
//         console.log('fecthed courses by categories:--',courses);
//     };

//     if (status === 'loading') {
//         return <div>Loading...</div>;
//     } else if (status === 'succeeded') {
//         return (
//             <>
//             <button onClick={handleSearch}>Search</button>
//             <div>
//                 {courses.map((course) => (
//                     <div key={course._id}>
//                         <h2>{course.title}</h2>
//                         <h3>{course.description}</h3>
//                     </div>
//                 ))}
//             </div>
//             </>
//         );
//     } else if (status === 'failed') {
//         return (
//             <div>
//                 <div>{error}</div>
//                 <button onClick={handleSearch}>Retry</button>
//             </div>
//         );
//     }

//     // Always display the Search button
//     return (
//         <div>
//             <button onClick={handleSearch}>Search</button>
//         </div>
//     );
// };

// export default CoursesByCategory;

