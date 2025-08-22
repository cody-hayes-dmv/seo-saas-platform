import axios from "axios";
const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token") || "dev-token";
  const agencyId = localStorage.getItem("agencyId") || "";
  if (token) config.headers.Authorization = `Bearer ${token}`;
  if (agencyId) config.headers["x-agency-id"] = agencyId;
  return config;
});
export default api;
