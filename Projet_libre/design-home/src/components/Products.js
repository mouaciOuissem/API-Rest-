import React from 'react';

const Products = (props) => {
    const {productItems} = props
    return (
        <div className="products">
            {productItems.map((productItem) => (
                <div className="card" key={productItem.id}>
                    <div>
                        <img className="product-image" src={productItem.image} alt={productItem.name}/>
                    </div>

                </div>
            ))}
            
        </div>
    )
        
    
}
export default Products;