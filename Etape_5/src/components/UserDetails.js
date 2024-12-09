import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      axios.get(`http://localhost:8090/user/${id}`, config)
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [id]);

  return (
    <div>
      {user && (
        <div>
          <h3>User Details</h3>
          <p>Username: {user.username}</p>
          <p>Role: {user.role}</p>
        </div>
      )}
    </div>
  );
};
export default UserDetails;