import React, { useState, useEffect } from 'react';

import Loading from '../Loading';
import axios from 'axios';
import { AlertCircle, Clock } from 'lucide-react';

const SlowQueries = () => {
    const [slowQueries, setSlowQueries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSlowQueries = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/optimization/slow-queries');
                setSlowQueries(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchSlowQueries();
    }, []);

    if (loading) return <Loading />;
    if (error) return (
        <div className="bg-red-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 text-red-700">
                <AlertCircle className="w-5 h-5" />
                <p>Error: {error}</p>
            </div>
        </div>
    );

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex items-center gap-2 p-4 border-b border-gray-200">
                <Clock className="w-6 h-6 text-red-700" />
                <h2 className="text-xl font-semibold">Slow Queries</h2>
            </div>
            <div className="p-4">
                {!slowQueries || slowQueries.length === 0 ? (
                    <p className="text-gray-500">No slow queries detected</p>
                ) : (
                    <div className="overflow-x-auto max-h-[300px]">
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-50">
                                <tr className="border-b border-gray-200">
                                    <th className="py-3 px-4 text-left font-semibold text-gray-700">SQL ID</th>
                                    <th className="py-3 px-4 text-left font-semibold text-gray-700">SQL Full Text</th>
                                    <th className="py-3 px-4 text-left font-semibold text-gray-700">Elapsed Time (s)</th>
                                    <th className="py-3 px-4 text-left font-semibold text-gray-700">Last Active Time</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {slowQueries.map((query, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="py-3 px-4 font-mono text-sm">{query.sqlId}</td>
                                        <td className="py-3 px-4 font-mono text-sm break-all">{query.sqlText}</td>
                                         <td className="py-3 px-4 font-mono text-sm">{query.elapsedSeconds.toFixed(2)}</td>
                                        <td className="py-3 px-4 font-mono text-sm"> {new Date(query.lastActiveTime).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};
export default SlowQueries;