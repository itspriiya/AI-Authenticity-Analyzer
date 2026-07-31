import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-authenticity-analyzer.onrender.com",
});

export default api;