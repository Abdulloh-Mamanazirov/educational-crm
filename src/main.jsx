import { createRoot } from "react-dom/client";
import axios from "axios";

import App from "./App.jsx";
import "./index.css";

// axios
const token = sessionStorage.getItem("crm-token");
// axios.defaults.baseURL = "https://api.jsspm.uz/api";
if (token) axios.defaults.headers.common["Authorization"] = token;

createRoot(document.getElementById("root")).render(<App />);
