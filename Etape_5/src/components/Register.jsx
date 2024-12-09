import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const Register = (props) => {
    
    const [pass, setPass] = useState('');
    const [name, setUsername] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccessMessage("");
        axios.post("http://localhost:8090/register", {
          username: name,
          password: pass
        }) 
        .then(response => {
          if (response.status === 201) {
            setSuccessMessage("L'enregistrement a été bien effectué ! vous pouvez maintenant vous connecter !");
            setTimeout(() => {
              navigate("/");
              navigate('/login');
            }, 5000);
            
           
          }
        })
        .catch(error => {
          if (error.response.status === 409) {
            setErrorMessage("Le nom existe déjà ! Vous pouvez vous connecter.");
          } else {
            setErrorMessage("Une erreur est survenue. Veuillez réessayer plus tard.");
          }
        });
    }
    

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input value={name} name="name" onChange={(e) => setUsername(e.target.value)} id="username" placeholder="Name" />
                <label htmlFor="password">password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit">Register</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
            {successMessage && <p id="response" className="success">{successMessage}</p>}
            {errorMessage && <p id="response" className="error">{errorMessage}</p>}
        </div>
    )
}
