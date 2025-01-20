import { Link } from 'react-router-dom';

const Navbar = ({ currentPath = '/' }) => {
    return (
        <nav className="bg-red-700 shadow">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="text-xl font-bold text-white">
                                Logo
                            </Link>
                        </div>
                        <div className="ml-6 flex space-x-8">
                            <Link
                                to="/"
                                className={`inline-flex items-center px-1 pt-1 ${
                                    currentPath === '/'
                                        ? 'text-white border-b-2 border-white'
                                        : 'text-white hover:text-gray-200'
                                }`}
                            >
                                Accueil
                            </Link>
                            <Link
                                to="/gestionUsers"
                                className={`inline-flex items-center px-1 pt-1 ${
                                    currentPath.startsWith('/gestionUsers')
                                        ? 'text-white border-b-2 border-white'
                                        : 'text-white hover:text-gray-200'
                                }`}
                            >
                                Gestion Users
                            </Link>
                            <Link
                                to="/security"
                                className={`inline-flex items-center px-1 pt-1 ${
                                    currentPath.startsWith('/security')
                                        ? 'text-white border-b-2 border-white'
                                        : 'text-white hover:text-gray-200'
                                }`}
                            >
                                Sécurité DB
                            </Link>
                            <Link
                                to="/rmanDashbord"
                                className={`inline-flex items-center px-1 pt-1 ${
                                    currentPath.startsWith('/rmanDashbord')
                                        ? 'text-white border-b-2 border-red-700'
                                        : 'text-white'
                                }`}
                            >
                                RMAN
                            </Link>
                            <Link
                                to="/performance"
                                className={`inline-flex items-center px-1 pt-1 ${
                                    currentPath.startsWith('/performance')
                                        ? 'text-white border-b-2 border-red-700'
                                        : 'text-white'
                                }`}
                            >
                                Performance
                            </Link>

                            <Link
                                to="/optimization"
                                className={`inline-flex items-center px-1 pt-1 ${
                                    currentPath.startsWith('/performance')
                                        ? 'text-white border-b-2 border-red-700'
                                        : 'text-white'
                                }`}
                            >
                                Optimization
                            </Link>
                            <Link
                                to="/high-availability"
                                className={`inline-flex items-center px-1 pt-1 ${
                                    currentPath.startsWith('/performance')
                                        ? 'text-white border-b-2 border-red-700'
                                        : 'text-white'
                                }`}
                            >
                                high availability
                            </Link>
                        </div>
                    </div>
                    {/*<div className="flex items-center">*/}
                    {/*    <Link*/}
                    {/*        to="/login"*/}
                    {/*        className="ml-6 inline-flex items-center px-4 py-2 border border-white text-sm font-medium rounded-md text-red-700 bg-white hover:bg-gray-100"*/}
                    {/*    >*/}
                    {/*        Connexion*/}
                    {/*    </Link>*/}
                    {/*</div>*/}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;