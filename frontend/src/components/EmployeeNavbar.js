import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const EmployeeNavbar = ({ toggleDarkMode, darkMode, setActiveView, activeView = '' }) => {
  const [isWorkDropdownOpen, setIsWorkDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleNavClick = (view) => {
    setActiveView(view);
    setIsWorkDropdownOpen(false);
  };

  const handleLogout = () => {
    // Clear user data from localStorage/sessionStorage (depending on how you manage the session)
    localStorage.removeItem('authToken'); // Clear authentication token
    localStorage.removeItem('userData'); // Clear user data if any

    // Optionally, you can also clear state management (if using something like Redux or Context API)
    // dispatch(logoutAction()); 

    // Redirect to the login page
    navigate('/login'); // Use navigate to redirect
  };

  return (
    <nav className={`empnavbar ${darkMode ? 'dark-mode' : ''}`}>
      <div className="empnavbar-left">
        {/* Removed the search bar and added a logout button */}
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
      <div className="empnavbar-center">
        <div className="empnav-items">
          <button 
            className={`empnav-item ${activeView === 'account' ? 'active' : ''}`}
            onClick={() => handleNavClick('account')}
          >
            Account
          </button>
          <div
            className={`empnav-item dropdown ${activeView?.startsWith('work') ? 'active' : ''}`}
            onMouseEnter={() => setIsWorkDropdownOpen(true)}
            onMouseLeave={() => setIsWorkDropdownOpen(false)}
          >
            <button onClick={() => setIsWorkDropdownOpen(!isWorkDropdownOpen)}>Work</button>
            {isWorkDropdownOpen && (
              <div className="dropdown-content">
                <button 
                  onClick={() => handleNavClick('work-todo')}
                  className={activeView === 'work-todo' ? 'active' : ''}
                >
                  Work to Do
                </button>
                <button 
                  onClick={() => handleNavClick('work-history')}
                  className={activeView === 'work-history' ? 'active' : ''}
                >
                  Work History
                </button>
              </div>
            )}
          </div>
          <button 
            className={`empnav-item ${activeView === 'feedback' ? 'active' : ''}`}
            onClick={() => handleNavClick('feedback')}
          >
            Feedback
          </button>
        </div>
      </div>
      <div className="navbar-right">
        <button onClick={toggleDarkMode} className="dark-mode-toggle">
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </nav>
  );
};

export default EmployeeNavbar;
