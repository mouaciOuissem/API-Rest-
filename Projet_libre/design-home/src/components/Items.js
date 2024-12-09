import React, { useEffect, useState } from "react";
import axios from "axios";
import StoreItem from "./StoreItem";
// a supprimer 
const Items = () => {
  const [storeItems, setStoreItems] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8099/products/")

      .then((response) => {
        setStoreItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
        <Cart storeItems={storeItems} />
      {storeItems.map((item) => (
        <StoreItem
        
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.price}
          imgUrl={item.imgUrl}
        />
      ))}
    </div>
  );
};

export default Items;
