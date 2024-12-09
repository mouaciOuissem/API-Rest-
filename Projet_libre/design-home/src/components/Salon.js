import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row } from "react-bootstrap";
import StoreItem from "./StoreItem";

const Salon = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:8099/products/');
        setItems(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchItems();
  }, []);

  const filteredItems = items.filter((item) => item.category === 'salon');

  return (
    <div>
      
      <h5>Faites de votre salon un lieu de détente et de convivialité </h5>
          <h5> Avec notre sélection de canapés confortables et de tables élégantes</h5>
      {/* {filteredItems.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>Prix : {item.price}</p>
          <img src={item.image} alt={item.name} />
        </div>
      ))} */}
       <Row md={2} xs={1} lg={3} className="g-3">
        {filteredItems.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Salon;
