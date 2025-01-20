import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import { ChevronRight, Database, Users, Shield, BarChart3, Zap, Cloud } from 'lucide-react';
function Home(){

    const modules = [
        {
            title: "Gestion des Utilisateurs",
            icon: <Users className="w-6 h-6" />,
            description: "Gérez les utilisateurs Oracle, les rôles, les privilèges et les politiques de mot de passe"
        },
        {
            title: "Sauvegarde et Restauration",
            icon: <Database className="w-6 h-6" />,
            description: "Effectuez des sauvegardes RMAN, consultez l'historique et planifiez des sauvegardes automatiques"
        },
        {
            title: "Sécurité des Données",
            icon: <Shield className="w-6 h-6" />,
            description: "Configurez le chiffrement TDE, les audits et la Virtual Private Database"
        },
        {
            title: "Surveillance des Performances",
            icon: <BarChart3 className="w-6 h-6" />,
            description: "Visualisez les rapports AWR/ASH et surveillez les ressources en temps réel"
        },
        {
            title: "Optimisation",
            icon: <Zap className="w-6 h-6" />,
            description: "Optimisez les requêtes avec SQL Tuning Advisor et gérez les statistiques"
        },
        {
            title: "Haute Disponibilité",
            icon: <Cloud className="w-6 h-6" />,
            description: "Gérez Oracle Data Guard et surveillez la disponibilité du système"
        }
    ];

    return (
        <div className="min-h-screen w-max bg-red-700">
            {/* Hero Section */}
            <header className="py-16 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Administration Oracle Database
                    </h1>
                    <p className="text-xl text-red-100 max-w-3xl mx-auto">
                        Une solution complète pour la gestion, la surveillance et l'optimisation de vos bases de données Oracle
                    </p>
                </div>
            </header>

            {/* Modules Grid */}
            <main className="max-w-7xl mx-auto px-4 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {modules.map((module, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="text-red-700 mb-4">
                                {module.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-red-700 mb-2">
                                {module.title}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {module.description}
                            </p>
                            <button className="flex items-center text-red-700 hover:text-red-800 transition-colors duration-300">
                                En savoir plus <ChevronRight className="w-4 h-4 ml-1" />
                            </button>
                        </div>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-red-800 text-red-100 py-8">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p>&copy; 2025 Oracle Administration Database. Tous droits réservés.</p>
                </div>
            </footer>
        </div>
    );
};



export default Home;