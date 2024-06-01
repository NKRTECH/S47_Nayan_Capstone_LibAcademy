import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoursesByLearnerIdThunk } from "../../features/learners/LearnersThunks";

export default function LearnerMyCoursesPage() {
    const dispatch = useDispatch();
    const { enrolledCourses, loading, error, learnerData } = useSelector((state) => state.learner);
    const learnerId = learnerData._id; // Replace with the actual learner ID
    console.log('enrolledCourses:+-+-+- ', enrolledCourses);
    
    useEffect(() => {
      // Check if enrolledCourses is an empty array
      if (Array.isArray(enrolledCourses) && enrolledCourses.length === 0) {
        dispatch(fetchCoursesByLearnerIdThunk(learnerId));
      }
    }, [dispatch, enrolledCourses, learnerId]);
  
  
    return (
      <div>
        <h1>My Courses</h1>
        {loading && <p>Loading courses...</p>}
        {error && <p>Error loading courses: {error}</p>}
        <ul>
          {enrolledCourses?.map((course) => (
            <li key={course.id}>{course.title}</li>
          ))}
        </ul>
      </div>
    );
}
