import React, { useState, useEffect } from 'react';
import * as api from '../services/api';

const WorkTodo = ({ onTaskComplete }) => {
  // Sample tasks tuples: [id, title, managerName, dueDate, description, status]
  const sampleTasks = [ ];

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Simulating API call with sample data
    const mockData = sampleTasks.map(([id, title, managerName, dueDate, description, status]) => ({
      id,
      title,
      managerName,
      dueDate,
      description,
      status
    }));
    
    setTimeout(() => setTasks(mockData), 500); // Simulate loading
  }, []);

  const handleStatusUpdate = (taskId, newStatus) => {
    if (newStatus === 'done') {
      // Find the completed task
      const completedTask = tasks.find(task => task.id === taskId);
      
      // Remove the task from the list when marked as done
      setTasks(tasks.filter(task => task.id !== taskId));
      
      // Call the onTaskComplete prop function to add the task to work history
      if (onTaskComplete && typeof onTaskComplete === 'function') {
        onTaskComplete({...completedTask, completedDate: new Date().toISOString()});
      } else {
        console.error('onTaskComplete is not a function or not provided');
      }
      
      console.log(`Task ${taskId} marked as done and moved to work history.`);
     
      // Update the task status for other statuses
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      ));
      console.log(`Updated task ${taskId} status to:`, newStatus);
      
     
    }
  };

  return (
    <div className="work-todo-container">
      <h2>Tasks To Do</h2>
      {tasks.length === 0 ? (
        <p>No tasks assigned yet.</p>
      ) : (
        tasks.map(task => (
          <div key={task.id} className="task-block">
            <h3>{task.title}</h3>
            <p><strong>Assigned by:</strong> {task.managerName}</p>
            <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
            <p><strong>Description:</strong> {task.description}</p>
            <p><strong>Status:</strong> {task.status}</p>
            <div className="task-actions">
              {task.status !== 'in_progress' && (
                <button 
                  onClick={() => handleStatusUpdate(task.id, 'in_progress')}
                  className="status-button in-progress-button"
                >
                  In Progress
                </button>
              )}
              <button 
                onClick={() => handleStatusUpdate(task.id, 'done')}
                className="status-button done-button"
              >
                Done
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default WorkTodo;