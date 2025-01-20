import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';

const AWRReports = () => {
  const [awrData, setAWRData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeView, setActiveView] = useState('chart');

  useEffect(() => {
    const fetchAWRData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/performance/awr-reports');
        const processedData = response.data.map(item => ({
          ...item,
          formattedTime: new Date(item.captureTime).toLocaleString(),
          cpuUsageSeconds: Number(item.cpuUsageSeconds.toFixed(2))
        }));
        setAWRData(processedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchAWRData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 w-full">
        <Activity className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-4 bg-red-50 rounded-lg">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!awrData || awrData.length === 0) {
    return (
      <div className="w-full p-4 bg-gray-50 rounded-lg">
        <div className="text-gray-500">No AWR data available</div>
      </div>
    );
  }

  const getPerformanceStatus = (cpuUsage) => {
    if (cpuUsage > 30000) return 'text-red-500';
    if (cpuUsage > 20000) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-semibold">AWR Performance Dashboard</h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveView('chart')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeView === 'chart'
                    ? 'bg-red-800 text-white '
                    : 'bg-gray-300 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Chart View
              </button>
              <button
                onClick={() => setActiveView('table')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeView === 'table'
                    ? 'bg-red-800 text-white'
                    : 'bg-gray-300 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Table View
              </button>
            </div>
          </div>

          {activeView === 'chart' ? (
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={awrData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 80 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="formattedTime"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="cpuUsageSeconds"
                    name="CPU Usage (Seconds)"
                    stroke="#6366f1"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Snap ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Capture Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      CPU Usage (s)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Instance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {awrData.map((row) => (
                    <tr key={row.snapId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">{row.snapId}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{row.formattedTime}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{row.cpuUsageSeconds}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{row.instanceNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Activity className={`w-4 h-4 ${getPerformanceStatus(row.cpuUsageSeconds)}`} />
                          <span className={getPerformanceStatus(row.cpuUsageSeconds)}>
                            {row.cpuUsageSeconds > 30000 ? 'High' : row.cpuUsageSeconds > 20000 ? 'Medium' : 'Normal'}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AWRReports;

