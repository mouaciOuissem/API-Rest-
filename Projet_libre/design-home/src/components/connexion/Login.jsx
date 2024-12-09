import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './Login.css';

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
      .post("http://localhost:8099/authenticate", {
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
          history("/profile"); 
        } else {
          setErrorMessage("Invalid username or password.");
          setSuccessMessage("");
        }
      })  
      .catch((error) => {
        if (error.response) {
          // Erreur avec réponse du serveur (statut de réponse autre que 2xx)
          if (error.response.status === 401) {
            setErrorMessage("Invalid username or password.");
          } else if (error.response.status === 500) {
            setErrorMessage("Internal server error.");
          } else {
            setErrorMessage("Error: " + error.response.data.error);
          }
        } else if (error.request) {
          // Erreur sans réponse du serveur (pas de réponse reçue)
          setErrorMessage("Error: No response from server.");
        } else {
          // Erreur lors de la requête (autre erreur)
          setErrorMessage("Error: " + error.message);
        }
        setSuccessMessage("");
      });
  };

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token"); // effacer le token du localStorage
    history.push("/"); // rediriger vers la page de login
  };

  return (
    <div className="auth-form-container">
      <h2>Connexion</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Nom</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="nom"
          id="username"
          name="username"
        />
        <label htmlFor="password">Mot de passe</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <button className ="profilebutton" >Connexion</button>
      </form>           
      {successMessage && <p id="response" className="success">{successMessage}</p>}
      {errorMessage && <p id="response" className="error">{errorMessage}</p>}
      {token && (
        <button onClick={handleLogout}>Déconnxion</button>
      )}
    </div>
  );
};
