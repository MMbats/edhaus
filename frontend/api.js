const API_BASE_URL = 'http://localhost:5000/api'; // Update with your Flask backend URL

const getHeaders = () => {
  const token = localStorage.getItem('edhaus_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

export const api = {
  // Auth endpoints
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(credentials)
    });
    return response.json();
  },

  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(userData)
    });
    return response.json();
  },

  // Products endpoints
  getProducts: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/products?${queryString}`, {
      headers: getHeaders()
    });
    return response.json();
  },

  getProduct: async (id) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      headers: getHeaders()
    });
    return response.json();
  },

  // Orders endpoints
  getOrders: async () => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      headers: getHeaders()
    });
    return response.json();
  },

  getOrder: async (id) => {
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      headers: getHeaders()
    });
    return response.json();
  },

  createOrder: async (orderData) => {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(orderData)
    });
    return response.json();
  }
};