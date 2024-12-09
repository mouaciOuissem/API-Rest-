import React, { useState, useEffect } from 'react';
import { Col, Row } from "react-bootstrap";

import StoreItem from "./StoreItem";
import axios from 'axios';
import Header from "./header/Header";
import 'bootstrap/dist/css/bootstrap.css';

const Store = () => {
    const [storeItems, setStoreItems] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:8099/products/')
        .then(response => {
          setStoreItems(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }, []);
  return (
    
    <>
      <Header />

      <Row md={2} xs={1} lg={3} className="g-3">
        {storeItems.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Store;
