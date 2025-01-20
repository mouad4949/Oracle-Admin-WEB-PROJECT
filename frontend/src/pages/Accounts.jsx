import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Heading,
  Text,
  Flex,
  VStack,
  HStack,
  Button,
  Spinner,
  useTheme,
  Icon,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { jwtDecode } from 'jwt-decode';
import { getAccountsbyClientID } from '../api/api';
import { FaCoins, FaChartPie } from 'react-icons/fa';
import { GiMetalBar, GiTwoCoins } from 'react-icons/gi';
import { AccountCard } from '../components/cards/AccountCard';
import { AccountsSummary } from '../components/summaries/AccountsSummary';
import { AccountsChart } from '../components/charts/AccountsChart';
import { MoneyDistributionChart } from '../components/charts/MoneyDistribution';

const MotionBox = motion(Box);

function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [clientId, setClientId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchAccounts = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        const extractedClientId = decodedToken.user_id;
        setClientId(extractedClientId);

        if (extractedClientId) {
          const fetchedAccounts = await getAccountsbyClientID(extractedClientId, token);
          setAccounts(fetchedAccounts);
        }
      } catch (error) {
        console.error('Error decoding token or fetching accounts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  if (isLoading) {
    return (
      <Flex justify="center" align="center" minH="100vh">
        <Spinner size="xl" color="purple.500" />
      </Flex>
    );
  }

  const getAccountTypeIcon = (accountType) => {
    switch (accountType.toLowerCase()) {
      case 'gold':
        return FaCoins;
      case 'titanium':
        return GiMetalBar;
      case 'silver':
        return GiTwoCoins;
      default:
        return FaCoins;
    }
  };

  return (
    <Box p={8} bg="gray.50" minH="100vh">
      <VStack spacing={6} align="stretch">
        {/* Header Section */}
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Grid
            templateColumns={{ base: '1fr', md: '2fr 1fr' }}
            gap={4}
            alignItems="center"
          >
            {/* Title Section */}
            <VStack align="start" spacing={1}>
              <Heading size="xl" bgGradient="linear(to-r, purple.500, pink.500)" bgClip="text">
                Your Accounts
              </Heading>
              <Text color="gray.600" fontSize="md">
                Manage your wealth with ease
              </Text>
            </VStack>

            {/* Buttons and Summary */}
            <HStack spacing={4} justify="flex-end">
              <Button leftIcon={<FaChartPie />} variant="outline" colorScheme="purple">
                Export
              </Button>
              {/* <Button colorScheme="purple" leftIcon={<Icon as={FaCoins} />}>
                Add Account
              </Button> */}
            </HStack>
          </Grid>

          {/* Accounts Summary Positioned Here */}
          <Box mt={4} mb={4}>
            <AccountsSummary accounts={accounts} />
          </Box>
        

        {/* Charts Section */}
        <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
          <AccountsChart accounts={accounts} />
          <MoneyDistributionChart accounts={accounts} />
        </Grid>

        {/* Accounts List Section */}
        <Grid mt={5} templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={4}>
          {accounts.map((account) => (
            <MotionBox
              key={account.id_account}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <AccountCard
                account={account}
                icon={getAccountTypeIcon(account.accountType)}
                theme={theme}
              />
            </MotionBox>
          ))}
        </Grid>
        </MotionBox>
      </VStack>
    </Box>
  );
}

export default Accounts;
