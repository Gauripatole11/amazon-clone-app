import React from 'react';
import { useNavigate } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';

function Subtotal() {
  const [{ basket }] = useStateValue();
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    // Assuming no Axios request is needed, proceed to checkout directly
    navigate('/payment');
  };

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal_gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType="text"
        thousandSeparator={true}
        prefix="$"
      />

      <button onClick={handleProceedToCheckout}>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
