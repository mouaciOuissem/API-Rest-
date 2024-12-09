import React, { useState } from "react";

import { BrowserRouter, Routes , Route} from 'react-router-dom';

import HomeConnected from "./components/HomeConnected";
import './App.css';
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import UserList from './components/UserList';
import AddressList from './components/AddressList';
import  {Home } from './components/Home';
import UserDetails from './components/UserDetails'
import Profile from "./components/Profile";

function App() {
  
  const [currentForm, setCurrentForm] = useState('register');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
  

  return (
    // <div className="App">
      // {
      //   currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
        
      // }
    // </div>

  <div className="App">
    <BrowserRouter>
        <Routes>
          
            { <Route index element={<Home />} /> }

            <Route path="/home" element = {<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/homeconnected" element={<HomeConnected />} />
            <Route path="/register" element={<Register />} />
            <Route path="/userlist" element={<UserList />} />
            <Route path="/userlist/:id" element={<UserDetails />} />
            <Route path="/addresslist" element={<AddressList />} />
            <Route path="/profile" element={<Profile />} />



            {/* <Route path="*" element={<Error />} /> */}
          
        </Routes>
      </BrowserRouter>
  </div>


  );
}

export default App;