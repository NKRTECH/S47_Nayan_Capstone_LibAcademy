import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadCoursePage from './UploadCoursePage';
import Layout from '../tutors/Layout';

function RenderCoursePages() {
 return (
    
      <Routes>
        {/* Define routes using the <Route> component */}
        <Route path="/course/create" element={<Layout><UploadCoursePage /></Layout>} />
      </Routes>
    
 );
}

export default RenderCoursePages;