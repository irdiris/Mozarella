import React, { useState, useEffect } from 'react';
import PopupForm from './PopupForm';
import * as api from '../services/api';

const EmployeeList = ({ searchTerm }) => {
  const [employees, setEmployees] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password:'',
    type: 'employee',
    group:''
  });
  const [feedbackData, setFeedbackData] = useState('');
  const [workHistory, setWorkHistory] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await api.fetchEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const openPopup = (type, employee = null) => {
    setPopupType(type);
    setIsPopupOpen(true);
    if (employee) {
      setSelectedEmployee(employee);
      setFormData(employee);
    } else {
      setFormData({ firstName: '', lastName: '', email: '', password: '', type: 'employee', group: '' });
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedEmployee(null);
    setFormData({ firstName: '', lastName: '', email: '', password: '', type: 'employee', group: '' });
    setFeedbackData('');
    setWorkHistory([]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (popupType === 'Add') {
        await api.addEmployee(formData);
      } else if (popupType === 'Modify') {
        await api.updateEmployee(formData);
      } else if (popupType === 'Feedback') {
        await api.submitFeedback(selectedEmployee.id, feedbackData);
      }
      fetchEmployees();
      closePopup();
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.deleteEmployee(selectedEmployee.id);
      fetchEmployees();
      closePopup();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleFeedbackChange = (e) => {
    setFeedbackData(e.target.value);
  };

  const fetchWorkHistory = async (employeeId) => {
    try {
      const response = await api.fetchEmployeeWorkHistory(employeeId);
      setWorkHistory(response.data);
      openPopup('WorkHistory');
    } catch (error) {
      console.error('Error fetching work history:', error);
    }
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
          <button onClick={() => openPopup('Feedback', employee)} className='feedback'>Give Feedback</button>
          <button onClick={() => fetchWorkHistory(employee.id)} className='history'>Work History</button>
        </div>
      ))}

      <PopupForm isOpen={isPopupOpen} onClose={closePopup} title={`${popupType} Employee`}>
        {popupType === 'Add' || popupType === 'Modify' ? (
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
            <input className='popinput'
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleInputChange} 
              placeholder="Password" 
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
            <input className='popinput'
              type="text" 
              name="group" 
              value={formData.group} 
              onChange={handleInputChange} 
              placeholder="Group" 
              required 
            />
            <button className='popbutton' type="submit">Submit</button>
          </form>
        ) : popupType === 'Delete' ? (
          <div>
            <p>Are you sure you want to delete {selectedEmployee?.firstName} {selectedEmployee?.lastName}?</p>
            <button className='popdelet' onClick={handleDelete}>Yes, Delete</button>
            <button className='popcancel' onClick={closePopup}>Cancel</button>
          </div>
        ) : popupType === 'Feedback' ? (
          <form onSubmit={handleSubmit}>
            <textarea
              className='popinput'
              name="feedback"
              value={feedbackData}
              onChange={handleFeedbackChange}
              placeholder="Enter feedback"
              required
            />
            <button className='popbutton' type="submit">Submit Feedback</button>
          </form>
        ) : popupType === 'WorkHistory' ? (
          <div>
            <h3>Work History for {selectedEmployee?.firstName} {selectedEmployee?.lastName}</h3>
            {workHistory.map((entry, index) => (
              <div key={index}>
                <p>Date: {entry.date}</p>
                <p>Task: {entry.task}</p>
                <p>Status: {entry.status}</p>
              </div>
            ))}
          </div>
        ) : null}
      </PopupForm>
    </div>
  );
};

export default EmployeeList;