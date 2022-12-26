import React from 'react';
import { product } from 'prelude-ls';


const Cart = ({products, onRemoveCartItem, total}) => {
  return (
    <>
    <div className="title">Your cart section 
    {!products.length ? "" : products.length}</div>
    <div className="basket">
    {
        !products.length
        ? "No Items"
        : products.map((product) => (
            <p key={product.id}>
                {product.title} (${product.price})
                <button onClick={() => onRemoveCartItem(product)}>Remove item</button>
            </p>
        ))
    }
    </div>
    {!product.length ? "" : <div className="total">Total: ${total}</div>}
    </>
  );
};

export default Cart;