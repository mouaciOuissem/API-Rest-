import { Offcanvas, Stack, Form ,Button} from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import CartItem from "./CartItem";
import FormatCurrency from "./FormatCurrency";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShoppingCart = ({ isOpen }) => {
  const { closeCart, cartItems } = useShoppingCart();
  const [storeItems, setStoreItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const token = localStorage.getItem('token');

  const [selectedDefaultAddress, setSelectedDefaultAddress] = useState(null);
  const [defaultAddressId, setDefaultAddressId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storeItemsResponse = await axios.get('http://localhost:8099/products/');
        setStoreItems(storeItemsResponse.data);

        const addressesResponse = await axios.get('http://localhost:8099/address', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAddresses(addressesResponse.data);

        const defaultAddress = addressesResponse.data.find(address => address.isDefault);
        if (defaultAddress) {
          setSelectedAddress(defaultAddress);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [token]);

  const handleAddressSelection = (address) => {
    setSelectedAddress(address);
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
    const storedDefaultAddressId = localStorage.getItem("defaultAddressId");
    if (storedDefaultAddressId) {
      setDefaultAddressId(storedDefaultAddressId);
    }
  }, []);

  useEffect(() => {
    if (defaultAddressId) {
      getAddressByIdDefault();
    }
  }, [defaultAddressId, token]);

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Panier</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="text-center mb-3">
          <i className="bi bi-cart4 fs-1"></i>
        </div>
        {cartItems.length === 0 ? (
          <div className="text-center">Votre panier est vide</div>
        ) : (
          <Stack gap={3}>
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
            <div className="ms-auto fw-bold fs-5">
              Total{" "}
              {FormatCurrency(
                cartItems.reduce((total, cartItem) => {
                  const item = storeItems.find((i) => i.id === cartItem.id);
                  return total + (item?.price || 0) * cartItem.quantity;
                }, 0)
              )}
            </div>
          </Stack>
        )}
        <div className="addr">
<Form>  
  <Form.Group>
    <Form.Label>Adresse de livraison</Form.Label>
    {selectedDefaultAddress && (
      <div>

        <p>Adresse par défaut :{selectedDefaultAddress.street} {selectedDefaultAddress.city}, {selectedDefaultAddress.postalCode} {selectedDefaultAddress.country}</p>
      </div>
    )}
     <p>Choisir une autre addresse ?</p>
    {addresses.map((address) => (
      <div key={address.id}>
        <Form.Check
          type="radio"
          id={`address-${address.id}`}
          name="address"
          label={`${address.street}, ${address.city},${address.postalCode} ${address.country}`}
          checked={selectedAddress && selectedAddress.id === address.id}
          defaultChecked={defaultAddressId === address.id}
          onChange={() => handleAddressSelection(address)}
          onClick={() => handleSetDefaultAddress(address.id)}
        />

      </div>
      
    ))}
  <Button className='btnn'>Validation</Button>
  </Form.Group>
  
</Form>
</div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCart;
