import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Header from './Header';
import Home from './Home';
import Payment from './Payment';
import Checkout from './Checkout';
import Login from './Login';
import FinalPage from './FinalPage';

const promise = loadStripe(
  'pk_test_51HPvU9DFg5koCdLGJJbNo60QAU99BejacsvnKvT8xnCu1wFLCuQP3WBArscK3RvSQmSIB3N0Pbsc7TtbQiJ1vaOi00X9sIbazL'
);

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        {/* header nav bar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/FinalPage" element={<FinalPage/>} />
          <Route path="/payment" element={
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
