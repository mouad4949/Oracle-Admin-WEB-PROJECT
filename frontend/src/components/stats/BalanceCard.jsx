import { Stat, StatLabel, StatNumber, Box, Icon } from '@chakra-ui/react';

function BalanceCard({ icon, color, label, value, type, ...props }) {
  return (
    <Box
      bg="#392467" 
      borderRadius="lg" 
      shadow="sm" 
      p={6} 
      transition="transform 0.3s ease"
    //   _hover={{ transform: 'translateY(-6px)', shadow: 'xl', bg: 'gray.50' }}
      border="1px" borderColor="gray.200"
      {...props}
    >
      <Stat>
        {/* <Icon as={icon} color='#392467' boxSize={5}/> */}
        <StatNumber className="stat-number" fontSize="50" fontWeight="bold" color='gray.200'>{value}</StatNumber>
        <StatLabel className="stat-label" fontSize="md" color="gray.200" fontWeight="medium">{label}</StatLabel>
      </Stat>
    </Box>
  );
}

export default BalanceCard;
