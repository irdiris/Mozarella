import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import EmployeeView from './components/EmployeeView';
import ManagerView from './components/ManagerView';
import { UserProvider } from './context/UserContext';
import './index.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Employee" element={<EmployeeView />} />
          <Route path="/Manager" element={<ManagerView />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
