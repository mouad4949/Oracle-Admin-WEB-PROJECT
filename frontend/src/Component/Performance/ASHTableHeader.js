import React from 'react';

const ASHTableHeader = ({ sortColumn, sortDirection, handleSort }) => {
  const headers = [
    { key: 'sampleTime', label: 'Time' },
    { key: 'sqlId', label: 'SQL ID' },
    { key: 'event', label: 'Event' },
    { key: 'sessionState', label: 'Session State' },
  ];

  return (
    <thead>
      <tr className="bg-gray-100 border-b border-gray-300">
        {headers.map(({ key, label }) => (
          <th
            key={key}
            onClick={() => handleSort(key)}
            className="p-2 text-left font-semibold border-r border-gray-300 cursor-pointer"
          >
            {label}{' '}
            {sortColumn === key && (sortDirection === 'asc' ? '▲' : '▼')}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default ASHTableHeader;
