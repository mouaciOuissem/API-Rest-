import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Connexion.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Col, Row, Button, Modal, Nav, Card ,Form} from "react-bootstrap";

const Profile = () => {
  const [selectedDefaultAddress, setSelectedDefaultAddress] = useState(null);
  const [defaultAddressId, setDefaultAddressId] = useState(null);
  const [username, setUsername] = useState('');
const [newUsername, setNewUsername] = useState('');
const [showModal2, setShowModal2] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [allAddresses, setAllAddresses] = useState([]);
  const token = localStorage.getItem('token');
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [street, setStreet] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [errors, setErrors] = useState({
    street: false,
    country: false,
    postalCode: false,
    city: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get("http://localhost:8099/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
          setAddresses(response.data.addresses || []);
          if (response.data.role === "ROLE_ADMIN") {
            navigate("/admin");
          }
        } catch (error) {
          console.log(error);
        }
      };

      fetchUserDetails();

      // Récupérer toutes les adresses
      axios
        .get("http://localhost:8099/address", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setAllAddresses(response.data);
          // setDefaultAddressId(response.data.defaultAddressId);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    const storedDefaultAddressId = localStorage.getItem("defaultAddressId");
    if (storedDefaultAddressId) {
      setDefaultAddressId(storedDefaultAddressId);
    }
  }, []);
  

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLogoutClick = () => {
    const confirmed = window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
    if (confirmed) {
      localStorage.clear();
      navigate("/");
    }
  };
  const handleEditUsername = () => {
    const newUsername = prompt('Entrez le nouveau nom d\'utilisateur :', username);
    if (newUsername) {
      setNewUsername(newUsername);
    }
  };
  
  const handleSetDefaultAddress = (addressId) => {
    // Définir l'adresse par défaut dans l'état et dans le local storage
    setDefaultAddressId(addressId);
    localStorage.setItem("defaultAddressId", addressId);
  };
  
  const getAddressByIdDefault = async () => {
    try {
      const response = await axios.get(`http://localhost:8099/address/${defaultAddressId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSelectedDefaultAddress(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    if (defaultAddressId) {
      getAddressByIdDefault();
    }
  }, [defaultAddressId]);
  
  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/register");
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();

    // Validation des champs obligatoires
    let formIsValid = true;
    const newErrors = {};

    if (street.trim() === '') {
      newErrors.street = true;
      formIsValid = false;
    }

    if (country.trim() === '') {
      newErrors.country = true;
      formIsValid = false;
    }

    if (postalCode.trim() === '') {
      newErrors.postalCode = true;
      formIsValid = false;
    }

    if (city.trim() === '') {
      newErrors.city = true;
      formIsValid = false;
    }

    setErrors(newErrors);

    if (!formIsValid) {
      return;
    }

    const newAddress = {
      street,
      country,
      city,
      postalCode,
    };

    axios
      .post("http://localhost:8099/address/", newAddress, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setAddresses([...addresses, response.data]);
        toast.success('Adresse ajoutée avec succès !');
        toast.info('Veuillez recharger la page pour voir les modifications')
        handleCloseModal();
      })
      .catch((error) => {
        console.log(error);
        toast.error('Échec de l\'ajout de l\'adresse !');
      });
  };

  const handleEditAddress = async (addressId) => {
    try {
      const response = await axios.get(`http://localhost:8099/address/${addressId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSelectedAddress(response.data);
      setStreet(response.data.street);
      setPostalCode(response.data.postalCode);
      setCity(response.data.city);
      setCountry(response.data.country);

    } catch (error) {
      toast.error('Votre session a expiré. Veuillez vous reconnecter.', {
        position: toast.POSITION.TOP_RIGHT,
      });

    }
  };
 
  

  const handleUpdateAddress = async (e) => {
    e.preventDefault();

    const updatedAddress = {
      ...selectedAddress,
      street,
      postalCode,
      city,
      country,
    };

    try {
      const response = await axios.put(`http://localhost:8099/address/${selectedAddress.id}`, updatedAddress, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStreet('');
      setPostalCode('');
      setCountry('');
      setCity('');
      toast.success('L\'adresse a été mise à jour avec succès !');
      toast.info('Veuillez recharger la page pour voir les modifications')
    } catch (error) {
      console.error(error);
      toast.error('Échec de la mise à jour de l\'adresse !');
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const response = await axios.delete(`http://localhost:8099/address/${addressId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('L\'adresse a été supprimée avec succès !');
      toast.info('Veuillez recharger la page pour voir les modifications')
      console.log(response.data);

      setAddresses(addresses.filter((address) => address.id !== addressId));
    } catch (error) {
      console.error(error);
      toast.error('Échec de la suppression de l\'adresse !');
    }
  };
 
  const handleDeleteUser = async (addressId) => {
    try {
      const response = await axios.delete(`http://localhost:8099/user/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ?");
      navigate("/profile");
      toast.success('La suppression de votre compte a été effectuée avec succès !');
      console.log(response.data);
      localStorage.clear();
      
    } catch (error) {
      console.error(error);
      toast.error('Échec de la suppression de l\'adresse !');
    }
  };
  return (
    <div className={`${user ? "" : "auth-form-container"}`}>
      {!user && (
        <div className="alert alert-danger" role="alert" >
          Vous n'êtes déconnecté(e). Veuillez vous connecter pour accéder à votre profil.
        </div>
      )}
  
      {user && (
        <div>
           <Button className='btnn' onClick={handleLogoutClick}>Déconnexion</Button>
           <Button className='btnn' onClick={handleDeleteUser}>supprimer mon compte</Button>

          <h2>Bienvenue, {user.username} !</h2>
  
          <p className="info">
          <ul>
              <li><b>Nom : </b>{user.username}</li>
              <li><b>Date de création :</b> {user.creationDate}</li>
              {selectedDefaultAddress && (
                <li>
                  <b>Adresse par défaut :</b>
                  <ul>
                    <li>Rue : {selectedDefaultAddress.street}</li>
                    <li>Code postal : {selectedDefaultAddress.postalCode}</li>
                    <li>Pays : {selectedDefaultAddress.country}</li>
                    <li>Ville : {selectedDefaultAddress.city}</li>
                  </ul>
                </li>
              )}
              <li><b>Etat de commande :</b> </li>
            </ul>
            <Button className="btnn" onClick={handleOpenModal}> Ajouter une addresse</Button>

          </p>
          
          {user.role === "ROLE_ADMIN" && <p>You have admin privileges.</p>}
  
          {addresses.map((address) => (
            <Card key={address.id}>
              <Card.Body>
                {/* <Card.Title></Card.Title> */}
                <Card.Text>
                {address.street}{address.city}, {address.country}, {address.postalCode}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
          {/* <div className="info"> */}
  
         
  
            <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Ajouter une adresse</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleAddAddress}>
                <div className="col-md-8">
                  <label htmlFor="validationServer01" className="form-label">Rue</label>
                  <input
                    type="text"
                    className={`form-control ${errors.street ? 'is-invalid' : ''}`}
                    id="validationServer01"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    required
                  />
                  {errors.street && <div className="invalid-feedback">Champ obligatoire</div>}
                </div>
                <br />
                <div className="col-md-8">
                  <label htmlFor="validationServer02" className="form-label">Pays</label>
                  <input
                    type="text"
                    className={`form-control ${errors.country ? 'is-invalid' : ''}`}
                    id="validationServer02"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  />
                  {errors.country && <div className="invalid-feedback">Champ obligatoire</div>}
                </div>
                <br />
                <div className="col-md-8">
                  <label htmlFor="validationServer03" className="form-label">Code postal</label>
                  <input
                    type="text"
                    className={`form-control ${errors.postalCode ? 'is-invalid' : ''}`}
                    id="validationServer03"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                  />
                  {errors.postalCode && <div className="invalid-feedback">Champ obligatoire</div>}
                </div>
                <br />
                <div className="col-md-8">
                  <label htmlFor="validationServer04" className="form-label">Ville</label>
                  <input
                    type="text"
                    className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                    id="validationServer04"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                  {errors.city && <div className="invalid-feedback">Champ obligatoire</div>}
                </div>
                <br />
                <div className="col-md-8">
                  <button className="btn btn-primary" type="submit">
                    Ajouter
                  </button>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Fermer
              </Button>
            </Modal.Footer>
          </Modal>
        {/* </div> */}
        </div>
      )}
  {/* TODO */}
      {/* <h5 className="button">Liste des adresses</h5> */}
      <Row xs={1} sm={2} md={3} lg={3} className="g-3">
  {allAddresses.map((address) => (
    <Col className="info" key={address.id}>
      <div className="card">
        <div className="card-body">
          <p className="card-text">
            <b>Ville :</b> {address.city}<br />
            <b>Rue :</b> {address.street}<br />
            <b>Pays :</b> {address.country}<br />
            <b>Code postal :</b> {address.postalCode}
          </p>
          {address.id === defaultAddressId ? (
            <p>Adresse par défaut</p>
          ) : (
            <button className="btnn" onClick={() => handleSetDefaultAddress(address.id)}>Définir comme adresse par défaut</button>
          )}
          <Button className="btnn" onClick={() => handleEditAddress(address.id)}>Modifier</Button>
          <Button className="btnn" onClick={() => handleDeleteAddress(address.id)}>Supprimer</Button>
        </div>
      </div>
    </Col>
  ))}
</Row>


      {selectedAddress && (
  <Modal show={true} onHide={() => setSelectedAddress(null)}>
    <Modal.Header closeButton>
      <Modal.Title>Modifier l'addresse</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <form onSubmit={handleUpdateAddress}>
        <label>
          Rue:
          <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} />
        </label>
        <br />
        <label>
          Ville:
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        </label>
        <br />
        <label>
        Code Postal :
          <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
        </label>
        <br />
        <label>
          Pays:
          <input type="number" value={country} onChange={(e) => setCountry(e.target.value)} />
        </label>
        <br />     
      </form>
    </Modal.Body>
    <Modal.Footer>
    <Button variant="primary" type="submit"onClick={handleUpdateAddress}>Mettre à jour</Button>
      <Button variant="secondary" onClick={() => setSelectedAddress(null)}>Fermer</Button>
    </Modal.Footer>
  </Modal>
)}

      {!user && (
        <div className="profile-content">
          <p className="profile-message">Avez vous un compte ?</p>
          <Button className="profilebutton"  onClick={handleLoginClick}>Connexion</Button>
          <Button  className="profilebutton" onClick={handleSignupClick} >Inscription</Button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
        };
export default Profile;  