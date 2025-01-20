import React, { useState, useEffect } from "react";
import { fetchRoles } from "../Services/UsersService";

const GrantRoleModal = ({ isOpen, onClose, userId, onGrantRole }) => {
    const [roles, setRoles] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState([]); // Tableau pour stocker les rôles sélectionnés
    const [loading, setLoading] = useState(false);

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

        if (isOpen) {
            fetchData();
        }
    }, [isOpen]);

    // Handle role selection
    const handleRoleChange = (e) => {
        const roleName = e.target.value;
        if (e.target.checked) {
            // Ajouter le rôle sélectionné au tableau
            setSelectedRoles([...selectedRoles, roleName]);
        } else {
            // Retirer le rôle désélectionné du tableau
            setSelectedRoles(selectedRoles.filter((role) => role !== roleName));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onGrantRole(userId, selectedRoles); // Passer le tableau des rôles sélectionnés
            alert("Rôles accordés avec succès !");
            onClose(); // Fermer le modal après l'octroi des rôles
        } catch (err) {
            console.error("Error granting roles:", err);
            alert("Erreur lors de l'octroi des rôles.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-semibold mb-4">Accorder des rôles à l'utilisateur</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Sélectionner des rôles</label>
                        <div className="mt-2 space-y-2">
                            {roles.map((role) => (
                                <div key={role.id} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`role-${role.id}`}
                                        value={role.roleName}
                                        onChange={handleRoleChange}
                                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                    />
                                    <label htmlFor={`role-${role.id}`} className="ml-2 text-sm text-gray-700">
                                        {role.roleName}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-md"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-600 text-white rounded-md"
                        >
                            Accorder
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GrantRoleModal;