import axios from "axios";

export const axiosLocal = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
});
export const axiosServer = axios.create({
  baseURL: process.env.EXTERNAL_API_BASE_URL || 'http://www.hrbarkav.com:8081'
});
