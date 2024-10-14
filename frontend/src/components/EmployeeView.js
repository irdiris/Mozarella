import React, { useState, useEffect } from 'react';
import EmployeeNavbar from './EmployeeNavbar';
import WorkTodo from './WorkTodo';
import WorkHistory from './WorkHistory';
import Feedback from './Feedback';
import Account from './Account';
import { useLanguage, text } from '../context/LanguageContext';
import '../index.css';
import * as api from '../services/api';

const EmployeeView = () => {
  const [activeView, setActiveView] = useState('account');
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { language } = useLanguage();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks data
    api.fetchTasks()
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  return (
    <div className={`employee-view ${darkMode ? 'dark-mode' : ''}`}>
      <div className="main-content">
        <EmployeeNavbar 
          onSearch={handleSearch} 
          toggleDarkMode={toggleDarkMode} 
          darkMode={darkMode}
          setActiveView={setActiveView}
          activeView={activeView}
        />
        
        <div className="empcontent-area">
          {activeView === 'account' && <Account />}
          {activeView === 'work-todo' && <WorkTodo tasks={tasks} searchTerm={searchTerm} />}
          {activeView === 'work-history' && <WorkHistory tasks={tasks} searchTerm={searchTerm} />}
          {activeView === 'feedback' && <Feedback searchTerm={searchTerm} />}
        </div>
      </div>
    </div>
  );
};

export default EmployeeView;