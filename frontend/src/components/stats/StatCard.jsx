import { Stat, StatLabel, StatNumber, Box, Icon } from '@chakra-ui/react';

function StatCard({ icon, color, label, value, type, ...props }) {
  return (
    <Box
      bg="white" 
      borderRadius="lg" 
      shadow="sm" 
      p={6} 
      transition="transform 0.3s ease"
      // _hover={{ transform: 'translateY(-6px)', shadow: 'xl', bg: 'gray.50' }}
      border="1px" borderColor="gray.200"
      {...props}
    >
      <Stat>
        <Icon as={icon} color='#392467' boxSize={5}/>
        <StatNumber className="stat-number" fontSize="35" fontWeight="bold">{value}</StatNumber>
        <StatLabel className="stat-label" fontSize="sm" color="gray.600" fontWeight="medium">{label}</StatLabel>
      </Stat>
    </Box>
  );
}

export default StatCard;
