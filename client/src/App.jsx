import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TutorRegistrationPage from './pages/TutorRegistrationPage';
import HomePageTutor from './pages/tutors/HomePageTutor';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define routes using the <Route> component */}
        <Route path="/tutor-registration" element={<TutorRegistrationPage />} />
        <Route path="/home-tutor" element={<HomePageTutor />} />
      </Routes>
    </Router>
  );
};

export default App;