import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { PaymentProvider } from "./components/userComponents/userContext/PaymentContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PaymentProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PaymentProvider>
  </React.StrictMode>
);