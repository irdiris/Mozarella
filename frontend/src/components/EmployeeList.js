import React, { useState } from 'react';
import PopupForm from './PopupForm';  
import { useLanguage, text } from '../context/LanguageContext';

const EmployeeList = ({ searchTerm }) => {
  const [employees, setEmployees] = useState([
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', type: 'manager' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', type: 'employee' },
  ]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    type: 'employee'
  });

  const openPopup = (type, employee = null) => {
    setPopupType(type);
    setIsPopupOpen(true);
    if (employee) {
      setSelectedEmployee(employee);
      setFormData(employee);
    } else {
      setFormData({ firstName: '', lastName: '', email: '', type: 'employee' });
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedEmployee(null);
    setFormData({ firstName: '', lastName: '', email: '', type: 'employee' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (popupType === 'Add') {
      setEmployees(prev => [...prev, { id: prev.length + 1, ...formData }]);
    } else if (popupType === 'Modify') {
      setEmployees(prev => prev.map(emp => emp.id === selectedEmployee.id ? { ...emp, ...formData } : emp));
    }
    closePopup();
  };

  const handleDelete = () => {
    setEmployees(prev => prev.filter(emp => emp.id !== selectedEmployee.id));
    closePopup();
  };

  const filteredEmployees = employees.filter(employee => 
    employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="employee-list">
      <h2>Employees</h2>
      <button onClick={() => openPopup('Add')} className='newEmp'>Add New Employee</button>
      {filteredEmployees.map(employee => (
        <div key={employee.id} className="employee-item">
          <p>{employee.firstName} {employee.lastName} ({employee.type})</p>
          <p>{employee.email}</p>
          <button onClick={() => openPopup('Modify', employee)} className='modif'>Modify</button>
          <button onClick={() => openPopup('Delete', employee)} className='delt'>Delete</button>
        </div>
      ))}

      <PopupForm isOpen={isPopupOpen} onClose={closePopup} title={`${popupType} Employee`}>
        {popupType !== 'Delete' ? (
          <form onSubmit={handleSubmit}>
            <input className='popinput'
              type="text" 
              name="firstName" 
              value={formData.firstName} 
              onChange={handleInputChange} 
              placeholder="First Name" 
              required 
            />
            <input className='popinput'
              type="text" 
              name="lastName" 
              value={formData.lastName} 
              onChange={handleInputChange} 
              placeholder="Last Name" 
              required 
            />
            <input className='popinput'
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleInputChange} 
              placeholder="Email" 
              required 
            />
            <select className='popselect'
              name="type" 
              value={formData.type} 
              onChange={handleInputChange} 
              required
            >
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
            </select>
            <button className='popbutton' type="submit">Submit</button>
          </form>
        ) : (
          <div>
            <p>Are you sure you want to delete {selectedEmployee?.firstName} {selectedEmployee?.lastName}?</p>
            <button className='popdelet' onClick={handleDelete}>Yes, Delete</button>
            <button className='popcancel' onClick={closePopup}>Cancel</button>
          </div>
        )}
      </PopupForm>
    </div>
  );
};

export default EmployeeList;