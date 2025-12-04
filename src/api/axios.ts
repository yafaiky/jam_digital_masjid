import axios from "axios";

const api = axios.create({
  baseURL: "http://10.2.22.39:8080",
  withCredentials: true, 
});

export default api;
