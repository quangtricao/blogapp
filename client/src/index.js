import React from "react";
import ReactDOM from "react-dom/client";

import LoginPage from "./LoginPage";
import App from "./App";
import store from "./store";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/*" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  </Provider>
);
