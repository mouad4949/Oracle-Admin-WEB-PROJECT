import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:8080/api' // Replace with your actual backend URL
});

export default api;