import React from 'react';
import DataGuardStatus from '../Component/HighAvailability/DataGuardStatus';
import FailoverSimulation from '../Component/HighAvailability/FailoverSimulation';

const HighAvailabilityPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 md:p-8 flex flex-col items-center">
            <div className="max-w-screen-2xl w-full">
              <h1 className="text-3xl font-semibold mb-6 text-red-700 text-center">High Availability</h1>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
                       <DataGuardStatus />
                    </div>
                   <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
                        <FailoverSimulation />
                    </div>
              </div>
            </div>
        </div>
    );
};

export default HighAvailabilityPage;