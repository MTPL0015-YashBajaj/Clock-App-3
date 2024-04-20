import React from "react";
import ReactDOM from "react-dom";
import LocalRoutes from "./navigations/navigation";
import "./App.css";
import "./screens/login-signUp/styles.css";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <LocalRoutes />
  </React.StrictMode>,
  rootElement
);
