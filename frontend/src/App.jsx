import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/*" element={<Layout />} />
          <Route path="/login" element={<LoginPage/>} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
