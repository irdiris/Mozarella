
import React, { useState } from 'react';

const UpdateEmployeeForm = ({ employeeData, onUpdate }) => {
  const [formData, setFormData] = useState({
    firstName: employeeData.firstName || '',
    lastName: employeeData.lastName || '',
    email: employeeData.email || '',
    type: employeeData.type || 'employee',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="update-form-container">
      <h3 className="update-form-title">Update Employee Information</h3>
      <form className="update-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          placeholder="Last Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
        />
        <select
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          required
        >
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
        </select>
        <button type="submit" className="update-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateEmployeeForm;
