import { 
  Table, 
  Thead, 
  Tbody, 
  Tr, 
  Th, 
  Td, 
  Badge,
  Input,
  Select,
  HStack,
  Box,
} from '@chakra-ui/react';
import { useState } from 'react';

function TransactionTable({ transactions }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const filteredTransactions = transactions
    .filter((transaction) => {
      const matchesSearch = transaction.description.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === 'all' || transaction.type === filter;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (!sortColumn) return 0;
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];
      if (typeof valueA === 'string') {
        return sortOrder === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
    });

  return (
    <Box>
      <HStack spacing={4} justify="space-between" mb={4}>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          maxW="200px"
          border="none"
          borderBottom="1px"
          borderRight="1px"
          borderRadius="0"
          borderBottomColor="gray.200"
          borderRightColor="gray.200"
          borderBottomRightRadius='md'
          _focus={{ boxShadow: 'none', borderBottomColor: 'gray.200', borderRightColor: 'gray.200' }}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </Select>
        <Input
          textAlign="left"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          maxW="300px"
          border="none"
          borderBottom="1px"
          borderLeft="1px"
          borderRadius="0"
          borderBottomColor="gray.200"
          borderLeftColor="gray.200"
          borderBottomLeftRadius='md'
          _focus={{ boxShadow: 'none', borderBottomColor: 'gray.200', borderLeftColor: 'gray.200' }}
        />
      </HStack>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th cursor="pointer" onClick={() => handleSort('date')}>
              Date {sortColumn === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
            </Th>
            <Th cursor="pointer" onClick={() => handleSort('description')}>
              Description {sortColumn === 'description' && (sortOrder === 'asc' ? '↑' : '↓')}
            </Th>
            <Th cursor="pointer" onClick={() => handleSort('amount')}>
              Amount {sortColumn === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}
            </Th>
            <Th cursor="pointer" onClick={() => handleSort('type')}>
              Type {sortColumn === 'type' && (sortOrder === 'asc' ? '↑' : '↓')}
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredTransactions.map((transaction) => (
            <Tr 
              key={transaction.id}
              _hover={{ bg: 'gray.50' }}
              cursor="pointer"
            >
              <Td>{transaction.date}</Td>
              <Td>{transaction.description}</Td>
              <Td color={transaction.amount > 0 ? 'green.500' : 'red.500'}>
                ${Math.abs(transaction.amount).toFixed(2)}
              </Td>
              <Td>
                <Badge colorScheme={transaction.type === 'income' ? 'green' : 'red'}>
                  {transaction.type}
                </Badge>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default TransactionTable;
