import { useState, useEffect } from "react";

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("/api/courses/")
      .then((response) => response.json())
      .then((data) => {
        setCourses(data.courses);
        console.log(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
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
