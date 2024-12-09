import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams,useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const { id } = useParams();
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const fetchUsers = async () => {
        try {
          const response = await axios.get('http://localhost:8090/user/', config);
          setUsers(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchUsers();
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token && id) {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        try {
          const response = await axios.get(`http://localhost:8090/user/${id}`, config);
          setSelectedUser(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchUser();
  }, [id]);
  const navigate = useNavigate();
  
  const handleLogout = () => {
  

    localStorage.removeItem("token"); // effacer le token du localStorage
    navigate("/home");
  };

  return (
    
    <div>
      <button onClick={handleLogout}>Logout</button>
      <h3>The list of users</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/userlist/${user.id}`}>{user.username}</Link>
           
          </li>
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
