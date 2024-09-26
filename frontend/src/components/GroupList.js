import React, { useState } from 'react';
import PopupForm from './PopupForm';

const GroupList = ({ searchTerm }) => {
  const [groups, setGroups] = useState([
    { id: 1, name: 'Edu Team', employees: [1, 2] },
    { id: 2, name: 'Marketing Team', employees: [2] },
  ]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    employees: []
  });
  const [allEmployees] = useState([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Bob Johnson' },
  ]);

  const openPopup = (type, group = null) => {
    setPopupType(type);
    setIsPopupOpen(true);
    if (group) {
      setSelectedGroup(group);
      setFormData(group);
    } else {
      setFormData({ name: '', employees: [] });
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedGroup(null);
    setFormData({ name: '', employees: [] });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (popupType === 'Add') {
      setGroups(prev => [...prev, { id: prev.length + 1, ...formData }]);
    } else if (popupType === 'Modify') {
      setGroups(prev => prev.map(group => group.id === selectedGroup.id ? { ...group, ...formData } : group));
    }
    closePopup();
  };

  const handleDelete = () => {
    setGroups(prev => prev.filter(group => group.id !== selectedGroup.id));
    closePopup();
  };

  const handleAddEmployeeToGroup = (employeeId) => {
    setFormData(prev => ({
      ...prev,
      employees: [...prev.employees, employeeId]
    }));
  };

  const handleRemoveEmployeeFromGroup = (employeeId) => {
    setFormData(prev => ({
      ...prev,
      employees: prev.employees.filter(id => id !== employeeId)
    }));
  };

  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="group-list">
      <h2>Groups</h2>
      <button onClick={() => openPopup('Add')} className='newEmp'>Add New Group</button>
      {filteredGroups.map(group => (
        <div key={group.id} className="group-item">
          <h3>{group.name}</h3>
          <button onClick={() => openPopup('Delete', group)} className='delt'>Delete Group</button>
          <button onClick={() => openPopup('Modify', group)} className='modif'>Modify Group</button>
          <div className="group-employees">
            <h4>Employees in {group.name}</h4>
            {group.employees.map(employeeId => (
              <div key={employeeId} className="group-employee">
                Employee ID: {employeeId}
              </div>
            ))}
          </div>
        </div>
      ))}

      <PopupForm isOpen={isPopupOpen} onClose={closePopup} title={`${popupType} Group`}>
        {popupType !== 'Delete' ? (
          <form onSubmit={handleSubmit}>
            <input className='popinput'
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange} 
              placeholder="Group Name" 
              required 
            />
            <div className="employee-selection">
              <h4>Select Employees:</h4>
              {allEmployees.map(employee => (
                <div key={employee.id}>
                  <input
                    type="checkbox"
                    id={`employee-${employee.id}`}
                    checked={formData.employees.includes(employee.id)}
                    onChange={() => 
                      formData.employees.includes(employee.id) 
                        ? handleRemoveEmployeeFromGroup(employee.id)
                        : handleAddEmployeeToGroup(employee.id)
                    }
                  />
                  <label htmlFor={`employee-${employee.id}`}>{employee.name}</label>
                </div>
              ))}
            </div>
            <button className='popbutton' type="submit">Submit</button>
          </form>
        ) : (
          <div>
            <p>Are you sure you want to delete the group "{selectedGroup?.name}"?</p>
            <button className='popupdelet' onClick={handleDelete}>Yes, Delete</button>
            <button className='popupcancel' onClick={closePopup}>Cancel</button>
          </div>
        )}
      </PopupForm>
    </div>
  );
};

export default GroupList;