import React from 'react';

const Navbar = ({ onSearch, toggleDarkMode, darkMode }) => {
  return (
    <div className="navbar">
      <input 
        type="text" 
        placeholder="Search..." 
        onChange={(e) => onSearch(e.target.value)}
      />
      <button onClick={toggleDarkMode}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </div>
  );
};

export default Navbar;