import React, { useState } from 'react';
import AWRReports from '../Component/Performance/AWRReports';
import ASHReports from '../Component/Performance/ASHReports';
import ResourceUsage from '../Component/Performance/ResourceUsage';

const PerformancePage = () => {
    const [activeTab, setActiveTab] = useState('resource');
    const tabs = [
        { id: 'resource', label: 'Resource Usage' },
        { id: 'awr', label: 'AWR Reports' },
        { id: 'ash', label: 'ASH Reports' },
    ];

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="w-full px-4 py-6">
                <h1 className="text-3xl font-bold text-red-600 text-center mb-6">
                    Performance Monitoring
                </h1>
                
                <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="flex flex-wrap gap-2 mb-4 mt-4 mx-4">
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
                    
                    <div className="w-full p-6">
                        {activeTab === 'resource' && (
                            <div className="w-full">
                                
                                <ResourceUsage />
                            </div>
                        )}
                        {activeTab === 'awr' && (
                            <div className="w-full">
                             
                                <AWRReports />
                            </div>
                        )}
                        {activeTab === 'ash' && (
                            <div className="w-full">
                                
                                <ASHReports />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerformancePage;