import React, { useState, useEffect } from "react";
import RoleList from "../../Component/RolesList";
import RoleModalCreate from "../../Component/RolesModelCreate";
import GrantPrivilegeModal from "../../Component/GrantPrivilegeModal"; // Import the new modal
import { fetchRoles, createRole, deleteRole } from "../../Services/UsersService";


const Roles = () => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isGrantModalOpen, setIsGrantModalOpen] = useState(false); // State for GrantPrivilegeModal
    const [selectedRole, setSelectedRole] = useState(""); // State to store the selected role name
    const [currentRoleCreate, setCurrentRoleCreate] = useState({ roleName: "", authType: "NOT_IDENTIFIED", password: "" });

    // Fetch roles on component mount
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await fetchRoles();
                setRoles(data);
            } catch (err) {
                console.error("Error fetching roles:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Modal handlers
    const handleCreateModalOpen = () => {
        setIsCreateModalOpen(true);
        setCurrentRoleCreate({ roleName: "", authType: "NOT_IDENTIFIED", password: "" });
    };

    const handleCreateModalClose = () => {
        setIsCreateModalOpen(false);
    };

    const handleGrantModalOpen = (roleName) => {
        setSelectedRole(roleName);
        setIsGrantModalOpen(true);
    };

    const handleGrantModalClose = () => {
        setIsGrantModalOpen(false);
        setSelectedRole("");
    };

    // Input handlers
    const handleCreateInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentRoleCreate({ ...currentRoleCreate, [name]: value });
    };

    // Submit handlers
    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        try {
            await createRole(currentRoleCreate);
            const updatedRoles = await fetchRoles();
            setRoles(updatedRoles);
            handleCreateModalClose();
        } catch (err) {
            console.error("Error creating role:", err);
        }
    };

    const handleDelete = async (roleName) => {
        try {
            await deleteRole(roleName);
            alert("Rôle supprimé avec succès !");
            const updatedRoles = await fetchRoles();
            setRoles(updatedRoles);
        } catch (error) {
            console.error("Erreur lors de la suppression du rôle :", error);
            alert("Erreur lors de la suppression du rôle.");
        }
    };

    return (
        <div>
            <button onClick={handleCreateModalOpen} className="text-2xl font-semibold mb-4 text-green-500">
                Ajouter un rôle
            </button>
            <RoleList
                roles={roles}
                loading={loading}
                onDelete={handleDelete}
                onGrant={handleGrantModalOpen} // Pass the grant handler to RoleList
            />

            <RoleModalCreate
                isOpen={isCreateModalOpen}
                roles={currentRoleCreate}
                onClose={handleCreateModalClose}
                onChange={handleCreateInputChange}
                onSubmit={handleCreateSubmit}
            />

            <GrantPrivilegeModal
                isOpen={isGrantModalOpen}
                onClose={handleGrantModalClose}
                roleName={selectedRole}
            />

        </div>
    );
};

export default Roles;