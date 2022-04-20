import React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import RouteSwitch from "./RouteSwitch";
import GlobalStyle from "./components/styled/GlobalStyle";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <GlobalStyle />
    <RouteSwitch />
  </React.StrictMode>
);
