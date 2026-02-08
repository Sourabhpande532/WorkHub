import axios from "axios";

const API_URL = axios.create({
  baseURL: "https://work-hub-mu.vercel.app",
  withCredentials: true,
});
export default API_URL;
