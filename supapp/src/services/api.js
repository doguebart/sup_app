import axios from "axios";

const api = axios.create({
  baseURL: "https://sup-rm88383.azurewebsites.net/api/",
});

export default api;