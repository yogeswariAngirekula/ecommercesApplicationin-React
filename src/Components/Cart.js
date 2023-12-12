// components/Cart.js
import React from 'react';
import { useSelector } from 'react-redux';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.cartItems);

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item.id}>
              <p>{item.name} - ${item.price}</p>
              {/* Display other item details */}
            </div>
          ))}
          {/* Checkout button or summary can be added here */}
        </div>
      )}
    </div>
  );
};

export default Cart;
