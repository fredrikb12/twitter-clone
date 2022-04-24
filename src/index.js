import React, { useState } from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import RouteSwitch from "./RouteSwitch";
import GlobalStyle from "./components/styled/GlobalStyle.js";
import { ThemeProvider } from "styled-components";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <RouteSwitch />
  </React.StrictMode>
);
