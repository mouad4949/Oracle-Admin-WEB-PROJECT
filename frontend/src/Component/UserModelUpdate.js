import React from 'react';

const UserModalUpdate = ({ isOpen, user, onClose, onChange, onSubmit }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Modifier l'utilisateur</h2>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
                        New password
                    </label>
                    <input
                        type="text"
                        name={user.password}
                        onChange={onChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="enable" className="block text-gray-700 font-bold mb-2">
                        Activer
                    </label>
                    <input
                        type="checkbox"
                        name="enable"
                        checked={user.enable}
                        onChange={(e) =>
                            onChange({target: {name: 'enable', value: e.target.checked}})
                        }
                        className="h-5 w-5 text-blue-600 focus:ring-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="defaulttablespacename" className="block text-gray-700 font-bold mb-2">
                        Default Tablespace
                    </label>
                    <input
                        type="text"
                        name={user.defaultTablespaceName}
                        onChange={onChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="defaultquot" className="block text-gray-700 font-bold mb-2">
                        Default Quota
                    </label>
                    <input
                        type="text"
                        name={user.defaultTablespaceName}
                        onChange={onChange}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2"
                    />
                </div>
                <div className="flex justify-end">
                    <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded mr-2">
                        Annuler
                    </button>
                    <button onClick={onSubmit} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">
                        Sauvegarder
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserModalUpdate;
