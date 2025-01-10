import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import Loading from '../Loading';

const MAX_DATA_POINTS = 30;

const OracleMetricsDashboard = () => {
  const [metricsHistory, setMetricsHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/performance/resource-usage');
        const newData = {
          ...response.data,
          physicalReadBytes: response.data.physicalReadBytes / (1024 * 1024),
          physicalWriteBytes: response.data.physicalWriteBytes / (1024 * 1024),
          timestamp: new Date(response.data.timestamp).toLocaleTimeString()
        };

        setMetricsHistory(prev => {
          const updated = [...prev, newData];
          return updated.slice(-MAX_DATA_POINTS);
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <Loading />;
  if (error) return (
    <div className="p-4 bg-red-50 rounded-lg">
      <p className="text-red-500">Error: {error}</p>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Oracle Database Metrics</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CPU et Mémoire */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-semibold mb-4">CPU & Memory Usage</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metricsHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="cpuUsage" 
                  name="CPU Usage (%)" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="memoryUsage" 
                  name="Memory Usage (%)" 
                  stroke="#dc2626" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* I/O Wait Time */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-semibold mb-4">I/O Wait Time</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metricsHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="ioWaitTime" 
                  name="I/O Wait Time (ms)" 
                  stroke="#0891b2" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Physical Read/Write */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Physical I/O (MB)</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metricsHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="physicalReadBytes" 
                  name="Physical Read (MB)" 
                  stroke="#059669" 
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="physicalWriteBytes" 
                  name="Physical Write (MB)" 
                  stroke="#9333ea" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Current Values */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Current Metrics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-600">CPU Usage</p>
              <p className="text-2xl font-bold text-blue-900">
                {metricsHistory[metricsHistory.length - 1]?.cpuUsage.toFixed(2)}%
              </p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="text-sm text-red-600">Memory Usage</p>
              <p className="text-2xl font-bold text-red-900">
                {metricsHistory[metricsHistory.length - 1]?.memoryUsage.toFixed(2)}%
              </p>
            </div>
            <div className="p-4 bg-cyan-50 rounded-lg">
              <p className="text-sm text-cyan-600">I/O Wait Time</p>
              <p className="text-2xl font-bold text-cyan-900">
                {metricsHistory[metricsHistory.length - 1]?.ioWaitTime.toFixed(2)} ms
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-600">Physical Read</p>
              <p className="text-2xl font-bold text-purple-900">
                {metricsHistory[metricsHistory.length - 1]?.physicalReadBytes.toFixed(2)} MB
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OracleMetricsDashboard;