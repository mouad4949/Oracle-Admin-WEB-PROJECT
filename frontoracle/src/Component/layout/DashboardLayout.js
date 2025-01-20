import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const DashboardLayout = ({ children, currentPath = '/gestionUsers' }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="h-screen flex flex-col">


            {/* Main Content Area with Sidebar */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div
                    className={`${
                        isSidebarOpen ? 'w-64' : 'w-20'
                    } transition-width duration-300 ease-in-out bg-red-700 shadow-md`}
                >
                    <div className="h-full flex flex-col">
                        <div className="flex items-center justify-between h-16 px-4">
                            <span className="text-lg font-bold text-white">
                                Menu
                            </span>
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="text-white hover:text-gray-200"
                            >
                                {isSidebarOpen ? '←' : '→'}
                            </button>
                        </div>
                        <nav className="flex-1 space-y-1 px-2 py-4">
                            <Link
                                to="/gestionUsers"
                                className={`flex items-center w-full px-2 py-2 text-left rounded-md ${
                                    currentPath === '/gestionUsers'
                                        ? 'bg-white text-red-700'
                                        : 'text-white hover:bg-red-600'
                                }`}
                            >
                                <span>Users</span>
                            </Link>
                            <Link
                                to="/gestionUsers/roles"
                                className={`flex items-center w-full px-2 py-2 text-left rounded-md ${
                                    currentPath === '/gestionUsers/roles'
                                        ? 'bg-white text-red-700'
                                        : 'text-white hover:bg-red-600'
                                }`}
                            >
                                <span>ROLES</span>
                            </Link>
                            <Link
                                to="/gestionUsers/privilige"
                                className={`flex items-center w-full px-2 py-2 text-left rounded-md ${
                                    currentPath === '/gestionUsers/privilege'
                                        ? 'bg-white text-red-700'
                                        : 'text-white hover:bg-red-600'
                                }`}
                            >
                                <span>Privilége</span>
                            </Link>
                            <Link
                                to="/gestionUsers/sqlplus"
                                className={`flex items-center w-full px-2 py-2 text-left rounded-md ${
                                    currentPath === '/gestionUsers/sqlplus'
                                        ? 'bg-white text-red-700'
                                        : 'text-white hover:bg-red-600'
                                }`}
                            >
                                <span>SQLPLUS</span>
                            </Link>
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-auto bg-gray-100">
                    <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
                        <div className="py-6">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                                {children}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;