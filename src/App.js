import {useState,useEffect} from 'react';
import Navbar from './Component/layout/Navbar';
import DashboardLayout from './Component/layout/DashboardLayout';
import Login from './pages/Login';
import Home from './pages/Home';

import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Users from "./pages/GestionUsers/Users";
import Roles from "./pages/GestionUsers/Roles";
import Privilige from "./pages/GestionUsers/Privilige";
import SQLTerminal from "./pages/GestionUsers/commandLigne";
    function App() {
        const location = useLocation();
        const currentPath = location.pathname;
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const navigate = useNavigate();

        useEffect(() => {
            const checkAuth = async () => {
                const token = localStorage.getItem('jwtToken');

                if(token){
                    setIsAuthenticated(true);
                }else{
                    setIsAuthenticated(false);
                    if(currentPath !== '/login'){
                        navigate('/login');
                    }
                }
            };
            checkAuth();
        }, [navigate, currentPath]);



        return (
            <div>
                <Navbar currentPath={currentPath} />
                <div className="container mx-auto mt-8 p-4">
                    <Routes>
                        <Route
                            path="/"
                            element={isAuthenticated ? <Home /> : <Login />} // Redirection basée sur l'authentification
                        />
                        <Route path="/login" element={<Login  />} />
                        <Route
                            path="/gestionUsers/*"
                            element={
                                isAuthenticated ? (
                                    <DashboardLayout currentPath={currentPath}>
                                        <Routes>
                                            <Route path="" element={<Users />} />
                                            <Route path="roles" element={<Roles />} />
                                            <Route path="privilige" element={<Privilige />} />
                                            <Route path="sqlplus" element={<SQLTerminal />} />
                                        </Routes>
                                    </DashboardLayout>
                                ) : (
                                    <Login  /> // Redirection vers login si non authentifié
                                )
                            }
                        />
                    </Routes>
                </div>
            </div>
        );
    }
        export default App;




