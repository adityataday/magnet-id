import { Buffer } from "buffer";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
global.Buffer = Buffer;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
