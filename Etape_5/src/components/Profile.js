import { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [addresses, setAddresses] = useState([]);
    
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        const config = { headers: { Authorization: `Bearer ${token}` } };
        axios.get(`http://localhost:8090/me`, config)
          .then(response => {
            setUser(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }, []);
    
    const fetchUserData = () => {
      axios.get('http://localhost:8090/address')
        .then(response => {
          setAddresses(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    };
    
    useEffect(() => {
      fetchUserData();
    }, []);
    

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get("http://localhost:8090/address");
        setAddresses(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAddresses();
  }, []);

  const handleAddAddress = async () => {
    try {
      const response = await axios.post("http://localhost:8090/address", {
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        zip: "12345",
      });
      setAddresses([...addresses, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditAddress = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8090/address/${id}`, {
        street: "456 Oak St",
        city: "Anycity",
        state: "NY",
        zip: "67890",
      });
      const updatedAddresses = addresses.map((address) =>
        address.id === id ? response.data : address
      );
      setAddresses(updatedAddresses);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      await axios.delete(`http://localhost:8090/address/${id}`);
      const updatedAddresses = addresses.filter(
        (address) => address.id !== id
      );
      setAddresses(updatedAddresses);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Welcome, {user ? user.username : "Guest"}</h1>
      <h2>Addresses:</h2>
      <ul>
        {addresses.map((address) => (
          <li key={address.id}>
            {address.street}, {address.city}, {address.state} {address.zip}
            <button onClick={() => handleEditAddress(address.id)}>
              Edit
            </button>
            <button onClick={() => handleDeleteAddress(address.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddAddress}>Add Address</button>
    </div>
  );
};

export default Profile;
