import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar2 = () => {
  const location = useLocation();
  
  return (
    <nav className="bg-red-700 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-around">

        <Link 
          to="/" 
          className={`text-white hover:text-red-200 transition-colors duration-200 font-medium px-3 py-2 rounded-md ${
            location.pathname === '/performance' ? 'bg-red-800' : ''
          }`}
        >
          Performance
        </Link>
        
        <Link 
          to="/performance/optimization"
          className={`text-white hover:text-red-200 transition-colors duration-200 font-medium px-3 py-2 rounded-md ${
            location.pathname === '/performance/optimization' ? 'bg-red-800' : ''
          }`}
        >
          Optimization
        </Link>
        
        <Link 
          to="/performance/high-availability"
          className={`text-white hover:text-red-200 transition-colors duration-200 font-medium px-3 py-2 rounded-md ${
            location.pathname === '/performance/high-availability' ? 'bg-red-800' : ''
          }`}
        >
          High Availability
        </Link>
      </div>
    </nav>
  );
};

export default Navbar2;