import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js'
import { AuthContextProvider } from './context/AuthContext.js';
import { CartConnectionProvider } from './context/CartContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CartConnectionProvider>
        <App />
      </CartConnectionProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

