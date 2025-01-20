import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    gold: {
      50: '#FFF9E6',
      100: '#FFF0BF',
      500: '#FFD700',
      600: '#E6C200',
    },
    titanium: {
      50: '#F7FAFC',
      100: '#EDF2F7',
      500: '#718096',
      600: '#4A5568',
    },
    silver: {
      50: '#F8FAFC',
      100: '#F1F5F9',
      500: '#94A3B8',
      600: '#64748B',
    },
  },
});

export default theme;

