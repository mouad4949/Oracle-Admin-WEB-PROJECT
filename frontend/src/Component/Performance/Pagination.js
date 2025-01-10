import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="mt-4 flex justify-center items-center">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`mx-1 py-1 px-3 border rounded ${
            currentPage === page ? 'bg-blue-500 text-white' : 'border-gray-300'
          }`}
        >
          {page}
        </button>
      ))}
      <span className="mx-2 text-gray-600">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
};

export default Pagination;