import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reducer, { initialState } from './reducer';
import { StateProvider } from './StateProvider';

// Import createRoot from "react-dom/client"
const { createRoot } = require('react-dom/client');

// reducer is basically how we actually dispatch the ADD TO BASKET action into the data layer and how we actually pull it into the Basket
const rootElement = document.getElementById('root');

// Create a root with createRoot
const root = createRoot(rootElement);

// Render your app using the new root
root.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorker.unregister();
