import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams,useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const { id } = useParams();
  const [selectedUser, setSelectedUser] = useState(null);
  const token = localStorage.getItem('token');
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const fetchUsers = async () => {
        try {
          const response = await axios.get('http://localhost:8099/user/', config);
          setUsers(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchUsers();
    }
  }, []);

  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/");
  };
  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:8099/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);

      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    
    <div>
      <button className="logout" onClick={handleLogout}>Déconnxion</button>
      <h3>Les utilisateurs :</h3>
      <ul>
      {users.map((user) => (
  <p className="user" key={user.id}>
    {user.username} : {user.role}
    <p><Button className="deleteteUser" variant="danger" onClick={() => handleDeleteUser(user.id)}>Supprimer</Button></p>
  </p>
))}

      </ul>
      {selectedUser && (
        <div>
          <h3>User Details:</h3>
          <p>Username: {selectedUser.username}</p>
          <p>Role: {selectedUser.role}</p>
          {/* <p>id: {selectedUser.id}</p> */}
        </div>
      )}
    </div>
  )
  ;
  
  
};

export default UserList;
