import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row } from "react-bootstrap";
import StoreItem from "./StoreItem";

const Cuisine = () => {
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

  const filteredItems = items.filter((item) => item.category === 'cuisine');

  return (
    <div>
        <h5>Rendez votre espace de vie unique avec nos produits haut de gamme.</h5>
          <h5> Faites de votre maison un lieu qui vous ressemble.</h5>

      {/* <h1>Articles de la catégorie "Salon"</h1> */}
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

export default Cuisine;
