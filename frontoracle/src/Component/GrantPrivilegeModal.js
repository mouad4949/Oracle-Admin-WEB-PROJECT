import React, { useState, useEffect } from "react";
import { fetchPrivileges, grantPrivilegeToRole } from "../Services/UsersService";

const GrantPrivilegeModal = ({ isOpen, onClose, roleName }) => {
    const [privileges, setPrivileges] = useState([]);
    const [selectedPrivilege, setSelectedPrivilege] = useState("");
    const [loading, setLoading] = useState(false);

    // Fetch privileges on component mount
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await fetchPrivileges();
                setPrivileges(data);
            } catch (err) {
                console.error("Error fetching privileges:", err);
            } finally {
                setLoading(false);
            }
        };

        if (isOpen) {
            fetchData();
        }
    }, [isOpen]);

    // Handle privilege selection
    const handlePrivilegeChange = (e) => {
        setSelectedPrivilege(e.target.value);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await grantPrivilegeToRole(roleName, selectedPrivilege);
            alert("Privilège accordé avec succès !");
            onClose(); // Close the modal after successful grant
        } catch (err) {
            console.error("Error granting privilege:", err);
            alert("Erreur lors de l'octroi du privilège.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-semibold mb-4">Accorder un privilège au rôle : {roleName}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Sélectionner un privilège</label>
                        <select
                            value={selectedPrivilege}
                            onChange={handlePrivilegeChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            required
                        >
                            <option value="" disabled>Sélectionnez un privilège</option>
                            {privileges.map((privilege) => (
                                <option key={privilege.id} value={privilege.name}>
                                    {privilege.name}
                                </option>
                            ))}
                        </select>
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

export default GrantPrivilegeModal;