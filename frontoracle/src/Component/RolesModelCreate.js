import React from "react";

const CreateRoleForm = ({ isOpen, roles, onClose, onChange, onSubmit }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Créer un rôle</h2>
                <form onSubmit={onSubmit}>
                    {/* Champ : Nom du rôle */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Nom du rôle</label>
                        <input
                            type="text"
                            name="roleName"
                            value={roles.roleName}
                            onChange={onChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    {/* Champ : Type d'authentification */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Type d'authentification</label>
                        <select
                            name="authType"
                            value={roles.authType}
                            onChange={onChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="NOT_IDENTIFIED">Aucune authentification</option>
                            <option value="BY_PASSWORD">Mot de passe</option>
                            <option value="EXTERNALLY">Authentification externe</option>
                            <option value="GLOBALLY">Authentification globale</option>
                        </select>
                    </div>

                    {/* Champ : Mot de passe (conditionnel) */}
                    {roles.authType === "BY_PASSWORD" && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
                            <input
                                type="password"
                                name="password"
                                value={roles.password}
                                onChange={onChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                    )}

                    {/* Boutons */}
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            Créer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateRoleForm;