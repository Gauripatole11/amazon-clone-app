// OrderConfirmation.js

import React from 'react';
import {payment} from './Payment';
import { Link } from 'react-router-dom';
import './FinalPage.css';

const OrderConfirmation = ({ orderId, items, total }) => {
  return (
    <div className="order-confirmation">
      <h1>Your Order is Confirmed</h1>
      <p>Thank you for shopping with us!</p>

      <div className="order-details">
        <h2>Order Details</h2>
        <p>Order ID: 989442788 {orderId}</p>
        

        {items && items.length > 0 ? (
          <div className="ordered-items">
            <h3>Ordered Items:</h3>
            <ul>
              {items.map((item) => (
                <li key={item.id}>
                  {item.name} - ${item.price}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No items in the order.</p>
        )}

        <p>Total Amount: ${total}</p>
      </div>

      <Link to="/">
        <button>Continue Shopping</button>
      </Link>
    </div>
  );
};

export default OrderConfirmation;
