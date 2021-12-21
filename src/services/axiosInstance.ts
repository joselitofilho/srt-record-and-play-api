import axios from 'axios';

// TODO: process.env.AUTOHEALING_BASE_URL
const API_BASE_URL =
  process.env.AUTOHEALING_BASE_URL || 'http://autohealing:8080';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export default axiosInstance;
