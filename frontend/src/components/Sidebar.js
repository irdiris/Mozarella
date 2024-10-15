import React from 'react';

const Sidebar = ({ setActiveView }) => {
  return (
    <div className="sidebar">
        <h2 className='logoDash'>ManagerDash</h2>
      <button onClick={() => setActiveView('employees')}>Employees</button>
      <button onClick={() => setActiveView('tasks')}>Tasks</button>
      <button onClick={() => setActiveView('groups')}>Groups</button>
      <button onClick={() => setActiveView('anouncements')}>Announcements</button>
      <button onClick={() => setActiveView('settings')}>Settings</button>
      <button onClick={() => console.log('Logout clicked')}>Logout</button>
    </div>
  );
};

export default Sidebar;