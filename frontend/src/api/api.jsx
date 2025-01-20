import axios from 'axios';

const API_URL1 = 'http://localhost:8081/auth'; // API for authentification
const API_URL2 = 'http://localhost:8084/api/Operation' // API for transactions
const API_URL3 = 'http://localhost:8082/api/loan-applications'; // API for loan applications
const API_URL4 = 'http://localhost:8085/accounts'

// API for login (assuming token is returned on login)
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL1}/login`, { username, password });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fetch transactions by compte Id with token
export const getTransactionsByCompteId = async (compteId, token) => {
  try {
    const response = await axios.get(`${API_URL2}/operations/${compteId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// // Fetch transactions by client ID
// export const getTransactionsByClientId = async (clientId) => {
//     try {
//       const response = await axios.get(`${API_URL2}/ConsulterOperation/${clientId}`);
//       return response.data;
//     } catch (error) {
//       throw error.response ? error.response.data : error.message;
//     }
//   };

// Create a new loan application
export const createLoanApplication = async (loanData) => {
  try {
    const response = await axios.post(`${API_URL3}`, loanData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fetch all loan applications for the current user
export const fetchLoanApplications = async (userId) => {
  try {
    const response = await axios.get(`${API_URL3}/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fetch accounts by client id 

export const getAccountsbyClientID = async (clientId, token) => {
  try {
    const response = await axios.get(`${API_URL4}/client/${clientId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};