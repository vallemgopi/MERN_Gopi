import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-gopi-7sxi.onrender.com/api", // Ensure this matches your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
