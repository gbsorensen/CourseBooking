import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState("");
  useEffect(() => {
    fetch("/api/courses/")
      .then((response) => response.json())
      .then((data) => {
        setCourses(data.courses);
        console.log(data);
      })
      .catch((error) => console.error(error));
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  };

  return (
    <div>
      <ul>
        <li>
          <p>Hello, {user}</p>
        </li>
        <li>
          <Link to="/login" onClick={handleLogout}>
            <button>Log out</button>
          </Link>
        </li>
      </ul>
      <h1>Course List</h1>
      <ul>
        {console.log(courses)}
        {courses &&
          courses.map((course) => (
            <li key={course._id}>
              <p>{course.title}</p>
              <p>{course.description}</p>
              <p>{course.instructor}</p>
              <p>{course.duration}</p>
              <p>{course.availableSlots}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default CourseList;
