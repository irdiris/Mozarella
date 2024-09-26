// src/components/ui/Tabs.js
import React, { useState } from 'react';

export const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      {React.Children.map(children, (child) => 
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
};

export const TabList = ({ children, activeTab, setActiveTab }) => (
  <div className="flex border-b">
    {React.Children.map(children, (child, index) => 
      React.cloneElement(child, { isActive: index === activeTab, onClick: () => setActiveTab(index) })
    )}
  </div>
);

export const Tab = ({ children, isActive, onClick }) => (
  <button
    className={`py-2 px-4 ${isActive ? 'border-b-2 border-blue-500' : ''}`}
    onClick={onClick}
  >
    {children}
  </button>
);

export const TabPanel = ({ children, activeTab, index }) => (
  activeTab === index ? <div>{children}</div> : null
);