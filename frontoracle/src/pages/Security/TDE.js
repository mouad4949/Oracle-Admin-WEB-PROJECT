import { useState } from 'react';

export function TDEForm() {
    const [tableName, setTableName] = useState('');
    const [columnName, setColumnName] = useState('');
    const [message, setMessage] = useState(''); // Pour afficher un message à l'utilisateur

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/security/enable-tde', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tableName, columnName }),
            });
            if (response.ok) {
                setMessage('Chiffrement TDE activé avec succès !');
                setTableName('');
                setColumnName('');
            } else {
                throw new Error('Erreur lors de l\'activation du TDE');
            }
        } catch (error) {
            setMessage('Impossible d\'activer le chiffrement TDE.');
            console.error(error);
        }
    };

    return (
        <div className="border border-red-700 rounded-lg shadow-sm">
            <div className="p-4 border-b border-red-700">
                <h3 className="text-red-700 font-semibold text-lg">Activer le chiffrement TDE</h3>
            </div>
            <div className="p-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Nom de la table"
                        value={tableName}
                        onChange={(e) => setTableName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Nom de la colonne"
                        value={columnName}
                        onChange={(e) => setColumnName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-red-700 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
                    >
                        Activer TDE
                    </button>
                </form>
                {message && <p className="mt-4 text-sm text-red-700">{message}</p>}
            </div>
        </div>
    );
}