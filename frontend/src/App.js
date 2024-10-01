import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/ManagerView';
import EmployeeView from './components/EmployeeView';
import ManagerView from './components/ManagerView';
import Login from './components/Login';
import WorkHistory from './components/WorkHistory';
import { UserProvider } from './context/UserContext';
import { LanguageProvider } from './context/LanguageContext';
import './index.css';

function App() {
  const [newlyCompletedTasks, setNewlyCompletedTasks] = useState([]);

  const handleTaskComplete = (completedTask) => {
    setNewlyCompletedTasks(prevTasks => [...prevTasks, completedTask]);
  };

  return (
    <UserProvider>
      <LanguageProvider>
        <Router>
          <Routes>
            <Route path="/Manager" element={<ManagerView />} />
            <Route 
              path="/Employee" 
              element={<EmployeeView onTaskComplete={handleTaskComplete} />} 
            />
            <Route path="/Login" element={<Login />} />
            <Route 
              path="/WorkHistory" 
              element={<WorkHistory newlyCompletedTasks={newlyCompletedTasks} />} 
            />
          </Routes>
        </Router>
      </LanguageProvider>
    </UserProvider>
  );
}

export default App;
