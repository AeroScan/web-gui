/* REACT */
import React from "react";
import ReactDOM from "react-dom/client";

/* COMPONENTS */
import App from "./App";

/* CONFIGS */
import "./configs/i18n";
// import reportWebVitals from "./configs/reportWebVitals";

/* STYLES */
import "antd/dist/reset.css";
import "./index.css";

// Root element to render the application
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// Render method
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Setup measurement metrics (uncomment to view the reports)
// reportWebVitals(console.log);

