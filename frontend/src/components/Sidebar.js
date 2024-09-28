import React from 'react';

const Sidebar = ({ setActiveView }) => {
  return (
    <div className="sidebar">
      <h2 className='logoDash'>ManagementDash</h2>
      <button onClick={() => setActiveView('updateEmployee')}>Update Employee</button>
      <button onClick={() => setActiveView('employees')}>Employees</button>
      <button onClick={() => setActiveView('feedback')}>Check Feedback</button>
      <button onClick={() => setActiveView('viewTasks')}>View Tasks</button> 
      <button onClick={() => setActiveView('groups')}>Groups</button>
      <button onClick={() => setActiveView('settings')}>Settings</button>
      <button onClick={() => console.log('Logout clicked')}>Logout</button>
    </div>
  );
};

export default Sidebar;
