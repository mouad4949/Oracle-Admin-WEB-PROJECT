import React, { useState } from 'react';
import api from '../../api/axios';
import Button from '../Button';
import Loading from '../Loading';
import axios from 'axios';

const FailoverSimulation = () => {
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSimulateFailover = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:8080/api/ha/simulate-failover');
            setMessage(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleSimulateFailback = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/ha/simulate-failback');
            setMessage(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    if (loading) return <Loading />;
    if (error) return <p className="text-red-500 p-4">Error: {error}</p>;

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Data Guard Simulation</h2>
            <div className="flex flex-wrap gap-2 items-center">
                <Button onClick={handleSimulateFailover} styleButton={"bg-red-700 text-white"}>Simulate Failover</Button>
                <Button onClick={handleSimulateFailback} styleButton={"bg-red-700 text-white"}>Simulate Failback</Button>
            </div>
            {message && <p className="mt-4 text-green-600 font-semibold">{message}</p>}
        </div>
    );
};

export default FailoverSimulation;