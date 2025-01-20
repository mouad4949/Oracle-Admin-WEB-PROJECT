import { useEffect, useState } from 'react';
import { 
  Box, 
  VStack, 
  Text, 
  HStack, 
  Icon, 
  Button 
} from '@chakra-ui/react';
import { FiArrowUpRight, FiArrowDownLeft } from 'react-icons/fi';
import { getAccountsbyClientID, getTransactionsByCompteId } from '../../api/api'; // Assuming these functions are defined in your API module
import { jwtDecode } from 'jwt-decode'; // Ensure correct version of jwt-decode is installed

function RecentTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [clientId, setClientId] = useState(null);

  useEffect(() => {
    const fetchClientData = async () => {
      const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const decodedToken = jwtDecode(token); // Decode the token
        const extractedClientId = decodedToken.user_id; // Extract user_id from token
        setClientId(extractedClientId);

        if (extractedClientId) {
          // Fetch accounts by client ID
          const accounts = await getAccountsbyClientID(extractedClientId);

          if (accounts.length > 0) {
            const transactionsPromises = accounts.map((account) =>
              getTransactionsByCompteId(account.id_account)
            );

            // Wait for all transactions to be fetched
            const transactionsArrays = await Promise.all(transactionsPromises);
            const allTransactions = transactionsArrays.flat();
            console.log(allTransactions);
            // Sort transactions by date in descending order
            const sortedTransactions = allTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

            // Limit to the first 6 transactions
            setTransactions(sortedTransactions.slice(0, 6));
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchClientData();
  }, []);

  return ( 
    <Box p={2} borderRadius="lg">
      <VStack spacing={4} align="stretch">
        {transactions.map(transaction => (
          <HStack 
            key={transaction.id} 
            justify="space-between"
            p={1}
            borderRadius="md"
            _hover={{ bg: 'gray.50' }}
            cursor="pointer"
          >
            <HStack spacing={3}>
              <Icon 
                as={transaction.amount > 0 ? FiArrowDownLeft : FiArrowUpRight}
                color={transaction.amount > 0 ? 'green.500' : 'red.500'}
                boxSize={5}
              />
              <Box textAlign="left">
                <Text fontWeight="medium">{transaction.description}</Text>
                <Text fontSize="sm" color="gray.500">{new Date(transaction.date).toLocaleString()}</Text>
              </Box>
            </HStack>
            <Text 
              fontWeight="medium"
              color={transaction.amount > 0 ? 'green.500' : 'red.500'}
            >
              {transaction.amount > 0 ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
            </Text>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
}

export default RecentTransactions;
