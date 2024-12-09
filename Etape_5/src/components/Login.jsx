import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [token, setToken] = useState("");
  const history = useNavigate();

  const handleSubmit = (e) => {
    setSuccessMessage("");
    setErrorMessage("");
    e.preventDefault();
    axios
      .post("http://localhost:8090/authenticate", {
        username: username,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token); // stocker le token dans le localStorage
          setSuccessMessage("Authentication successful!");
          setErrorMessage("");
          history("/");
          history("/homeconnected");  // rediriger vers la page Home
        } else {
          setErrorMessage("Invalid username or password.");
          setSuccessMessage("");
        }
      })  
      .catch((error) => {
        console.log(error);
        setErrorMessage("Error: could not connect to server.");
        setSuccessMessage("");
      });
  };

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token"); // effacer le token du localStorage
    history.push("/home"); // rediriger vers la page de login
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Your username"
          id="username"
          name="username"
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <button type="submit">Log In</button>
      </form>           
      {successMessage && <p id="response" className="success">{successMessage}</p>}
      {errorMessage && <p id="response" className="error">{errorMessage}</p>}
      {token && (
        <button onClick={handleLogout}>Log Out</button>
      )}
    </div>
  );
};
