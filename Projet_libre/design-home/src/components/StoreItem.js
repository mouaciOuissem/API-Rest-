import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import FormatCurrency from "./FormatCurrency";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

const StoreItem = ({ id }) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(id);
  const [products, setProducts] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8099/products/')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.log(error);
      });

    const checkUserLoggedIn = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get("http://localhost:8099/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setIsUserLoggedIn(true);
        } catch (error) {
          setIsUserLoggedIn(false);
        }
      } else {
        setIsUserLoggedIn(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  const handleAddToCart = () => {
    if (isUserLoggedIn) {
      if (product.stock === 0) {
        console.log("Désolé, cet article est actuellement en rupture de stock.");
      } else {
        increaseCartQuantity(id);
      }
    } else {
      console.log("Veuillez vous connecter pour pouvoir ajouter cet article dans le panier.");
    }
  };

  const product = products.find(product => product.id === id);

  if (!product) {
    return null;
  }

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={product.image}
        alt={product.name}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-4">{product.name}</span>
          <span className="ms-2 text-muted">{FormatCurrency(product.price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {isUserLoggedIn && quantity > 0 && (
            <div className="d-flex align-items-center flex-column" style={{ gap: "0.5rem" }}>
              <div className="d-flex align-items-center justify-content-center" style={{ gap: "0.5rem" }}>
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                <div>
                  <span className="fs-6">{quantity} dans votre panier</span>
                </div>
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeFromCart(id)}
              >
                Supprimer
              </Button>
            </div>
          )}

          {!isUserLoggedIn && (
            <div>
              Veuillez vous connecter pour pouvoir ajouter cet article.
            </div>
          )}

          {isUserLoggedIn && quantity === 0 && product.stock > 0 && (
            <Button className="btnn" onClick={handleAddToCart}>
              Ajouter au panier
            </Button>
          )}

          {isUserLoggedIn && quantity === 0 && product.stock === 0 && (
            <div>
              Cet article est actuellement en rupture de stock.
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StoreItem;
