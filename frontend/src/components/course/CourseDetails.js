import { useState } from "react";

const CourseDetails = () => {
  const [courseDetails, setCourseDetails] = useState(null);
  const [courseID, setCourseID] = useState("");
  const [editMode, setEditMode] = useState(false);

  const handleSearch = () => {
    try {
      fetch(`/api/courses/${courseID}`)
        .then((response) => {
          if (response.ok) {
            console.log("Course Existing");
            return response.json();
          }
          console.log(Error("error response empty"));
        })
        .then((data) => {
          setCourseDetails(data);
        });
    } catch (error) {
      console.lerror(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await localStorage.getItem("token");
      const response = await fetch(`/api/courses/${courseID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(courseDetails),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        throw new Error("Failed to edit course.");
      }
    } catch (error) {
      console.log(error);
    }
    console.log(courseDetails);
    setEditMode(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/courses/${courseID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log("Course deleted successfully");
      } else {
        throw new Error("Error deleting Course");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Course Details</h1>
      <input
        type="text"
        name="courseID"
        placeholder="Enter Course ID"
        value={courseID}
        onChange={(e) => setCourseID(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button
        onClick={(e) => {
          e.preventDefault();
          setEditMode(true);
        }}
      >
        Edit Course
      </button>
      <button onClick={handleDelete}>Delete Course</button>
      {courseDetails ? (
        <div>
          {editMode ? (
            <div>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="title"
                  placeholder={courseDetails.title}
                  value={courseDetails.title}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="description"
                  placeholder={courseDetails.description}
                  value={courseDetails.description}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="instructor"
                  placeholder={courseDetails.instructor}
                  value={courseDetails.instructor}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  name="duration"
                  placeholder={courseDetails.duration}
                  value={courseDetails.duration}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  name="availableSlots"
                  placeholder={courseDetails.availableSlots}
                  value={courseDetails.availableSlots}
                  onChange={handleChange}
                />
                <button type="submit">Submit</button>
              </form>
            </div>
          ) : (
            <div>
              <p>Title: {courseDetails.title}</p>
              <p>Description: {courseDetails.description}</p>
              <p>Instructor: {courseDetails.instructor}</p>
              <p>Duration: {courseDetails.duration}</p>
              <p>Available Slots: {courseDetails.availableSlots}</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h3>No course found</h3>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
