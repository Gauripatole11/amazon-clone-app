// import React, { useState, useEffect } from 'react';
// import './Payment.css';
// import { useStateValue } from "./StateProvider";
// //import CheckoutProduct from "./CheckoutProduct";
// import {  useNavigate } from "react-router-dom";
// import { CardElement, useStripe, useElements, Elements } from "@stripe/react-stripe-js";
// import CurrencyFormat from "react-currency-format";
// import { getBasketTotal } from "./reducer";
// import axios from './axios';
// import { loadStripe } from '@stripe/stripe-js';
// import { db } from "./firebase";

// const stripePromise = loadStripe('your_publishable_key');

// function Payment() {
//     const [{ basket, user }, dispatch] = useStateValue();
//     const navigate = useNavigate();

//     const stripe = useStripe();
//     const elements = useElements();

//     const [succeeded, setSucceeded] = useState(false);
//     const [processing, setProcessing] = useState("");
//     const [error, setError] = useState(null);
//     const [disabled, setDisabled] = useState(true);
//     const [clientSecret, setClientSecret] = useState(true);

//     useEffect(() => {
//         // generate the special stripe secret which allows us to charge a customer
//         const getClientSecret = async () => {
//             const response = await axios({
//                 method: 'post',
//                 // Stripe expects the total in a currencies subunits
//                 url: `/payments/create?total=${getBasketTotal(basket) * 100}`
//             });
//             setClientSecret(response.data.clientSecret)
//         }

//         getClientSecret();
//     }, [basket])

//     console.log('THE SECRET IS >>>', clientSecret)
//     console.log('👱', user)

//     const handleSubmit = async (event) => {
//         // do all the fancy stripe stuff...
//         event.preventDefault();
//         setProcessing(true);

//         const payload = await stripe.confirmCardPayment(clientSecret, {
//             payment_method: {
//                 card: elements.getElement(CardElement)
//             }
//         }).then(({ paymentIntent }) => {
//             // paymentIntent = payment confirmation

//             db
//               .collection('users')
//               .doc(user?.uid)
//               .collection('orders')
//               .doc(paymentIntent.id)
//               .set({
//                   basket: basket,
//                   amount: paymentIntent.amount,
//                   created: paymentIntent.created
//               })

//             setSucceeded(true);
//             setError(null)
//             setProcessing(false)

//             dispatch({
//                 type: 'EMPTY_BASKET'
//             })

//             navigate.replace('/orders')
//         })
//     }

//     const handleChange = event => {
//         // Listen for changes in the CardElement
//         // and display any errors as the customer types their card details
//         setDisabled(event.empty);
//         setError(event.error ? event.error.message : "");
//     }

//     return (
//         <div className='payment'>
//             <div className='payment__container'>
//                 {/* ... (rest of your component) ... */}

//                 {/* Payment section - Payment method */}
//                 <div className='payment__section'>
//                     <div className="payment__title">
//                         <h3>Payment Method</h3>
//                     </div>
//                     <div className="payment__details">
//                         {/* Stripe magic will go */}

//                         <form onSubmit={handleSubmit}>
//                             <Elements stripe={stripePromise}>
//                                 <CardElement onChange={handleChange} />

//                                 <div className='payment__priceContainer'>
//                                     <CurrencyFormat
//                                         renderText={(value) => (
//                                             <h3>Order Total: {value}</h3>
//                                         )}
//                                         decimalScale={2}
//                                         value={getBasketTotal(basket)}
//                                         displayType={"text"}
//                                         thousandSeparator={true}
//                                         prefix={"$"}
//                                     />
//                                     <button disabled={processing || disabled || succeeded}>
//                                         <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
//                                     </button>
//                                 </div>
//                             </Elements>

//                             {/* Errors */}
//                             {error && <div>{error}</div>}
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Payment;

import React, { useState, useEffect } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
//import axios from './axios';
import { db } from "./firebase";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);
  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      try {
        const response = await fetch(
          `/payments/create?total=${getBasketTotal(basket) * 100}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // Add any other headers if needed
            },
            // body: JSON.stringify({ /* Add any request body if needed */ }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch client secret");
        }

        const responseData = await response.json();
        setClientSecret(responseData.clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
        // Handle the error appropriately, e.g., show a user-friendly message
      }
    };

    getClientSecret();
  }, [basket]);

  console.log("THE SECRET IS >>>", clientSecret);
  console.log("👱", user);

  const handleSubmit = async (event) => {
    // do all the fancy stripe stuff...
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation

        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        navigate.replace("/orders");
      });
  };

  const handleChange = (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>

        {/* Payment section - delivery address */}
        <div className="payment__section">
          <div className="payment__name">
            <h3> Name: </h3>
          </div>
          <div className="payment__details">
            <p> Gauri Patole</p>
          </div>

          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>126 W McKenzie Ave</p>
            <p>San Fransisco, CA 95204</p>
          </div>
        </div>

        {/* Payment section - Review Items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* Payment section - Payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* Stripe magic will go */}

            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button
                  disabled={processing || disabled || succeeded}
                  onClick={() => navigate("/FinalPage")}
                >
                  <span>{processing ? <p>Processing</p> : "Buy  "}</span>
                  <h4>
                    Now (<Link to="/FinalPage">{basket?.length} items</Link>)
                  </h4>
                </button>
              </div>

              {/* Errors */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
