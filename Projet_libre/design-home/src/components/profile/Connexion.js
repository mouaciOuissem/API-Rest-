import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import './Connexion.css';
//a supprimer
const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get("http://localhost:8099/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          // Gérer les erreurs de requête
          console.log(error);
        }
      };

      fetchUserDetails();
    }
  }, []);

  const handleLogoutClick = () => {
    // Supprimer le token du stockage local (localStorage) ou des cookies
    localStorage.removeItem("token");
    // Rediriger vers la page de connexion
    navigate("/login");
  };

  const handleLoginClick = () => {
    // Logique de connexion
    // Redirection vers la page de connexion
    navigate("/login");
  };

  const handleSignupClick = () => {
    // Logique d'inscription
    // Redirection vers la page d'inscription
    navigate("/register");
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">Profile Page</h1>
      {user ? (
        <div className="profile-content">
          <h2>Welcome, {user.username}!</h2>
          <p>Role: {user.role}</p>
          {user.isAdmin && <p>You have admin privileges.</p>}
          <Button variant="primary" onClick={handleLogoutClick}>
            Logout
          </Button>
        </div>
      ) : (
        <div className="profile-content">
          <p className="profile-message">Do you have an account?</p>
          <Button
            variant="primary"
            className="profile-button"
            onClick={handleLoginClick}
          >
            Login
          </Button>
          <Button
            variant="secondary"
            className="profile-button"
            onClick={handleSignupClick}
          >
            Signup
          </Button>
        </div>
      )}
    </div>
  );
};

export default Profile;
