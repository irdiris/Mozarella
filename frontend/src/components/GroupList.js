
import React, { useState, useEffect } from 'react';

const GroupList = ({ searchTerm }) => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    // Fetch groups from API
    // sameee
    setGroups([
      { id: 1, name: 'Edu Team', employees: [1, 2] },
      { id: 2, name: 'Marketing Team', employees: [2] },
    ]);
  }, []);

  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddGroup = () => {
    // Implement add group logic
    console.log('Add new group');
  };

  const handleDeleteGroup = (id) => {
    // Implement delete group logic
    console.log('Delete group', id);
  };

  const handleSelectGroup = (group) => {
    setSelectedGroup(group);
  };

  const handleAddEmployeeToGroup = (groupId) => {
    // Implement add employee to group logic
    console.log('Add employee to group', groupId);
  };

  const handleRemoveEmployeeFromGroup = (groupId, employeeId) => {
    // Implement remove employee from group logic
    console.log('Remove employee', employeeId, 'from group', groupId);
  };

  return (
    <div className="group-list">
      <h2>Groups</h2>
      <button onClick={handleAddGroup} className='newEmp'>Add New Group</button>
      {filteredGroups.map(group => (
        <div key={group.id} className="group-item">
          <h3 onClick={() => handleSelectGroup(group)}>{group.name}</h3>
          <button onClick={() => handleDeleteGroup(group.id)} className='delt'>Delete Group</button>
          <button className='modif'>Check group</button>
          {selectedGroup && selectedGroup.id === group.id && (
            <div className="group-employees">
              <h4>Employees in {group.name}</h4>
              <button onClick={() => handleAddEmployeeToGroup(group.id)} className='newEmpG'>Add Employee to Group</button>
              {group.employees.map(employeeId => (
                <div key={employeeId} className="group-employee">
                  Employee ID: {employeeId}
                  <button onClick={() => handleRemoveEmployeeFromGroup(group.id, employeeId)} className='delt'>Remove</button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default GroupList;
