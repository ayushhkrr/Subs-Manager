
import axios from 'axios';


const apiUrl = import.meta.env.VITE_API_URL;

// Create axios instance
const api = axios.create({
  baseURL: `${apiUrl}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// User API calls
export const userAPI = {
  register: (data) => api.post('/users/register', data),
  login: (data) => api.post('/users/login', data),
  getCurrentUser: () => api.get('/users/me'),
  deleteAccount: (id) => api.delete(`/users/${id}`),
  createPayment: () => api.post('/users/payment-gateway'),
};

// Subscription API calls
export const subscriptionAPI = {
  getAll: () => api.get('/subscriptions'),
  create: (data) => api.post('/subscriptions', data),
  update: (id, data) => api.patch(`/subscriptions/${id}`, data),
  delete: (id) => api.delete(`/subscriptions/${id}`),
  getSummary: () => api.get('/subscriptions/summary'),
};

export default api;
