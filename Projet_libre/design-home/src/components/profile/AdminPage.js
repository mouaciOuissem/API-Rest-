import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate,NavLink } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Col, Row ,Button ,Modal,Nav} from "react-bootstrap";
const AdminPage = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');
  const token = localStorage.getItem('token');
  const [errors, setErrors] = useState({
    name: false,
    description: false,
    category: false,
    image: false,
    price: false,
    stock: false,
  });
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8099/products/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error('Votre session a expiré. Veuillez vous reconnecter.', {
            position: toast.POSITION.TOP_RIGHT,
          });
          // Ajoutez ici les actions appropriées lorsque la session a expiré
          // Par exemple, vous pouvez rediriger l'utilisateur vers la page de connexion
        } else {
          console.error(error);
        }
      }
    };

    fetchProducts();
  }, [token]);

  
  const handleLogoutClick = () => {
    localStorage.removeItem("token");
   
    navigate("/profile");
  };
  const handleAddProduct = async (e) => {
    e.preventDefault();

    // Validation des champs obligatoires
    let formIsValid = true;
    const newErrors = {};

    if (name.trim() === '') {
      newErrors.name = true;
      formIsValid = false;
    }

    if (description.trim() === '') {
      newErrors.description = true;
      formIsValid = false;
    }
    if (category.trim() === '') {
      newErrors.category = true;
      formIsValid = false;
    }

    if (image.trim() === '') {
      newErrors.image = true;
      formIsValid = false;
    }

    if (price.trim() === '') {
      newErrors.price = true;
      formIsValid = false;
    }
    if (stock.trim() === '') {
      newErrors.stock = true;
      formIsValid = false;
    }
    setErrors(newErrors);

    if (!formIsValid) {
      return;
    }

    const newProduct = {
      name,
      description,
      category,
      price,
      image,
      stock,
    };

    try {
      const response = await axios.post('http://localhost:8099/products/', newProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    
      
      console.log(response.data);

      setName('');
      setDescription('');
      setPrice('');
      setStock('');
      setImage('');
      setCategory('');
      toast.success('Produit ajouté avec succès !');
    } catch (error) {

        console.error(error);
        toast.error('Produit non ajouté !');
      }
    
  };
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleEditProduct = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:8099/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSelectedProduct(response.data);
      setName(response.data.name);
      setDescription(response.data.description);
      setPrice(response.data.price);
      setCategory(response.data.category);
      setStock(response.data.stock);
      setImage(response.data.image);

    } catch (error) {
      toast.error('Votre session a expiré. Veuillez vous reconnecter.', {
        position: toast.POSITION.TOP_RIGHT,
      });
      
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      ...selectedProduct,
      name,
      description,
      price,
      category,
      stock,
      image,
    };

    try {
      const response = await axios.put(`http://localhost:8099/products/${selectedProduct.id}`, updatedProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      
      setSelectedProduct(null);
      setName('');
      setDescription('');
      setImage('');
      setCategory('');
      setPrice('');
      setStock('');
      toast.success( 'Le produit a été mis à jour avec succès !');
    } catch (error) {
      console.error(error);
      toast.error('Echec de la mise à jour du produit !');
        }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:8099/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);

      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error(error);
    }
  };
  return (  
    
    <div>
        <header>
        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink}>
          </Nav.Link>
          <Nav.Link to="/admin/userList" as={NavLink}> Utilisateurs</Nav.Link>
          <Nav.Link to="/admin/stat" as={NavLink}> Stat</Nav.Link>
          <Button variant="primary" className='logout' onClick={handleLogoutClick}>Déconnexion</Button>
          {/* <Nav.Link to="/admin/stat" as={NavLink}> Stat</Nav.Link> */}
          </Nav>
          
    </header>
      <h3>Page d'administration</h3>
      
      <div className="addproduct">
       <h6 className="button-like"  onClick={handleOpenModal}>Ajouter un produit</h6>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Ajouter un produit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleAddProduct}>
              <div className="col-md-8">
                <label htmlFor="validationServer01" className="form-label">Nom</label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  id="validationServer01"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                {errors.name && <div className="invalid-feedback">Champ obligatoire</div>}
              </div>
              <br />
              <div className="col-md-8">
                <label htmlFor="validationServer02" className="form-label">Description</label>
                <input
                  type="text"
                  className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  id="validationServer02"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                {errors.description && <div className="invalid-feedback">Champ obligatoire</div>}
              </div>
              <br />
              <div className="col-md-8">
                <label htmlFor="validationServer02" className="form-label">Category</label>
                <input
                  type="text"
                  className={`form-control ${errors.category ? 'is-invalid' : ''}`}
                  id="validationServer02"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
                {errors.category && <div className="invalid-feedback">Champ obligatoire</div>}
              </div>
              <br />
              <div className="col-md-8">
                <label htmlFor="validationServer03" className="form-label">URL Image</label>
                <input
                  type="text"
                  className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                  id="validationServer03"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  required
                />
                {errors.image && <div className="invalid-feedback">Champ obligatoire</div>}
              </div>
              <br />
              <div className="col-md-8">
                <label htmlFor="validationServer04" className="form-label">Prix</label>
                <input
                  type="number"
                  className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                  id="validationServer04"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
                {errors.price && <div className="invalid-feedback">Champ obligatoire</div>}
              </div>
              <br />
              <div className="col-md-8">
                <label htmlFor="validationServer04" className="form-label">Stock</label>
                <input
                  type="number"
                  className={`form-control ${errors.stock ? 'is-invalid' : ''}`}
                  id="validationServer04"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  required
                />
                {errors.stock && <div className="invalid-feedback">Champ obligatoire</div>}
              </div>
              <br />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Fermer
            </Button>
            <Button variant="primary" type="submit" onClick={handleAddProduct}>
              Ajouter
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    
  
  


      <h5 className="button-like">Liste des produits</h5>
      <Row xs={1} sm={2} md={3} lg={3} className="g-3">
  {products.map((product) => (
    <Col key={product.id}>
      <div className="card">
        <div className="card-body">
        <img src={product.image} className="card-img-top" alt={product.name} width={"300px"}/>
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">prix : {product.price} €</p>
          <p className="card-text">stock : {product.stock} </p>
         
          <Button variant="primary" onClick={() => handleEditProduct(product.id)}>Modifier</Button>
          <Button variant="danger" onClick={() => handleDeleteProduct(product.id)}>Supprimer</Button>
        </div>
      </div>
    </Col>
  ))}
</Row>


{selectedProduct && (
  <Modal show={true} onHide={() => setSelectedProduct(null)}>
    <Modal.Header closeButton>
      <Modal.Title>Modifier le produit</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form onSubmit={handleUpdateProduct}>
        <label>
          Nom:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />
        <label>
          URL Image :
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
        </label>
        <br />
        <label>
          Prix:
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
        <br />  
        <label>
          Category:
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </label>
        <br /> 
        <label>
          Stock:
          <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
        </label>
        <br /> 
          
      </form>
    </Modal.Body>
    <Modal.Footer>
    <Button variant="primary" type="submit"onClick={handleUpdateProduct}>Mettre à jour</Button>
      <Button variant="secondary" onClick={() => setSelectedProduct(null)}>Fermer</Button>
    </Modal.Footer>
  </Modal>
)}


      {updateMessage && <p>{updateMessage}</p>}
      <ToastContainer />
    </div>
  );
  
};

export default AdminPage;
