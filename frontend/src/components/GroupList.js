import React, { useState, useEffect } from 'react';
import PopupForm from './PopupForm';
import * as api from '../services/api';

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [selectedGroupEmployees, setSelectedGroupEmployees] = useState([]);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await api.fetchGroups();
      setGroups(response.data);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  const openPopup = (type, group = null) => {
    setPopupType(type);
    setIsPopupOpen(true);
    if (group) {
      setSelectedGroup(group);
      setFormData(group);
    } else {
      setFormData({ name: '', description: '' });
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedGroup(null);
    setFormData({ name: '', description: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (popupType === 'Add') {
        await api.addGroup(formData);
      } else if (popupType === 'Modify') {
        await api.updateGroup(formData);
      }
      fetchGroups();
      closePopup();
    } catch (error) {
      console.error('Error submitting group data:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.deleteGroup(selectedGroup.id);
      fetchGroups();
      closePopup();
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  };

  const viewGroupEmployees = async (groupId) => {
    try {
      const response = await api.fetchGroupEmployees(groupId);
      setSelectedGroupEmployees(response.data);
      openPopup('ViewEmployees');
    } catch (error) {
      console.error('Error fetching group employees:', error);
    }
  };

  return (
    <div className="group-list">
      <h2>Groups</h2>
      <button onClick={() => openPopup('Add')} className='newGroup'>Add New Group</button>
      {groups.map(group => (
        <div key={group.id} className="group-item">
          <h3>{group.name}</h3>
          <p>{group.description}</p>
          <button onClick={() => openPopup('Modify', group)} className='modif'>Modify</button>
          <button onClick={() => openPopup('Delete', group)} className='delt'>Delete</button>
          <button onClick={() => viewGroupEmployees(group.id)} className='view'>View Employees</button>
        </div>
      ))}

      <PopupForm isOpen={isPopupOpen} onClose={closePopup} title={`${popupType} Group`}>
        {popupType !== 'Delete' && popupType !== 'ViewEmployees' ? (
          <form onSubmit={handleSubmit}>
            <input
              className='popinput'
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Group Name"
              required
            />
            <textarea
              className='popinput'
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Description"
              required
            />
            <button className='popbutton' type="submit">Submit</button>
          </form>
        ) : popupType === 'Delete' ? (
          <div>
            <p>Are you sure you want to delete the group "{selectedGroup?.name}"?</p>
            <button className='popdelet' onClick={handleDelete}>Yes, Delete</button>
            <button className='popcancel' onClick={closePopup}>Cancel</button>
          </div>
        ) : (
          <div>
            <h3>Employees in {selectedGroup?.name}</h3>
            {selectedGroupEmployees.map(employee => (
              <p key={employee.id}>{employee.firstName} {employee.lastName}</p>
            ))}
          </div>
        )}
      </PopupForm>
    </div>
  );
};

export default GroupList;