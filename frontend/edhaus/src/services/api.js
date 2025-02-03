import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: false,
  timeout: 15000, // Increase timeout
  retryDelay: 1000,
  maxRetries: 3
});

// Add a request interceptor to add the auth token
api.interceptors.request.use(
  (config) => {
    // Log the request for debugging
    console.log(`Making ${config.method.toUpperCase()} request to ${config.url}`);
    
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    console.log(`Response from ${response.config.url}:`, response.status);
    return response;
  },
  async (error) => {
    const { config, response } = error;
    
    // If the error has no config object, it's not a request error
    if (!config) {
      console.error('Non-request error:', error);
      return Promise.reject(error);
    }

    // Check if we should retry the request
    const shouldRetry = config.retryCount < (config.maxRetries || 3);
    
    if (shouldRetry) {
      config.retryCount = (config.retryCount || 0) + 1;
      console.log(`Retrying request to ${config.url} (attempt ${config.retryCount})`);
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, config.retryDelay || 1000));
      return api(config);
    }

    // Log detailed error information
    if (response) {
      console.error('Response error:', {
        status: response.status,
        data: response.data,
        url: config.url,
        method: config.method
      });
    } else if (error.request) {
      console.error('Request error:', {
        request: error.request,
        url: config.url,
        method: config.method
      });
    } else {
      console.error('Error:', error.message);
    }

    return Promise.reject(error);
  }
);

// Add retry count to requests
api.interceptors.request.use((config) => {
  config.retryCount = 0;
  return config;
});

export default api;