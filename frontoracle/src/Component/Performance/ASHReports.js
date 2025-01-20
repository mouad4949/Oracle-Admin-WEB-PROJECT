import React, { useState, useCallback } from 'react';
import { useASHData } from '../hooks/useASHData';
import ASHTableHeader from './ASHTableHeader';
import Pagination from './Pagination';

const ASHReports = () => {
  const {
    ashData,
    loading,
    error,
    searchQuery,
    sortColumn,
    sortDirection,
    handleSort,
    handleSearch,
  } = useASHData();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentASHData = ashData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(ashData.length / itemsPerPage);

  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);

  if (loading) return <div className="p-4">Chargement...</div>;
  if (error) return <div className="p-4 text-red-500">Erreur : {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Rapports ASH</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher par SQL ID, Événement ou État de session"
          onChange={(e) => handleSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 w-full md:w-1/3"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full leading-normal border-collapse border border-gray-300">
          <ASHTableHeader
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            handleSort={handleSort}
          />
          <tbody>
            {currentASHData.map((ash, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="p-2 text-left">{new Date(ash.sampleTime).toLocaleString()}</td>
                <td className="p-2 text-left">{ash.sqlId || '-'}</td>
                <td className="p-2 text-left">{ash.event || '-'}</td>
                <td className="p-2 text-left">{ash.sessionState || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ASHReports;

