// PopupForm.js
import React from 'react';

const PopupForm = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>{title}</h2>
        <button className="close-button" onClick={onClose}>×</button>
        <div className="popup-form">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PopupForm;  // Make sure to export the component