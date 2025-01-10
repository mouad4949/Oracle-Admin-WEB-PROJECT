import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import SlowQueries from '../Component/Optimization/SlowQueries';
import SQLTuningAdvisor from '../Component/Optimization/SQLTuningAdvisor';
import StatisticsScheduler from '../Component/Optimization/StatisticsScheduler';

const OptimizationPage = () => {
  const [activeTab, setActiveTab] = useState('queries');

  const tabs = [
    { 
      id: 'queries', 
      label: 'Slow Queries & SQL Tuning' 
    },
    { 
      id: 'statistics', 
      label: 'Statistics Scheduler' 
    }
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      {/* Header */}
        <div className="flex justify-center items-center ">
          <div className="flex items-center gap-3 mb-8">
            <Settings className="w-8 h-8 text-red-700" />
            <h1 className="text-3xl font-bold text-red-600 text-center ">Database Optimization</h1>
          </div>
         </div>


      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex-1 py-4 px-6 
              text-center font-medium 
              rounded-lg
              transition-all duration-200 
              focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
              ${
                activeTab === tab.id
                  ? 'bg-red-700 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-red-50'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="grid gap-6">
        {activeTab === 'queries' && (
          <div className="space-y-6 animate-fadeIn">
            <SlowQueries />
            <SQLTuningAdvisor />
          </div>
        )}
        {activeTab === 'statistics' && (
          <div className="animate-fadeIn">
            <StatisticsScheduler />
          </div>
        )}
      </div>
    </div>
  );
};

export default OptimizationPage;