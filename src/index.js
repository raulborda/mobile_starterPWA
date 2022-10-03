import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

let url = window.location.href;
let swLocation = "/duoCRM/sw.js";

if (navigator.serviceWorker) {
  if (url.includes("localhost")) {
    swLocation = "/sw.js";
  }
  navigator.serviceWorker.register(swLocation);
  console.log("Registró service worker");
} else {
  console.log("El navegador no soporta service worker");
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
