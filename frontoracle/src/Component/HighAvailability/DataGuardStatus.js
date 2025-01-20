import React, { useState, useEffect } from 'react';
import Loading from '../Loading';
import axios from 'axios';
const DataGuardStatus = () => {
    const [dataGuardStatus, setDataGuardStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDataGuardStatus = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/ha/data-guard-status');
                setDataGuardStatus(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchDataGuardStatus();
    }, []);

  if (loading) return <Loading />;
  if (error) return (
      <div className="bg-red-50 p-4 rounded-lg">
        <p className="text-red-500">Error: {error}</p>
        </div>
    );
     if (!dataGuardStatus) {
       return <p className="p-4 text-gray-600">No Data Guard data available</p>
    }
    return (
      <div className="p-4 w-full"> {/*Added `w-full` here*/}
           <h2 className="text-xl font-semibold mb-4 text-gray-700">Data Guard Status</h2>
         <div className="space-y-2">
           <p className="text-gray-700">
               <span className="font-medium">Role:</span> {dataGuardStatus.role}
            </p>
            <p className="text-gray-700">
                <span className="font-medium">Protection Mode:</span> {dataGuardStatus.protectionMode}
            </p>
            <p className="text-gray-700">
               <span className="font-medium">Transport Lag:</span> {dataGuardStatus.transportLag}
            </p>
             <p className="text-gray-700">
                <span className="font-medium">Apply Lag:</span> {dataGuardStatus.applyLag}
            </p>
            <p className="text-gray-700">
                <span className="font-medium">Database Mode:</span> {dataGuardStatus.databaseMode}
            </p>
       </div>
     </div>
    );
};

export default DataGuardStatus;