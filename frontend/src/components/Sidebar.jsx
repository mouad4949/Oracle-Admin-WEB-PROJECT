import React, { useEffect, useState } from 'react';
import {
  Box,
  VStack,
  Icon,
  Text,
  Flex,
  IconButton,
  Image,
  Tooltip,
  Divider,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  FiHome,
  FiDollarSign,
  FiCreditCard,
  FiFileText,
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
  FiCompass,
  FiUser,
  FiBell,
  FiLogOut,
  FiHelpCircle,
} from 'react-icons/fi';
import { IoWalletOutline } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const menuItems = [
  { icon: FiHome, text: 'Overview', path: '/overview' },
  { icon: IoWalletOutline, text: 'Accounts', path: '/accounts' },
  { icon: FiDollarSign, text: 'Transactions', path: '/transactions' },
  { icon: FiCreditCard, text: 'Cards', path: '/cards' },
  { icon: FiFileText, text: 'Loans', path: '/loans' },
];

const bottomMenuItems = [
  { icon: FiSettings, text: 'Settings', path: '/settings' }
];

function Sidebar({ isOpen, onToggle }) {
  const [username, setUsername] = useState('');
  const bgColor = useColorModeValue('#392467', '#2D1B50');
  const hoverBgColor = useColorModeValue('#4A307D', '#3D2A6D');
  const activeBgColor = useColorModeValue('#5A3B93', '#4D358D');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.sub || 'User');
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  return (
    <Flex
      bg={bgColor}
      w={isOpen ? '240px' : '90px'}
      transition="width 0.3s ease"
      borderRight="1px"
      borderColor="whiteAlpha.200"
      position="relative"
      flexDir="column"
      height="100vh"
      p={4}
    >
      {/* Toggle Button */}
      <IconButton
        icon={isOpen ? <FiChevronLeft /> : <FiChevronRight />}
        position="absolute"
        right="-12px"
        top="72px"
        borderRadius="full"
        bg={bgColor}
        color="white"
        size="sm"
        onClick={onToggle}
        _hover={{ bg: hoverBgColor }}
        boxShadow="0 2px 6px rgba(0,0,0,0.15)"
        zIndex="1"
      />

      {/* Logo Section */}
      <Flex p={2} align="center" h="60px" transition="all 0.3s" mb={6} w="100%">
        <Image
          src={isOpen ? "/asmas-logo-light.png" : "/asmas-logo-light-cropped.png"} // Conditional image based on isOpen
          h="35px"
          alt="Bank Logo"
        />
      </Flex>


      {/* Main Navigation */}
      <VStack spacing={2} align="stretch" flex={1}>
        {menuItems.map((item) => (
          <Tooltip
            key={item.path}
            label={item.text}
            placement="right"
            isDisabled={isOpen}
            hasArrow
          >
            <Box>
              <NavLink
                to={item.path}
                style={({ isActive }) => ({
                  width: '100%',
                  display: 'block',
                })}
              >
                {({ isActive }) => (
                  <Flex
                    align="center"
                    p={3}
                    cursor="pointer"
                    borderRadius="xl"
                    bg={isActive ? activeBgColor : 'transparent'}
                    color="white"
                    transition="all 0.2s"
                    _hover={{
                      bg: isActive ? activeBgColor : hoverBgColor,
                    }}
                  >
                    <Icon as={item.icon} boxSize={5} />
                    {isOpen && (
                      <Text
                        ml={4}
                        fontSize="sm"
                        fontWeight={isActive ? '600' : 'normal'}
                      >
                        {item.text}
                      </Text>
                    )}
                  </Flex>
                )}
              </NavLink>
            </Box>
          </Tooltip>
        ))}

        <Divider borderColor="whiteAlpha.300" my={4} />

        {/* Bottom Navigation */}
        {bottomMenuItems.map((item) => (
          <Tooltip
            key={item.path}
            label={item.text}
            placement="right"
            isDisabled={isOpen}
            hasArrow
          >
            <Box>
              <NavLink
                to={item.path}
                style={({ isActive }) => ({
                  width: '100%',
                  display: 'block',
                })}
              >
                {({ isActive }) => (
                  <Flex
                    align="center"
                    p={3}
                    cursor="pointer"
                    borderRadius="xl"
                    bg={isActive ? activeBgColor : 'transparent'}
                    color="white"
                    transition="all 0.2s"
                    _hover={{
                      bg: isActive ? activeBgColor : hoverBgColor,
                    }}
                  >
                    <Icon as={item.icon} boxSize={5} />
                    {isOpen && (
                      <Text
                        ml={4}
                        fontSize="sm"
                        fontWeight={isActive ? '600' : 'normal'}
                      >
                        {item.text}
                      </Text>
                    )}
                  </Flex>
                )}
              </NavLink>
            </Box>
          </Tooltip>
        ))}
      </VStack>

      {/* User Profile Section */}
      <Divider borderColor="whiteAlpha.300" my={4} />
      <Menu placement="right-start">
        <MenuButton
          as={Button}
          variant="ghost"
          w="full"
          h="auto"
          p={3}
          color="white"
          _hover={{ bg: hoverBgColor }}
          _active={{ bg: activeBgColor }}
        >
          <Flex align="center">
            <Avatar
              size="sm"
              name={username}
              bg="purple.500"
            />
            {isOpen && (
              <Text fontSize="sm" fontWeight="medium" ml={3}>
                {username.toLowerCase()}
              </Text>
            )}
          </Flex>
        </MenuButton>
        <MenuList>
          <MenuItem icon={<FiLogOut />} color="red.500">
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}

export default Sidebar;
