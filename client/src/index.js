import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot
import LocalRoutes from "./navigations/navigation";
import "./App.css";

const rootElement = document.getElementById("root");

// Use createRoot for rendering in React 18
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <LocalRoutes />
  </React.StrictMode>
);
