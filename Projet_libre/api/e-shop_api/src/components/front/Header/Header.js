import React from 'react';
import {Link } from "react-router-dom";
import "./Header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCartShopping } from '@fortawesome/free-solid-svg-icons';


const Header =() => {
  
  return (
    <header className="header">
   <div>
      <h1>
        <Link to="/" className="logo">
            Meubles shop
        </Link>
      </h1>
   </div>
   <div className="header-links">
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
        </ul>
        <ul>
            <li>
                <Link to="/signup">Signup</Link>
            </li>
        </ul>
        <ul>
            <li>
                <Link to="/cart" className="cart"><FontAwesomeIcon icon={faCartShopping} /></Link>
                    
            </li>
        </ul>
   </div>
   </header> 
  );
};
export default Header