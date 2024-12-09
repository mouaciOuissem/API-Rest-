// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import './Home.css' ;

// const Home = () => {
//     const [designs, setDesigns] = useState([]);
  
//     useEffect(() => {
//       axios
//         .get("/api/designs")
//         .then((response) => {
//           setDesigns(response.data);
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     }, []);
  
//     return (
//       <div>
//         <h1>Bienvenue sur notre boutique en ligne</h1>
//         <p>Découvrez nos différents designs pour votre maison :</p>
//         <ul>
//           {designs.map((design) => (
//             <li key={design.id}>
//               <Link to={`/designs/${design.id}`}>{design.name}</Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   };
// export default Home;