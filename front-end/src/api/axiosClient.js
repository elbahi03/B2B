import axios from "axios";

const API = "http://127.0.0.1:8000";

const axiosClient = axios.create({
  baseURL: `${API}/api`,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosClient;
