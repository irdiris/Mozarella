import React, { useState, useEffect } from 'react';
import PopupForm from './PopupForm';
import * as api from '../services/api';

const AnnouncementsList = ({ searchTerm }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    employeeIds: []
  });

  useEffect(() => {
    fetchAnnouncements();
    fetchEmployees();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await api.fetchAnnouncements();
      setAnnouncements(response.data);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await api.fetchEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const openPopup = (type, announcement = null) => {
    setPopupType(type);
    setIsPopupOpen(true);
    if (announcement) {
      setSelectedAnnouncement(announcement);
      setFormData(announcement);
    } else {
      setFormData({ name: '', description: '', employeeIds: [] });
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedAnnouncement(null);
    setFormData({ name: '', description: '', employeeIds: [] });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEmployeeSelect = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({ ...prev, employeeIds: selectedOptions }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (popupType === 'Add') {
        await api.createAnnouncement(formData);
      } else if (popupType === 'Modify') {
        await api.updateAnnouncement(selectedAnnouncement.id, formData);
      }
      fetchAnnouncements();
      closePopup();
    } catch (error) {
      console.error('Error submitting announcement data:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.deleteAnnouncement(selectedAnnouncement.id);
      fetchAnnouncements();
      closePopup();
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };

  const filteredAnnouncements = announcements.filter(announcement => 
    announcement.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    announcement.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="announcement-list">
      <h2>Announcements</h2>
      <button onClick={() => openPopup('Add')} className='newAnnouncement'>Create New Announcement</button>
      {filteredAnnouncements.map(announcement => (
        <div key={announcement.id} className="announcement-item">
          <h3>{announcement.name}</h3>
          <p>{announcement.description}</p>
          <button onClick={() => openPopup('Modify', announcement)} className='modif'>Modify</button>
          <button onClick={() => openPopup('Delete', announcement)} className='delt'>Delete</button>
        </div>
      ))}

      <PopupForm isOpen={isPopupOpen} onClose={closePopup} title={`${popupType} Announcement`}>
        {popupType !== 'Delete' ? (
          <form onSubmit={handleSubmit}>
            <input className='popinput'
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange} 
              placeholder="Announcement Name" 
              required 
            />
            <textarea className='popinput'
              name="description" 
              value={formData.description} 
              onChange={handleInputChange} 
              placeholder="Announcement Description" 
              required 
            />
            <select className='popinput'
              multiple
              name="employeeIds"
              value={formData.employeeIds}
              onChange={handleEmployeeSelect}
              required
            >
              {employees.map(employee => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
            <button className='popbutton' type="submit">Submit</button>
          </form>
        ) : (
          <div>
            <p>Are you sure you want to delete the announcement "{selectedAnnouncement?.name}"?</p>
            <button className='popdelet' onClick={handleDelete}>Yes, Delete</button>
            <button className='popcancel' onClick={closePopup}>Cancel</button>
          </div>
        )}
      </PopupForm>
    </div>
  );
};

export default AnnouncementsList;