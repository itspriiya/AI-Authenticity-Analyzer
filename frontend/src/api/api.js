import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-authenticity-analyzer-production.up.railway.app",
});

export default api;