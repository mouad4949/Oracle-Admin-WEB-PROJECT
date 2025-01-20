import { 
  Box, 
  VStack, 
  Text, 
  Badge, 
  Popover, 
  PopoverTrigger, 
  PopoverContent,
  IconButton,
  HStack
} from '@chakra-ui/react';
import { FiBell } from '../icons';

const notifications = [
  {
    id: 1,
    type: 'transaction',
    message: 'Large transaction detected: $2,500',
    time: '2 minutes ago',
    isRead: false
  },
  {
    id: 2,
    type: 'security',
    message: 'New device login detected',
    time: '1 hour ago',
    isRead: false
  },
  {
    id: 3,
    type: 'bill',
    message: 'Upcoming bill payment: Electricity',
    time: '3 hours ago',
    isRead: true
  }
];

function NotificationCenter() {
  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Box position="relative">
          <IconButton
            aria-label="Notifications"
            icon={<FiBell />}
            variant="ghost"
          />
          {unreadCount > 0 && (
            <Badge
              position="absolute"
              top="-1"
              right="-1"
              colorScheme="red"
              borderRadius="full"
              minW="18px"
              textAlign="center"
            >
              {unreadCount}
            </Badge>
          )}
        </Box>
      </PopoverTrigger>
      <PopoverContent width="350px" p={4}>
        <VStack spacing={3} align="stretch">
          <Text fontWeight="bold">Notifications</Text>
          {notifications.map(notification => (
            <Box
              key={notification.id}
              p={3}
              bg={notification.isRead ? 'white' : 'blue.50'}
              borderRadius="md"
              borderWidth="1px"
              borderColor="gray.200"
            >
              <HStack justify="space-between" mb={1}>
                <Badge colorScheme={
                  notification.type === 'security' ? 'red' :
                  notification.type === 'transaction' ? 'green' : 'blue'
                }>
                  {notification.type}
                </Badge>
                <Text fontSize="xs" color="gray.500">{notification.time}</Text>
              </HStack>
              <Text fontSize="sm">{notification.message}</Text>
            </Box>
          ))}
        </VStack>
      </PopoverContent>
    </Popover>
  );
}

export default NotificationCenter;