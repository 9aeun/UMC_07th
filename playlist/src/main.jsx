import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; // Provider import
import { store } from "./redux/store"; // Redux store import
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
