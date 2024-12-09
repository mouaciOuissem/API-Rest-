import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/header/Header";
import './App.css';
import { Login } from "./components/connexion/Login";
import { Register } from "./components/connexion/Register";
import UserList from './components/UserList';
import AddressList from './components/AddressList';
import Home from './components/Home';
import UserDetails from './components/UserDetails'
import Connexion from "./components/profile/Connexion";

import Cart from './components/ShoppingCart';
import Store from './components/Store';
import Salon from './components/Salon';
import Cuisine from './components/Cuisine';

import Profile from "./components/profile/Profile";
import AdminPage from './components/profile/AdminPage';

import ShoppingCartProvider from "./context/ShoppingCartContext";
function App() {

  const [currentForm, setCurrentForm] = useState('register');
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      <Router>
        <ShoppingCartProvider>
        <Header />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/" element={<React.Fragment><Header /><Home /></React.Fragment>} />
           
            <Route path="/login" element={<Login />} />
            <Route path="/shoppingcart" element={<Cart />} />
            <Route path="/register" element={<Register />} />
            <Route path="admin/userlist" element={<UserList />} />
            <Route path="/userlist/:id" element={<UserDetails />} />
            <Route path="/addresslist" element={<AddressList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/store" element={<Store />} />
            <Route path="/salon" element={<Salon />} />
            <Route path="/cuisine" element={<Cuisine />} />
            <Route path="/connexion" element={<Connexion />} />
            {/* <Route path="*" element={<Error />} /> */}
            <Route  path="/admin" element={<AdminPage />} />
          </Routes>
        </ShoppingCartProvider>
      </Router>
    </div>
  );
}

export default App;
