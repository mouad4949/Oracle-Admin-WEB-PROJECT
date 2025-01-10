"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { BackupOperations } from "./Component/rman/backup-operations";
import { RestoreOperations } from "./Component/rman/restore-operations";
import { BackupHistory } from "./Component/rman/backup-history";
import HomePage from "./Component/homePage"; // Adjust the path based on your file structure

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  // Navigation component
  const Navigation = () => (
    <nav className="bg-red-800 p-4">
      <div className="max-w-7xl mx-auto flex gap-4">
        <button 
          onClick={() => setCurrentPage("home")}
          className={`text-white px-4 py-2 rounded ${
            currentPage === "home" ? "bg-red-600" : "hover:bg-red-700"
          }`}
        >
          Accueil
        </button>
        <button 
          onClick={() => setCurrentPage("rman")}
          className={`text-white px-4 py-2 rounded ${
            currentPage === "rman" ? "bg-red-600" : "hover:bg-red-700"
          }`}
        >
          RMAN Dashboard
        </button>
      </div>
    </nav>
  );

  // RMAN Dashboard Component (your existing dashboard)
  const RmanDashboard = () => (
    <div className="h-full bg-white p-6">
      <div className="mb-8 ml-auto">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold text-red-700">RMAN Dashboard</h1>
          <p className="text-gray-600">
            Oracle Recovery Manager Administration
          </p>
        </div>
      </div>
      <Tabs defaultValue="backup" className="space-y-6">
        <TabsList className="bg-red-50 space-x-2">
          <TabsTrigger
            value="backup"
            className="data-[state=active]:bg-red-700 data-[state=active]:text-white"
          >
            Backup Operations
          </TabsTrigger>
          <TabsTrigger
            value="restore"
            className="data-[state=active]:bg-red-700 data-[state=active]:text-white"
          >
            Restore Operations
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="data-[state=active]:bg-red-700 data-[state=active]:text-white"
          >
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      {currentPage === "home" ? <HomePage /> : <RmanDashboard />}
    </div>
  );
}