import axios from 'axios';

// Create axios instance
const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000 // 10 seconds timeout
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // Get token from localStorage
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// API methods
export const apiService = {
    get: async (url, config = {}) => {
        return api.get(url, config);
    },
    post: async (url, data, config = {}) => {
        return api.post(url, data, config);
    },
    put: async (url, data, config = {}) => {
        return api.put(url, data, config);
    },
    delete: async (url, config = {}) => {
        return api.delete(url, config);
    }
};

const API_URL = 'http://localhost:5000/api';

export const registerSeller = async (sellerData) => {
  try {
    const response = await axios.post(`${API_URL}/users/register-seller`, sellerData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default api;