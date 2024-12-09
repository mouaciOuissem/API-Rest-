import './Home.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "./header/Header";
import { Link } from "react-router-dom";
import StoreItem from "./StoreItem";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Col, Row } from "react-bootstrap";

const Home = () => {
  const images = [
    { id: 1, src: "/pics/cuisine-home.jpg", alt: "Image 1", link: "/cuisine" },
    { id: 3, src: "/pics/salon-home.jpg", alt: "Image 3", link: "/salon" },
    { id: 2, src: "/pics/salon-home3.jpg", alt: "Image 2", link: "/page2" },
  ];
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  const [cartItems, setCartItems] = useState([]);
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };
  

  return (
    <div>
      <Header />
      <h5 >Des idées de décoration inspirantes pour votre maison </h5>

      <div className="slider-container">
        <Slider {...settings}>
          {images.map((image) => (
            <div key={image.id}>
              <Link to={image.link}>
                <img className="slider-image" src={image.src} alt={`Image ${image.id}`} />
              </Link>
            </div>
          ))}
        </Slider>
      </div>

      <div class="vertical-line"> 
      {/* <span class="phrase1">Des idées de décoration inspirantes pour chaque pièce de votre </span> */}
  <span class="phrase">Laissez libre cours à votre créativité et créez un espace unique</span>
</div>

      <h5 className=" art-degrade" >Laissez libre cours à votre créativité et créez un espace unique</h5>
      <Row md={2} xs={1} lg={3} className="g-9">
        {storeItems.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default Home;
