/* AXIOS */
import axios from "axios";

// Axios instance for the backend application
export const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_API_PORT}/api`,
});
