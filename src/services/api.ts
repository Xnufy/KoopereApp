import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:13000",
});

export default api;