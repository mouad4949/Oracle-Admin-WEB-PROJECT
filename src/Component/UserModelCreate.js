import React from 'react';

const UserModal = ({ isOpen, user, onClose, onChange, onSubmit }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4">
                   Ajouter un utilisateur
                </h2>
                <form>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Nom d'utilisateur</label>
                        <input
                            type="text"
                            name="username"
                            value={user.username}
                            onChange={onChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Mot de passe</label>

                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={onChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                </form>
                <div>
                    <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2">Annuler</button>
                    <button onClick={onSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Créer</button>
                </div>
            </div>
        </div>
    );
};

export default UserModal;
