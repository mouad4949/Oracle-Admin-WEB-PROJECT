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
export const deleteUser = async (username) => {
    const response = await axios.delete(`${BASE_URL}/DeleteUser`, {
        params: { username } // Envoyer le username dans le corps de la requête
    });
    return response.data;
};
export const fetchRoles = async (id, role) => {
    const response = await axios.get(`${BASE_URL}/Roles`);
    return response.data;
}
export const fetchPrivileges = async (id, role) => {
    const response = await axios.get(`${BASE_URL}/Privilege`);
    return response.data;
}
export const deleteRole = async (id) => {
    const response = await axios.delete(`${BASE_URL}/Role/${id}`);
}
export const createRole = async (role) => {
    const response = await axios.post(`${BASE_URL}/CreateRole`,role);
    return response.data;
};
export const  grantPrivilegeToRole = async (roleName, privilegeName) => {
    try {
        const response = await axios.post(
            `http://localhost:8080/role/${encodeURIComponent(roleName)}/grant-privilege/${encodeURIComponent(privilegeName)}`
        );
        console.log("Réponse du serveur :", response.data);
        alert("Privilège accordé avec succès !");
    } catch (error) {
        console.error("Erreur lors de l'octroi du privilège :", error);
        alert("Erreur lors de l'octroi du privilège : " + error.response?.data || error.message);
    }
};
export const grantRole = async (username, roleNames) => {
    try {
        const response = await axios.post(`${BASE_URL}/GrantRole`, // URL du endpoint
            {
                username: username, // Nom d'utilisateur
                roleNames: roleNames // Liste des noms de rôles
            },
            {
                headers: {
                    'Content-Type': 'application/json' // En-tête de la requête
                }
            }
        );
        console.log("Réponse du serveur :", response.data);
        alert("Rôles accordés avec succès !");
    } catch (error) {
        console.error("Erreur lors de l'octroi des rôles :", error);
        alert("Erreur lors de l'octroi des rôles : " + error.response?.data || error.message);
    }
};
