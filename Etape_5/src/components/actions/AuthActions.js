import axios from 'axios';


export const updateUser = async (userId, username) => {
  try {
    const response = await axios.put(`http://localhost:8090/user/${userId}`, { username });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
export const getUser = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };
    try {
      const response = await axios.get('http://localhost:8090/me', config);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`http://localhost:8090/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
  
};
