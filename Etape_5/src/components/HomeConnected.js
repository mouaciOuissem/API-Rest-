import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomeConnected(  ) {
  const navigate = useNavigate();

  const handleLogout = () => {
  

    localStorage.removeItem("token"); // effacer le token du localStorage
    navigate("/home");
  };

  return (
    <div>
<button onClick={handleLogout}>Logout</button>
      <nav>
      <button onClick={() => navigate('/userlist')}>Users</button>
      <button onClick={() => navigate('/addresslist')}>Address</button>
      <button onClick={() => navigate('/profile')}>Profile</button>
      </nav>
      <h1>Welcome to the Home Page!</h1>
    </div>
  );
}

export default HomeConnected;
