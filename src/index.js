import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import reportWebVitals from './reportWebVitals';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <PayPalScriptProvider options={{ "client-id": "AXt7UngmzRIT1pSIGefopK31j0FVU1qKQoaOjwe5NSjEegK91hus0whHQIb61bf4EZceVzWueSIUZe-o" }}>
   <BrowserRouter>
   <AuthProvider>
    <App />
    </AuthProvider>
  </BrowserRouter>
  </PayPalScriptProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
