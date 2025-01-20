import React from 'react';

const Button = ({ children, onClick, styleButton }) => {
    return (
       <button className={`${styleButton} bg-red-700 hover:bg-red-800 text-white  font-bold py-2 px-4 rounded m-1 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed`} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;