import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import EmployeeList from './EmployeeList';
import GroupList from './GroupList';
import Settings from './SettingsDash';
import { useLanguage, text } from '../context/LanguageContext';
import '../index.css';

const Dashboard = () => {
  const [activeView, setActiveView] = useState('employees');
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
 const { language } = useLanguage();

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`dashboard ${darkMode ? 'dark-mode' : ''}`}>
      <Sidebar setActiveView={setActiveView} />
      <div className="main-content">
        <Navbar 
          onSearch={handleSearch} 
          toggleDarkMode={toggleDarkMode} 
          darkMode={darkMode}
        />
        <div className="content-area">
          {activeView === 'employees' && <EmployeeList searchTerm={searchTerm} />}
          {activeView === 'groups' && <GroupList searchTerm={searchTerm} />}
          {activeView === 'settings' && <Settings searchTerm={searchTerm} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;