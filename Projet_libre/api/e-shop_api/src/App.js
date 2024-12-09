import React from 'react';
import data from "./components/back/Data/Datas";
import Header from "./components/front/Header/Header";
import Routes from "./components/front/Routes/Routes";
import { BrowserRouter as Router} from "react-router-dom";

const App =() => {
  const {productItems} = data;
  return (
   <div>
      <Router>
        <Header  />
        <Routes productItems={productItems} />
      </Router>
      
   </div> 
  )
}
export default App 
















// import './App.css';

// import React from "react";
// import { BrowserRouter, Router, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./components/Home";

// const App = () => {
//   return (
//     <BrowserRouter >
//       <Router>
//         <div>
//           <Navbar />
          
//             <Route exact path="/">
//               <Home />
//             </Route>
//             {/* Ajoutez d'autres routes ici */}
          
//         </div>
//       </Router>
//     </BrowserRouter>
//   );
// };

// export default App;