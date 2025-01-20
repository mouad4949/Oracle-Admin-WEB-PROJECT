import { 
  Box, 
  Flex, 
  IconButton, 
  Input, 
  InputGroup, 
  InputLeftElement,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  HStack
} from '@chakra-ui/react';
import { FiSearch, FiUser, FiLogOut, FiSettings } from '../icons';
import NotificationCenter from '../notifications/NotificationCenter';

function Header() {
  return (
    <Box bg="white" px={8} py={4} borderBottom="1px" borderColor="gray.200">
      <Flex justify="space-between" align="center">
        <InputGroup maxW="400px">
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.300" />
          </InputLeftElement>
          <Input placeholder="Search transactions, cards..." />
        </InputGroup>

        <HStack spacing={4}>
          <NotificationCenter />
          
          <Menu>
            <MenuButton>
              <HStack spacing={3}>
                <Avatar size="sm" name="John Doe" src="/avatar.jpg" />
                <Box display={{ base: 'none', md: 'block' }}>
                  <Text fontWeight="medium">John Doe</Text>
                  <Text fontSize="xs" color="gray.500">Premium Account</Text>
                </Box>
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem icon={<FiUser />}>Profile</MenuItem>
              <MenuItem icon={<FiSettings />}>Settings</MenuItem>
              <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  );
}

export default Header;