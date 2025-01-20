import { Box, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Flex h="100vh">
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      <Box flex="1" bg="gray.50" overflowY="auto">
        <MainContent />
      </Box>  
    </Flex>
  );
}

export default Layout;