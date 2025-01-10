// Navbar.js
import { Link } from 'react-router-dom';

const Navbar = ({  currentPath = '/' }) => {
    return (
        <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link
                                to="/"
                                className="text-xl font-bold text-blue-600"
                            >
                                Logo
                            </Link>
                        </div>
                        <div className="ml-6 flex space-x-8">
                            <Link
                                to="/"
                                className={`inline-flex items-center px-1 pt-1 ${
                                    currentPath === '/'
                                        ? 'text-blue-600 border-b-2 border-blue-600'
                                        : 'text-gray-900'
                                }`}
                            >
                                Accueil
                            </Link>
                            <Link
                                to="/gestionUsers"
                                className={`inline-flex items-center px-1 pt-1 ${
                                    currentPath.startsWith('/gestionUsers')
                                        ? 'text-blue-600 border-b-2 border-blue-600'
                                        : 'text-gray-900'
                                }`}
                            >
                                Gestion Uesrs
                            </Link>
                            <Link
                                to="/rmanDashbord"
                                className={`inline-flex items-center px-1 pt-1 ${
                                    currentPath.startsWith('/rmanDashbord')
                                        ? 'text-blue-600 border-b-2 border-blue-600'
                                        : 'text-gray-900'
                                }`}
                            >
                                 RMAN
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Link
                            to="/login"
                            className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                            Connexion
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;