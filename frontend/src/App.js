import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import CourseList from "./components/course/CourseList";
import Navbar from "./components/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import CourseForm from "./components/course/CourseForm";
import CourseDetails from "./components/course/CourseDetails";

const getToken = () => {
  return localStorage.getItem("token");
};

function App() {
  const token = getToken();
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={token ? <CourseList /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courselist" element={<CourseList />} />
        <Route path="/createCourse" element={<CourseForm />} />
        <Route path="/courseDetails" element={<CourseDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
