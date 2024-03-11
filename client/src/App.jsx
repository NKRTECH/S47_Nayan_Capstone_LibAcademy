import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TutorRegistrationPage from './pages/TutorRegistrationPage';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define routes using the <Route> component */}
        <Route path="/registertutor" element={<TutorRegistrationPage />} />
      </Routes>
    </Router>
  );
};

export default App;
