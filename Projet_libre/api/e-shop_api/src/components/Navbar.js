// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import "./Navbar.css";

// const Navbar = () => {
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     axios
//       .get("/api/cart")
//       .then((response) => {
//         setCartItems(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

//   return (
//     <nav>
//       <Link to="/">
//         <img src="logo.png" alt="Logo" />
//       </Link>
//       <div>
//         <Link to="/login">Connexion</Link>
//         <Link to="/signup">Inscription</Link>
//         <Link to="/cart">
//           Panier ({cartItems.reduce((total, item) => total + item.quantity, 0)}
//           )
//         </Link>
//       </div>
//     </nav>
//   );
// };
// export default Navbar;