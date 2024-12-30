import React, { useState, useEffect } from 'react';
import UserList from '../../Component/UsersList';
import UserModalCreate from '../../Component/UserModelCreate';
import UserModalUpdate from '../../Component/UserModelUpdate';
import { fetchUsers, createUser, updateUser, grantRole } from '../../Services/UsersService';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [currentUserCreate, setCurrentUserCreate] = useState({ username: '', password: '' });
    const [currentUserUpdate, setCurrentUserUpdate] = useState({ id: null, password: '', enable:  false, defaultTablespaceName: '', newTablespaceQuota: '' });

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
        setCurrentUserCreate({ username: '', password: '' });
    };

    const handleUpdateModalOpen = (user) => {
        setIsUpdateModalOpen(true);
        setCurrentUserUpdate({
            id: user.id,
            password: user.password,
            enable: user.enable || '',
            defaultTablespaceName: user.defaultTablespaceName || '',
            newTablespaceQuota: user.newTablespaceQuota || '',
        });
    };

    const handleUpdateModalClose = () => {
        setIsUpdateModalOpen(false);
        setCurrentUserUpdate({ id: null, password: '', enable: false, defaultTablespaceName: '', newTablespaceQuota: '' });
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

    const handleUpdateSubmit = async () => {
        try {
            await updateUser(currentUserUpdate.id, currentUserUpdate);
            const updatedUsers = await fetchUsers();
            setUsers(updatedUsers);
            handleUpdateModalClose();
        } catch (err) {
            console.error('Error updating user:', err);
        }
    };

    const handleGrantRole = async (userId) => {
        try {
            await grantRole(userId);
        } catch (err) {
            console.error('Error granting role:', err);
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
                onGrantRole={handleGrantRole}
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
        </div>
    );
};

export default Users;
