import './Home.css';

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";

export const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // Vérifie si le token est valide et récupère l'utilisateur connecté
      axios
        .get("http://localhost:8090/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setIsAuthenticated(true);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsAuthenticated(false);
          setIsLoading(false);
        });
    } else {
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    navigate("/login");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome to the home page! You are authenticated.</p>
          
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>Welcome to the home page! You are not authenticated.</p>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Register</button>

        </div>
      )}
      
    </div>
  );
};
