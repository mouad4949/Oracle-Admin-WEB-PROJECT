import React, { useState, useEffect } from 'react';
import UserList from '../../Component/UsersList';
import UserModalCreate from '../../Component/UserModelCreate';
import UserModalUpdate from '../../Component/UserModelUpdate';
import GrantRoleModal from '../../Component/GrantToUserModal'; // Import the new modal
import { fetchUsers, createUser, updateUser, grantRole, deleteUser, fetchRoles } from '../../Services/UsersService';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isGrantRoleModalOpen, setIsGrantRoleModalOpen] = useState(false); // State for GrantRoleModal
    const [selectedUserId, setSelectedUserId] = useState(null); // State to store the selected user ID
    const [currentUserCreate, setCurrentUserCreate] = useState({ username: '', password: '' });
    const [currentUserUpdate, setCurrentUserUpdate] = useState({ id: null,username:'', password: '', enable: false, defaultTablespaceName: '', newTablespaceQuota: '' });

    // Fetch users on component mount
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (err) {
                console.error('Error fetching users:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Modal handlers
    const handleCreateModalOpen = () => {
        setIsCreateModalOpen(true);
        setCurrentUserCreate({ username: '', password: '' });
    };

    const handleCreateModalClose = () => {
        setIsCreateModalOpen(false);
    };

    const handleUpdateModalOpen = (user) => {
        setIsUpdateModalOpen(true);
        setCurrentUserUpdate({
            id: user.id,
            password: user.password,
            username: user.username,
            enable: user.enable || false,
            defaultTablespaceName: user.defaultTablespaceName || '',
            newTablespaceQuota: user.newTablespaceQuota || '',
        });
    };

    const handleUpdateModalClose = () => {
        setIsUpdateModalOpen(false);
    };

    const handleGrantRoleModalOpen = (userName) => {
        setSelectedUserId(userName);
        setIsGrantRoleModalOpen(true);
    };

    const handleGrantRoleModalClose = () => {
        setIsGrantRoleModalOpen(false);
        setSelectedUserId(null);
    };

    // Input handlers
    const handleCreateInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentUserCreate({ ...currentUserCreate, [name]: value });
    };

    const handleUpdateInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentUserUpdate({ ...currentUserUpdate, [name]: value });
    };

    // Submit handlers
    const handleCreateSubmit = async () => {
        try {
            await createUser(currentUserCreate);
            const updatedUsers = await fetchUsers();
            setUsers(updatedUsers);
            handleCreateModalClose();
        } catch (err) {
            console.error('Error creating user:', err);
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(currentUserUpdate.id, currentUserUpdate);
            const updatedUsers = await fetchUsers();
            setUsers(updatedUsers);
            handleUpdateModalClose();
        } catch (err) {
            console.error('Error updating user:', err);
        }
    };

    const handleDelete = async (username) => {
        try {
            await deleteUser(username);
            alert('Utilisateur supprimé avec succès !');
            const updatedUsers = await fetchUsers();
            setUsers(updatedUsers);
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'utilisateur :', error);
            alert('Erreur lors de la suppression de l\'utilisateur.');
        }
    };

    const handleGrantRole = async (username, roleNames) => {
        try {
            // Appeler l'API pour accorder les rôles sélectionnés
            await grantRole(username, roleNames); // Utiliser la méthode axios.post
            alert("Rôles accordés avec succès !");
            const updatedUsers = await fetchUsers();
            setUsers(updatedUsers);
        } catch (err) {
            console.error("Error granting roles:", err);
            alert("Erreur lors de l'octroi des rôles : " + err.response?.data || err.message);
        }
    };

    return (
        <div>
            <button onClick={handleCreateModalOpen} className="text-2xl font-semibold mb-4 text-green-600">
                Ajouter un utilisateur
            </button>
            <UserList
                users={users}
                loading={loading}
                onEdit={handleUpdateModalOpen}
                onGrantRole={handleGrantRoleModalOpen}
                onDelete={handleDelete}
            />
            <UserModalCreate
                isOpen={isCreateModalOpen}
                user={currentUserCreate}
                onClose={handleCreateModalClose}
                onChange={handleCreateInputChange}
                onSubmit={handleCreateSubmit}
            />
            <UserModalUpdate
                isOpen={isUpdateModalOpen}
                user={currentUserUpdate}
                onClose={handleUpdateModalClose}
                onChange={handleUpdateInputChange}
                onSubmit={handleUpdateSubmit}
            />
            <GrantRoleModal
                isOpen={isGrantRoleModalOpen}
                onClose={handleGrantRoleModalClose}
                userId={selectedUserId}
                onGrantRole={handleGrantRole}
            />
        </div>
    );
};

export default Users;