import React, { useState } from 'react';
import { TDEForm } from './TDE';
import { VPDForm } from './VPD';
import { AuditForm } from './AUDIT';

export default function Home() {
    const [selectedComponent, setSelectedComponent] = useState(null);

    const renderComponent = () => {
        switch (selectedComponent) {
            case 'TDE':
                return <TDEForm />;
            case 'Audit':
                return <AuditForm />;
            case 'VPD':
                return <VPDForm />;
            default:
                return null;
        }
    };

    return (
        <div className="container mx-auto py-8 p-2">
            <h1 className="text-3xl font-bold mb-8 text-red-700 text-center">
                Gestion de la sécurité de la base de données
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button
                    onClick={() => setSelectedComponent('TDE')}
                    className="hover:shadow-lg transition-shadow border rounded-lg p-6 bg-white text-left w-full"
                >
                    <h3 className="text-xl font-semibold text-red-700 mb-2">TDE</h3>
                    <p>Gérer le chiffrement transparent des données</p>
                </button>

                <button
                    onClick={() => setSelectedComponent('Audit')}
                    className="hover:shadow-lg transition-shadow border rounded-lg p-6 bg-white text-left w-full"
                >
                    <h3 className="text-xl font-semibold text-red-700 mb-2">Audit</h3>
                    <p>Configurer l'audit de la base de données</p>
                </button>

                <button
                    onClick={() => setSelectedComponent('VPD')}
                    className="hover:shadow-lg transition-shadow border rounded-lg p-6 bg-white text-left w-full"
                >
                    <h3 className="text-xl font-semibold text-red-700 mb-2">VPD</h3>
                    <p>Gérer les politiques de base de données virtuelle</p>
                </button>
            </div>

            {/* Affiche le formulaire sélectionné en dessous */}
            <div className="mt-8 p-4">
                {renderComponent()}
            </div>
        </div>
    );
}
