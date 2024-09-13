
import React, { useState, useEffect } from 'react';

const EmployeeList = ({ searchTerm }) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch employees from API
    // This is a placeholder we should Replace  ot with actual API call
    setEmployees([
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', type: 'manager' },
      { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', type: 'employee' },
    ]);
  }, []);

  const filteredEmployees = employees.filter(employee => 
    employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleModify = (id) => {
    // Implement modify logic
    console.log('Modify employee', id);
  };

  const handleDelete = (id) => {
    // Implement delete logic
    console.log('Delete employee', id);
  };

  const handleAdd = () => {
    // Implement add logic
    console.log('Add new employee');
  };

  return (
    <div className="employee-list">
      <h2>Employees</h2>
      <button onClick={handleAdd} className='newEmp'>Add New Employee</button>
      {filteredEmployees.map(employee => (
        <div key={employee.id} className="employee-item">
          <p>{employee.firstName} {employee.lastName} ({employee.type})</p>
          <p>{employee.email}</p>
          <button onClick={() => handleModify(employee.id)} className='modif'>Modify</button>
          <button onClick={() => handleDelete(employee.id)} className='delt'>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;
