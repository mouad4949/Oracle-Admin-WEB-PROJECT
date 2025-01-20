import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const OverviewButton = ({ to, children, ...props }) => {
  return (
    <Button
      as={Link}
      to={to}
      size="md"
      variant="outline"
      borderColor="#392467"
      color="#392467"
      _hover={{
        backgroundColor: '#392467',
        color: 'gray.100',
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default OverviewButton;
