import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';

export const useASHData = () => {
  const [ashData, setASHData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState('sampleTime');
  const [sortDirection, setSortDirection] = useState('desc');

  useEffect(() => {
    const fetchASHData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/performance/ash-reports');
        setASHData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchASHData();
  }, []);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const debouncedSearch = useMemo(
    () => debounce((query) => setSearchQuery(query), 300),
    []
  );

  const filteredAndSortedData = useMemo(() => {
    if (!ashData) return [];
    const searchTerms = searchQuery.toLowerCase().split(" ");
    return ashData
      .filter(ash => {
        return searchTerms.every(term =>
          (ash.sqlId && ash.sqlId.toLowerCase().includes(term)) ||
          (ash.event && ash.event.toLowerCase().includes(term)) ||
          (ash.sessionState && ash.sessionState.toLowerCase().includes(term))
        );
      })
      .sort((a, b) => {
        const aValue = a[sortColumn] || '';
        const bValue = b[sortColumn] || '';
        const comparison = String(aValue).localeCompare(String(bValue));
        return sortDirection === 'asc' ? comparison : -comparison;
      });
  }, [ashData, searchQuery, sortColumn, sortDirection]);

  return {
    ashData: filteredAndSortedData,
    loading,
    error,
    searchQuery,
    sortColumn,
    sortDirection,
    handleSort,
    handleSearch: debouncedSearch,
  };
};

