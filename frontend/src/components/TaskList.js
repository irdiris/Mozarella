import React, { useState, useEffect } from 'react';
import PopupForm from './PopupForm';
import * as api from '../services/api';

const TaskList = ({ searchTerm }) => {
  const [tasks, setTasks] = useState([]);
  const [allGroups, setAllGroups] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    state: 'To Do',
    assignedGroup: '',
    managerName: ''
  });

  useEffect(() => {
    fetchTasks();
    fetchAllGroups();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.fetchTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchAllGroups = async () => {
    try {
      const response = await api.fetchDepartments();
      setAllGroups(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const openPopup = (type, task = null) => {
    setPopupType(type);
    setIsPopupOpen(true);
    if (task) {
      setSelectedTask(task);
      setFormData(task);
    } else {
      setFormData({ name: '', description: '', state: 'To Do', assignedGroup: '', managerName: '' });
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedTask(null);
    setFormData({ name: '', description: '', state: 'To Do', assignedGroup: '', managerName: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (popupType === 'Add') {
        await api.addTask(formData);
      } else if (popupType === 'Modify') {
        await api.updateTask(formData);
      }
      fetchTasks();
      closePopup();
    } catch (error) {
      console.error('Error submitting task data:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.deleteTask(selectedTask.id);
      fetchTasks();
      closePopup();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const filteredTasks = tasks.filter(task => 
    task.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="task-list">
      <h2>Tasks</h2>
      <button onClick={() => openPopup('Add')} className='newTask'>Create New Task</button>
      {filteredTasks.map(task => (
        <div key={task.id} className="task-item">
          <h3>{task.name}</h3>
          <p>Description: {task.description}</p>
          <p>State: {task.state}</p>
          <p>Assigned to: {task.assignedGroup}</p>
          <p>Manager: {task.managerName}</p>
          <button onClick={() => openPopup('Delete', task)} className='delt'>Delete Task</button>
          <button onClick={() => openPopup('Modify', task)} className='modif'>Modify Task</button>
        </div>
      ))}

      <PopupForm isOpen={isPopupOpen} onClose={closePopup} title={`${popupType} Task`}>
        {popupType !== 'Delete' ? (
          <form onSubmit={handleSubmit}>
            <input className='popinput'
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange} 
              placeholder="Task Name" 
              required 
            />
            <textarea className='popinput'
              name="description" 
              value={formData.description} 
              onChange={handleInputChange} 
              placeholder="Task Description" 
              required 
            />
            <select className='popselect'
              name="state" 
              value={formData.state} 
              onChange={handleInputChange} 
              required
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <select className='popselect'
              name="assignedGroup" 
              value={formData.assignedGroup} 
              onChange={handleInputChange} 
              required
            >
              <option value="">Select Group</option>
              {allGroups.map(group => (
                <option key={group.id} value={group.name}>
                  {group.name}
                </option>
              ))}
            </select>
            <input className='popinput'
              type="text" 
              name="managerName" 
              value={formData.managerName} 
              onChange={handleInputChange} 
              placeholder="Manager Name" 
              required 
            />
            <button className='popbutton' type="submit">Submit</button>
          </form>
        ) : (
          <div>
            <p>Are you sure you want to delete the task "{selectedTask?.name}"?</p>
            <button className='popdelet' onClick={handleDelete}>Yes, Delete</button>
            <button className='popcancel' onClick={closePopup}>Cancel</button>
          </div>
        )}
      </PopupForm>
    </div>
  );
};

export default TaskList;