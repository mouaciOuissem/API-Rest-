import React, { useEffect, useState } from 'react';
import { Stack, Button } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext';
import axios from 'axios';
import FormatCurrency from './FormatCurrency';

const CartItem = ({ id, quantity }) => {
  const { removeFromCart } = useShoppingCart();
  const [item, setItem] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8099/products/${id}`)
      .then((response) => {
        setItem(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
    const isUserLoggedIn = async () => {
    const token = localStorage.getItem('token'); 
    if (token) {
      try {
        const response = await axios.get("http://localhost:8099/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return true;
      } catch (error) {
        return false;
      }
    } else {
      return false;
    }
  };

  if (!item) return null;

  return (
    <>
      {isUserLoggedIn() && (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
          <img
            src={item.image}
            alt="cart-img"
            style={{ width: '125px', height: '75px', objectFit: 'cover' }}
          />
          <div className="me-auto">
            <div>
              {item.name}{' '}
              {quantity > 1 && (
                <span className="text-muted" style={{ fontSize: '0.65rem' }}>
                  x{quantity}
                </span>
              )}
            </div>
            <div className="text-muted" style={{ fontSize: '0.75rem' }}>
              {FormatCurrency(item.price)}
            </div>
          </div>
          <div>{FormatCurrency(item.price * quantity)}</div>
          <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item.id)}>
            &times;
          </Button>
        </Stack>
      )}
    </>
  );
              };  

export default CartItem;
