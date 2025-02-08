import axios from "axios";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "@ant-design/v5-patch-for-react-19";

import "./index.css";
import App from "./App.jsx";
import { store } from "./redux";

// axios
const token = sessionStorage.getItem("crm-token");
// axios.defaults.baseURL = "https://api.jsspm.uz/api";
if (token) axios.defaults.headers.common["Authorization"] = token;

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
