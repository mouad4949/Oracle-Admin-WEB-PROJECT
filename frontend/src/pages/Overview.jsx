import {
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  HStack,
  VStack,
  Button,
  Flex,
  Select,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Spinner,
} from '@chakra-ui/react';
import {
  FaArrowAltCircleDown,
  FaArrowAltCircleUp,
  FaChevronDown,
  FaPaperPlane,
  FaDownload,
  FaCreditCard,
  FaPlus,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { FaSackDollar } from 'react-icons/fa6';
import { AiFillDollarCircle } from 'react-icons/ai';
import { BsCashStack } from 'react-icons/bs';
import OverviewChart from '../components/charts/OverviewChart';
import RecentTransactions from '../components/transactions/RecentTransactions';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { getAccountsbyClientID, getTransactionsByCompteId } from '../api/api';

const MotionBox = motion(Box);

const QuickAction = ({ icon: Icon, label, onClick }) => (
  <Button
    variant="ghost"
    p={6}
    w="full"
    h="auto"
    display="flex"
    flexDirection="column"
    gap={2}
    bg="white"
    _hover={{ bg: 'purple.50' }}
    onClick={onClick}
  >
    <Box p={3} borderRadius="xl" bg="purple.100" color="purple.600">
      <Icon size={20} />
    </Box>
    <Text fontSize="sm" color="gray.600">
      {label}
    </Text>
  </Button>
);

function Overview() {
  const bgGradient = useColorModeValue(
    'linear(to-r, purple.600, purple.700)',
    'linear(to-r, purple.700, purple.800)'
  );

  const [totalBalance, setTotalBalance] = useState(null);
  const [accountCount, setAccountCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchAccountsAndTransactions = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No token found');
        }

        const decodedToken = jwtDecode(token);
        const clientId = decodedToken?.user_id;
        if (!clientId) {
          throw new Error('Invalid token: clientId not found');
        }

        // Fetch accounts
        const accounts = await getAccountsbyClientID(clientId, token);
        const balance = accounts.reduce((sum, account) => sum + account.balance, 0);
        setTotalBalance(balance);
        setAccountCount(accounts.length);

        // Fetch transactions for each account
        const allTransactions = [];
        for (const account of accounts) {
          const accountTransactions = await getTransactionsByCompteId(account.id_account, token);
          allTransactions.push(...accountTransactions);
        }

        setTransactions(allTransactions);

        // Calculate totals
        const income = allTransactions
          .filter(transaction => transaction.amount > 0)
          .reduce((sum, transaction) => sum + transaction.amount, 0);

        const expenses = allTransactions
          .filter(transaction => transaction.amount < 0)
          .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);

        setTotalIncome(income);
        setTotalExpenses(expenses);

      } catch (error) {
        console.error('Error fetching accounts and transactions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccountsAndTransactions();
  }, []);

  // Calculate month-over-month changes
  const calculateMonthlyChange = (currentAmount, transactions) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    
    const thisMonthTransactions = transactions.filter(
      t => new Date(t.date).getMonth() === currentMonth
    );
    const lastMonthTransactions = transactions.filter(
      t => new Date(t.date).getMonth() === lastMonth
    );

    const thisMonthTotal = thisMonthTransactions.reduce(
      (sum, t) => sum + Math.abs(t.amount),
      0
    );
    const lastMonthTotal = lastMonthTransactions.reduce(
      (sum, t) => sum + Math.abs(t.amount),
      0
    );

    if (lastMonthTotal === 0) return 0;
    return ((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;
  };

  const incomeChange = calculateMonthlyChange(totalIncome, transactions.filter(t => t.amount > 0));
  const expensesChange = calculateMonthlyChange(totalExpenses, transactions.filter(t => t.amount < 0));

  return (
    <Box p={8} bg="gray.50" minHeight="100vh">
      {/* Header Section */}
      <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
      <Flex direction="row" justify="space-between" align="center" mb={8}>
        <VStack align="start" spacing={1}>
          <Heading size="xl" bgGradient="linear(to-r, purple.500, pink.500)" bgClip="text">
            Overview
          </Heading>
          <Text color="gray.600">Get a snapshot of your financial activity </Text>
        </VStack>
      </Flex>
      

      {/* Main Grid Section */}
      <Grid 
        templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(6, 1fr)" }} 
        templateRows="repeat(4, auto)" 
        gap={6}
      >
        {/* Balance Card */}
        <GridItem colSpan={{ base: 1, md: 3 }} rowSpan={{ base: 1, md: 2 }}>
          <Box
            bgGradient={bgGradient}
            color="white"
            p={6}
            borderRadius="2xl"
            position="relative"
            overflow="hidden"
            h="full"
            _before={{
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage:
                'radial-gradient(circle at 50% -20%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, transparent 80%)',
            }}
          >
            <VStack align="stretch" spacing={4}>
              {isLoading ? (
                <Spinner size="lg" color="white" alignSelf="center" />
              ) : (
                <>
                  <HStack justify="space-between">
                    <Text fontSize="sm" opacity={0.8}>
                      Total Balance
                    </Text>
                    <AiFillDollarCircle size={24} />
                  </HStack>
                  <Heading className="balance-heading">
                    ${totalBalance?.toFixed(2) || '0.00'}
                  </Heading>
                  <Text fontSize="sm" opacity={0.8}>
                    Available in {accountCount} account{accountCount !== 1 ? 's' : ''}
                  </Text>
                </>
              )}
            </VStack>
          </Box>
        </GridItem>

        {/* Stat Cards */}
        <GridItem colSpan={{ base: 1, sm: 1 }} rowSpan={1}>
          <Box bg="white" p={4} borderRadius="xl" boxShadow="sm">
            <VStack align="stretch" spacing={2}>
              <HStack color="green.500">
                <FaArrowAltCircleUp />
                <Text fontSize="sm">Income</Text>
              </HStack>
              <Heading size="lg">${totalIncome.toFixed(2)}</Heading>
              <Text fontSize="xs" color="gray.500">
                {incomeChange > 0 ? '+' : ''}{incomeChange.toFixed(1)}% from last month
              </Text>
            </VStack>
          </Box>
        </GridItem>

        <GridItem colSpan={{ base: 1, sm: 1 }} rowSpan={1}>
          <Box bg="white" p={4} borderRadius="xl" boxShadow="sm">
            <VStack align="stretch" spacing={2}>
              <HStack color="red.500">
                <FaArrowAltCircleDown />
                <Text fontSize="sm">Expenses</Text>
              </HStack>
              <Heading size="lg">${totalExpenses.toFixed(2)}</Heading>
              <Text fontSize="xs" color="gray.500">
                {expensesChange > 0 ? '+' : ''}{expensesChange.toFixed(1)}% from last month
              </Text>
            </VStack>
          </Box>
        </GridItem>

        <GridItem colSpan={{ base: 1, sm: 1 }} rowSpan={1}>
          <Box bg="white" p={4} borderRadius="xl" boxShadow="sm">
            <VStack align="stretch" spacing={2}>
              <HStack color="purple.500">
                <FaSackDollar />
                <Text fontSize="sm">Savings</Text>
              </HStack>
              <Heading size="lg">${(totalIncome - totalExpenses).toFixed(2)}</Heading>
              <Text fontSize="xs" color="gray.500">
                Net savings this period
              </Text>
            </VStack>
          </Box>
        </GridItem>

        {/* Quick Actions */}
        <GridItem colSpan={{ base: 1, md: 3 }}>
          <Grid templateColumns="repeat(auto-fit, minmax(150px, 1fr))" gap={4}>
            <QuickAction icon={FaPaperPlane} label="Send" />
            <QuickAction icon={FaDownload} label="Request" />
            <QuickAction icon={BsCashStack} label="Top Up" />
          </Grid>
        </GridItem>

        {/* Chart Section */}
        <GridItem colSpan={{ base: 1, md: 4 }} rowSpan={{ base: 1, md: 2 }}>
          <Box bg="white" p={6} borderRadius="xl" boxShadow="sm">
            <Flex justify="space-between" align="center" mb={6}>
              <VStack align="start" spacing={1}>
                <Heading size="md">Daily Overview</Heading>
                <Text fontSize="sm" color="gray.500">
                  Income vs Expenses
                </Text>
              </VStack>
            </Flex>
            <Box h="300px">
              <OverviewChart transactions={transactions} />
            </Box>
          </Box>
        </GridItem>

        {/* Recent Transactions */}
        <GridItem colSpan={{ base: 1, md: 2 }} rowSpan={{ base: 1, md: 2 }}>
          <Box bg="white" p={6} borderRadius="xl" boxShadow="sm" h="full">
            <Flex justify="space-between" align="center" mb={6}>
              <VStack align="start" spacing={1}>
                <Heading size="md">Recent Transactions</Heading>
                <Text fontSize="sm" color="gray.500">
                  Last 6 transactions
                </Text>
              </VStack>
              <Button as={Link} to="/transactions" variant="ghost" size="sm" colorScheme="purple">
                View All
              </Button>
            </Flex>
            <RecentTransactions transactions={transactions} />
          </Box>
        </GridItem>
      </Grid>
      </MotionBox>
    </Box>
  );
}

export default Overview;
