import { useState } from 'react';

export function AuditForm() {
    const [action, setAction] = useState('');
    const [message, setMessage] = useState(''); // Pour afficher un message à l'utilisateur

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/security/enable-audit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action }),
            });
            if (response.ok) {
                setMessage('Audit activé avec succès !');
                setAction('');
            } else {
                throw new Error('Erreur lors de l\'activation de l\'audit');
            }
        } catch (error) {
            setMessage('Impossible d\'activer l\'audit.');
            console.error(error);
        }
    };

    return (
        <div className="border border-red-700 rounded-lg shadow-sm">
            <div className="p-4 border-b border-red-700">
                <h3 className="text-red-700 font-semibold text-lg">Activer l'audit</h3>
            </div>
            <div className="p-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Action à auditer"
                        value={action}
                        onChange={(e) => setAction(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-red-700 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
                    >
                        Activer l'audit
                    </button>
                </form>
                {message && <p className="mt-4 text-sm text-red-700">{message}</p>}
            </div>
        </div>
    );
}