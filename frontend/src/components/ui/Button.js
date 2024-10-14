// src/components/ui/Button.js
import React from 'react';

export const Button = ({ children, onClick, ...props }) => (
  <button
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    onClick={onClick}
    {...props}
  >
    {children}
  </button>
);
