import React from 'react';
import "./Products.css"

const Products = ({productsItems}) => {
    return (
        <div className="products">
            {productsItems.map((productItem) => (
                <div className="card">
                    <div>
                        <img className="product-image" src={productItem.image} alt={productItem.name}/>
                    </div>

                </div>
            ))}
            
        </div>
    )
        
    
}
export default Products;