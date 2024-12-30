import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export const fetchUsers = async () => {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
};

export const createUser = async (newUser) => {
    const response = await axios.post(`${BASE_URL}/CreateUser`, newUser);
    return response.data;
};

export const updateUser = async (id, updatedUser) => {
    const response = await axios.post(`${BASE_URL}/UpdateUser`, updatedUser);
    return response.data;
};

export const grantRole = async (userId) => {
    const response = await axios.post(`${BASE_URL}/grantRole/${userId}`);
    return response.data;
};
