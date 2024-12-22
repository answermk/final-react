// src/utils/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8083/api/accountant', // Update with your actual backend API URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
