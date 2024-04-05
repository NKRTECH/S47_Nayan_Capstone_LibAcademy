import { Route } from "react-router-dom";
import NavUser from "./components/user/NavUser";
import LayoutTutor from "./components/tutor/LayoutTutor";
import TutorRegistrationPage from "./pages/tutors/TutorRegistrationPage";
import TutorLoginPage from "./pages/tutors/TutorLoginPage";
import LayoutUser from "./components/user/LayoutUser";
import LearnerLoginPage from "./pages/learners/LearnerLoginPage";
import LearnerRegistrationPage from "./pages/learners/LearnerRegistrationPage";

const UserRoutes = () => {
    const token = localStorage.getItem("token");
    if (token) {
      return (
        <>
        <Route path="/" element={<LayoutTutor><NavUser /></LayoutTutor>} />
        <Route path="/tutor/registration" element={<LayoutUser><TutorRegistrationPage /></LayoutUser>} />
        <Route path="/tutor/login" element={<LayoutUser><TutorLoginPage /></LayoutUser>} />
        <Route path="/learner/login" element={<LayoutUser><LearnerLoginPage /></LayoutUser>} />
        <Route path="/learner/registration" element={<LayoutUser><LearnerRegistrationPage /></LayoutUser>} />
        </>
      );
    }
  }

export default UserRoutes;