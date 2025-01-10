import React, { useState } from 'react';
import api from '../../api/ axios';
import Button from '../Button';
import Loading from '../Loading';
import axios from 'axios';
import { AlertCircle, Settings } from 'lucide-react';

const SQLTuningAdvisor = () => {
    const [sqlId, setSqlId] = useState('');
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleRunTuningAdvisor = async () => {
        if (!sqlId.trim()) return;
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:8080/api/optimization/sql-tuning-advisor?sqlId=${sqlId}`);
            setReport(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex items-center gap-2 p-4 border-b border-gray-200">
          <Settings className="w-6 h-6 text-red-700" />
          <h2 className="text-xl font-semibold">SQL Tuning Advisor</h2>
        </div>
        <div className="p-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2 items-center">
              <input
                type="text"
                placeholder="Enter SQL ID"
                value={sqlId}
                onChange={(e) => setSqlId(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
              <Button onClick={handleRunTuningAdvisor} disabled={loading || !sqlId.trim()}>
               Run Analysis
              </Button>
            </div>
             {loading && <Loading />}
              {error && (
                 <div className="flex items-center gap-2 text-red-700">
                  <AlertCircle className="w-5 h-5" />
                 <p>{error}</p>
              </div>
           )}
          {report && (
             <div className="mt-4">
               <h3 className="text-lg font-semibold mb-2">Tuning Report</h3>
                  <pre className="p-4 bg-gray-50 rounded-md border border-gray-200 overflow-x-auto font-mono text-sm whitespace-pre-wrap">
                    {report}
                   </pre>
                </div>
             )}
         </div>
        </div>
    </div>
    );
};
export default SQLTuningAdvisor;