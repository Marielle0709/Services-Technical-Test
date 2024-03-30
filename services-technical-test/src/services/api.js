// api.js

import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/utilisateurs`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response.data.error;
  }
};
