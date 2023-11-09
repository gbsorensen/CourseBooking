import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    fetch("/api/users/login", {
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
          return response.json();
        }
        throw new Error("Login failed");
      })
      .then((data) => {
        localStorage.setItem("username", data.username);
        localStorage.setItem("token", data.token);
        console.log("Successfully logged in");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>Log in</h2>
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
      <Link to="/courselist" onClick={handleLogin}>
        <button>Login</button>
      </Link>
      <p>
        New user?<Link to="/register"> Register here</Link>
      </p>
    </div>
  );
};

export default Login;
