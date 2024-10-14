import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import EmployeeList from './EmployeeList';
import GroupList from './GroupList';
import AnnouncementsList from './AnnouncementsList';
import Settings from './SettingsDash';
import { useLanguage, text } from '../context/LanguageContext';
import '../index.css';
import TaskList from './TaskList';
import * as api from '../services/api';

const Dashboard = () => {
  const [activeView, setActiveView] = useState('employees');
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { language } = useLanguage();
  const [employees, setEmployees] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    // Fetch employees data
    api.fetchEmployees()
      .then(response => setEmployees(response.data))
      .catch(error => console.error('Error fetching employees:', error));

    // Fetch departments data 
    api.fetchDepartments()
      .then(response => setGroups(response.data))
      .catch(error => console.error('Error fetching departments:', error));
  }, []);

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
          {activeView === 'employees' && <EmployeeList employees={employees} searchTerm={searchTerm} />}
          {activeView === 'tasks' && <TaskList searchTerm={searchTerm} />}
          {activeView === 'groups' && <GroupList searchTerm={searchTerm} />}
          {activeView === 'anouncements' && <AnnouncementsList searchTerm={searchTerm} />} 
          {activeView === 'settings' && <Settings searchTerm={searchTerm} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;