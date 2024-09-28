// import React from 'react';
// //import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Dashboard from './components/Dashboard';
// import EmployeeView from './components/EmployeeView';
// import ManagerView from './components/ManagerView';
// //import { UserProvider } from './context/UserContext';
// //import { LanguageProvider } from './context/LanguageContext';
// import './index.css';

// function App() {
//   return (
    
//     <UserProvider>
//       <LanguageProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/Employee" element={<EmployeeView />} />
//           <Route path="/Manager" element={<ManagerView />} />
//         </Routes>
//       </Router>
//       </LanguageProvider>
//     </UserProvider>
   
//   );
// }

// export default App;
















import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import UpdateEmployeeForm from './components/UpdateEmployeeForm';
import FeedbackTable from './components/FeedbackTable';
import TasksTable from './components/TasksTable';


function App() {
  const [activeView, setActiveView] = useState('');
  const [employeeData, setEmployeeData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    type: 'employee',
  });

  const handleUpdate = (updatedData) => {
    setEmployeeData(updatedData);
  };

  const feedbackData = [
    { date: '2024-09-01', message: 'Great job on the project!', from: 'Manager A' },
    { date: '2024-09-15', message: 'Need to improve your presentation skills.', from: 'Manager B' },
    { date: '2024-09-20', message: 'Consistently meets deadlines, well done!', from: 'Manager C' },
  ];

  return (
    <div className="app-container">
     

      <div className="box-and-button-container">
        <div className='sidebar-container'>
          <Sidebar setActiveView={setActiveView} />
        </div>
        
        <div className="main-content">
          {activeView === 'updateEmployee' && (
            <UpdateEmployeeForm
              employeeData={employeeData}
              onUpdate={handleUpdate}
            />
          )}
          {activeView === 'feedback' && (
            <FeedbackTable feedbackData={feedbackData} />
          )}
            {activeView === 'viewTasks' && ( // Show Tasks Table when 'viewTasks' is active
            <TasksTable />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
