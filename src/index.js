import React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import RouteSwitch from "./RouteSwitch";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <RouteSwitch/>
  </React.StrictMode>
);
