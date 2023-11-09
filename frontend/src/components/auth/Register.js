import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const handleSignup = () => {
    fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userName,
        password: password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("User registration successful");
        } else {
          console.log("User registration error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>Signup</h2>
      <input
        type="text"
        placeholder="username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Signup</button>
      <p>
        Already have an account?<Link to="/login"> Login</Link>
      </p>
    </div>
  );
};

export default Register;
