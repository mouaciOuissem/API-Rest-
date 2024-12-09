// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link, useParams,useNavigate } from "react-router-dom";
// import { Col, Row ,Button ,Modal,Nav} from "react-bootstrap";
// function AddressList() {
//   const [addresses, setAddresses] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       const fetchUsers = async () => {
//         try {
//           const response = await axios.get('http://localhost:8090/address/', config);
//           setUsers(response.data);
//         } catch (error) {
//           console.log(error);
//         }
//       };
//       fetchUsers();
//     }
//   }, []);


//   const navigate = useNavigate();
  
//   const handleLogout = () => {
  

//     localStorage.removeItem("token"); // effacer le token du localStorage
//     navigate("/home");
//   };
//   return (
//     <div>
//       <h2>Address List</h2>
//       <ul>
//         {addresses.map((address) => (
//           <li key={address.id}>
//             <p>Street: {address.street}</p>
//             <p>City: {address.city}</p>
//             <p>Country: {address.country}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
        
//     return (
//          <div>
//             {/* //     <h2>Address List</h2> */}
//             {/* afficher les adresses */}
//             {addresses.map(address => (
//               <div key={address.id}>
//                 <p>Street: {address.street}</p>
//                 <p>City: {address.city}</p>
//                 <p>Country: {address.country}</p>
//                 <p>Postal code: {address.postalCode}</p>
//                 {/* bouton pour supprimer l'adresse */}
//                 <button onClick={() => deleteAddress(address.id)}>Delete</button>
//                 {/* formulaire pour modifier l'adresse */}
//                 <form onSubmit={(event) => {
//                   event.preventDefault();
//                   updateAddress({
//                     id: address.id,
//                     street: event.target.street.value,
//                     city: event.target.city.value,
//                     country: event.target.country.value,
//                     postalCode: event.target.postalCode.value,
//                   });
//                 }}>
//                   <label htmlFor="street">Street:</label>
//                   <input type="text" name="street" defaultValue={address.street} />
//                   <label htmlFor="city">City:</label>
//                   <input type="text" name="city" defaultValue={address.city} />
//                   <label htmlFor="country">Country:</label>
//                   <input type="text" name="country" defaultValue={address.country} />
//                   <label htmlFor="postalCode">Postal code:</label>
//                   <input type="text" name="postalCode" defaultValue={address.postalCode} />
//                   <button type="submit">Update</button>
//                 </form>
//               </div>
//             ))}
//             {/* formulaire pour ajouter une nouvelle adresse */}
//             <form onSubmit={(event) => {
//               event.preventDefault();
//               addAddress({
//                 street: event.target.street.value,
//                 city: event.target.city.value,
//                 country: event.target.country.value,
//                 postalCode: event.target.postalCode.value,
//               });
//               event.target.reset();
//             }}>
//              <label htmlFor="street">Street:</label>
//             <input type="text" name="street" />
//             <label htmlFor="city">City:</label>
//             <input type="text" name="city" />
//             <label htmlFor="country">Country:</label>
//             <input type="text" name="country" />
//             <label htmlFor="postalCode">Postal code:</label>
//             <input type="text" name="postalCode" />
//             <button type="submit">Add Address</button>
//       </form>
//     </div>
//   );
// }
// export default AddressList;
  
