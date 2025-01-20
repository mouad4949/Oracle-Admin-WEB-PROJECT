import { useState, useEffect } from 'react';
import Navbar from './Component/layout/Navbar';
import DashboardLayout from './Component/layout/DashboardLayout';
import Login from './pages/Login';
import Home from './pages/Home';
import Security from '../src/pages/Security/Home';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Users from "./pages/GestionUsers/Users";
import Roles from "./pages/GestionUsers/Roles";
import Privilige from "./pages/GestionUsers/Privilige";
import SQLTerminal from "./pages/GestionUsers/commandLigne";
import { BackupOperations } from './Component/rman/backup-operations';
import { RestoreOperations } from './Component/rman/restore-operations';
import { BackupHistory } from './Component/rman/backup-history';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import OptimizationPage from './pages/OptimizationPage';
import HighAvailabilityPage from './pages/HighAvailabilityPage';
import Navbar2 from './Component/layout/Navbar2';
import PerformancePage from './pages/PerformancePage';

function App() {
    const location = useLocation();
    const currentPath = location.pathname;
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('jwtToken');

            if (token) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                if (currentPath !== '/login') {
                    navigate('/login');
                }
            }
        };
        checkAuth();
    }, [navigate, currentPath]);

    const RmanDashboard = () => (
        <div className="h-full bg-white p-6">
            <div className="mb-8 ml-auto">
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl font-bold text-red-700">RMAN Dashboard</h1>
                    <p className="text-gray-600">Oracle Recovery Manager Administration</p>
                </div>
            </div>
            <Tabs defaultValue="backup" className="space-y-6">
                <TabsList className="bg-red-50 space-x-2">
                    <TabsTrigger value="backup" className="data-[state=active]:bg-red-700 data-[state=active]:text-white">
                        Backup Operations
                    </TabsTrigger>
                    <TabsTrigger value="restore" className="data-[state=active]:bg-red-700 data-[state=active]:text-white">
                        Restore Operations
                    </TabsTrigger>
                    <TabsTrigger value="history" className="data-[state=active]:bg-red-700 data-[state=active]:text-white">
                        Backup History
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="backup" className="space-y-4">
                    <BackupOperations />
                </TabsContent>
                <TabsContent value="restore" className="space-y-4">
                    <RestoreOperations />
                </TabsContent>
                <TabsContent value="history" className="space-y-4">
                    <BackupHistory />
                </TabsContent>
            </Tabs>
        </div>
    );

    const Performance = () => {
        return (
            <div className="min-h-screen flex flex-col">

                <main className="flex-1">
                    <Routes>
                        <Route path="/" element={<PerformancePage />} />
                        <Route path="/performance/optimization" element={<OptimizationPage />} />
                        <Route path="/high-availability" element={<HighAvailabilityPage />} />
                    </Routes>
                </main>
            </div>
        );
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar currentPath={currentPath} />
            <div className="container flex-1">
                <Routes>
                    <Route
                        path="/"
                        element={isAuthenticated ? <Home /> : <Login />}
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/security" element={<Security />} />
                    <Route path="/rmanDashbord" element={<RmanDashboard />} />
                    <Route path="/performance" element={<Performance />} />
                    <Route path="/optimization" element={<OptimizationPage />} />
                    <Route path="/high-availability" element={<HighAvailabilityPage />} />
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
                                <Login />
                            )
                        }
                    />
                </Routes>
            </div>
        </div>
    );
}

export default App;
