import React, { useState, useEffect } from 'react';
import api from '../../api/ axios';
import Button from '../Button';
import Loading from '../Loading';
import axios from 'axios';
import { AlertCircle, Clock, Database } from 'lucide-react';

const StatisticsScheduler = () => {
    const [formData, setFormData] = useState({
        jobName: '',
        objectName: '',
        schema: '',
        repeatInterval: 'FREQ=DAILY;BYHOUR=2'
    });
    const [scheduledJobs, setScheduledJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchScheduledJobs();
    }, []);

    const fetchScheduledJobs = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/statistics/scheduled-jobs');
            setScheduledJobs(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSchedule = async (type) => {
        setLoading(true);
        setError(null);
        try {
            await api.post(`/statistics/${type}`, formData);
            await fetchScheduledJobs();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveJob = async (jobName) => {
        setLoading(true);
        try {
            await api.delete(`/statistics/scheduled-jobs/${jobName}`);
            await fetchScheduledJobs();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex items-center gap-2 p-4 border-b border-gray-200">
                <Database className="w-6 h-6 text-red-700" />
                <h2 className="text-xl font-semibold">Statistics Scheduler</h2>
            </div>
            <div className="p-4 space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <input
                        type="text"
                        name="jobName"
                        placeholder="Job Name"
                        value={formData.jobName}
                        onChange={handleInputChange}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    <input
                        type="text"
                        name="objectName"
                        placeholder="Object Name"
                        value={formData.objectName}
                        onChange={handleInputChange}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    <input
                        type="text"
                        name="schema"
                        placeholder="Schema Name"
                        value={formData.schema}
                        onChange={handleInputChange}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    <input
                        type="text"
                        name="repeatInterval"
                        placeholder="Repeat Interval"
                        value={formData.repeatInterval}
                        onChange={handleInputChange}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                </div>

                <div className="flex gap-2">
                    <Button onClick={() => handleSchedule('table-stats')} styleButton={"bg-red-700 text-white"}>
                        Schedule Table Stats
                    </Button>
                    <Button onClick={() => handleSchedule('schema-stats')} styleButton={"bg-red-700 text-white"}>
                        Schedule Schema Stats
                    </Button>
                    <Button onClick={() => handleSchedule('database-stats')} styleButton={"bg-red-700 text-white"}>
                        Schedule Database Stats
                    </Button>
                </div>

                {loading && <Loading />}
                {error && (
                    <div className="flex items-center gap-2 text-red-700">
                        <AlertCircle className="w-5 h-5" />
                        <p>{error}</p>
                    </div>
                )}

                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">Scheduled Jobs</h3>
                    <div className="overflow-x-auto max-h-[500px]">
                        <table className="w-full border-collapse table-fixed">
                            <thead className="bg-gray-50">
                                <tr className="border-b border-gray-200">
                                    <th className="py-3 px-4 text-left font-semibold text-gray-700 w-[150px]">Name</th>
                                    <th className="py-3 px-4 text-left font-semibold text-gray-700 w-[300px]">Action</th>
                                    <th className="py-3 px-4 text-left font-semibold text-gray-700 w-[150px]">Start Date</th>
                                    <th className="py-3 px-4 text-left font-semibold text-gray-700 w-[150px]">Repeat Interval</th>
                                    <th className="py-3 px-4 text-left font-semibold text-gray-700 w-[100px]">Status</th>
                                    <th className="py-3 px-4 text-left font-semibold text-gray-700 w-[100px]">Actions</th>
                                    
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {scheduledJobs.map((job, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="py-3 px-4  overflow-hidden text-ellipsis whitespace-nowrap w-[150px]">{job.jobName}</td>
                                        <td className="py-3 px-4 w-[300px] break-words">{job.jobAction || '-'}</td>
                                        <td className="py-3 px-4 w-[150px] whitespace-nowrap">{job.startTime ? new Date(job.startTime).toLocaleString() : '-'}</td>
                                        <td className="py-3 px-4 w-[150px] whitespace-nowrap">{job.repeatInterval || '-'}</td>
                                        <td className="py-3 px-4 w-[100px] whitespace-nowrap">
                                            <span className={`px-2 py-1 rounded-full text-sm ${job.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                {job.enabled ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 w-[100px]">
                                            <button onClick={() => handleRemoveJob(job.jobName)} className="text-red-700 hover:text-red-800 focus:outline-none">
                                                Remove
                                            </button>
                                        </td>
                                       
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatisticsScheduler;