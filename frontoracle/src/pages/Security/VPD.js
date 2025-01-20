import { useState } from 'react';

export function VPDForm() {

    const [policyName, setPolicyName] = useState('');
    const [fonction, setFonction] = useState('');
    const [fonctionName, setFonctionName] = useState('');
    const [nomTable, setTableName] = useState('');
    const [message, setMessage] = useState(''); // Pour afficher un message à l'utilisateur

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/security/create-policy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fonction ,fonctionName ,nomTable,policyName }),
            });
            if (response.ok) {
                setMessage('Politique VPD créée avec succès !');
                setFonction('');
                setFonctionName('');
                setTableName('');
                setPolicyName('');

            } else {
                throw new Error('Erreur lors de la création de la politique VPD');
            }
        } catch (error) {
            setMessage('Impossible de créer la politique VPD.');
            console.error(error);
        }
    };

    return (
        <div className="border border-red-700 rounded-lg shadow-sm">
            <div className="p-4 border-b border-red-700">
                <h3 className="text-red-700 font-semibold text-lg">Créer une politique VPD</h3>
            </div>
            <div className="p-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Fonction Name"
                        value={fonctionName}
                        onChange={(e) => setFonctionName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                    />
                    <input
                        type="text"
                        placeholder=" fonction a executer"
                        value={fonction}
                        onChange={(e) => setFonction(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                    />
                    <input
                        type="text"
                        placeholder=" Table Name"
                        value={nomTable}
                        onChange={(e) => setTableName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Policy Name"
                        value={policyName}
                        onChange={(e) => setPolicyName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-red-700 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
                    >
                        Créer la politique VPD
                    </button>
                </form>
                {message && <p className="mt-4 text-sm text-red-700">{message}</p>}
            </div>
        </div>
    );
}