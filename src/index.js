// src/index.js

import React from "react";
import ReactDOM from "react-dom/client"; // Note the change
import App from "./App";

// Create a root element where you want your app to render
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App component using the createRoot method
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
