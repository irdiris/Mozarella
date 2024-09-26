import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import EmployeeView from './components/EmployeeView';
import ManagerView from './components/ManagerView';
import { UserProvider } from './context/UserContext';
import { LanguageProvider } from './context/LanguageContext';
import './index.css';

function App() {
  return (
    
    <UserProvider>
      <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Employee" element={<EmployeeView />} />
          <Route path="/Manager" element={<ManagerView />} />
        </Routes>
      </Router>
      </LanguageProvider>
    </UserProvider>
   
  );
}

export default App;
