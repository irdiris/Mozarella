import React, { useState, useEffect } from 'react';
import * as api from '../services/api';

const WorkHistory = ({ newlyCompletedTasks = [] }) => {
  // Sample completed tasks tuples: [id, title, managerName, completedDate, description, submission, feedback]
  const sampleCompletedTasks = [];

  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    // Simulating API call with sample data
    const mockData = sampleCompletedTasks.map(([id, title, managerName, completedDate, description, submission, feedback]) => ({
      id,
      title,
      managerName,
      completedDate,
      description,
      submission,
      feedback
    }));
    
    // Merge sample data with newly completed tasks
    const allCompletedTasks = [...mockData, ...newlyCompletedTasks];
    
    // Sort tasks by completion date (most recent first)
    allCompletedTasks.sort((a, b) => new Date(b.completedDate) - new Date(a.completedDate));
    
    setTimeout(() => setCompletedTasks(allCompletedTasks), 500); // Simulate loading
  }, [newlyCompletedTasks]);

  return (
    <div className="work-history-container">
      <h2>Completed Tasks</h2>
      {completedTasks.length === 0 ? (
        <p>No completed tasks yet.</p>
      ) : (
        completedTasks.map(task => (
          <div key={task.id} className="task-block">
            <h3>{task.title}</h3>
            <p><strong>Assigned by:</strong> {task.managerName}</p>
            <p><strong>Completed Date:</strong> {new Date(task.completedDate).toLocaleDateString()}</p>
            <p><strong>Description:</strong> {task.description}</p>
            <p><strong>Submission:</strong> {task.submission || "N/A"}</p>
            {task.feedback && (
              <div className="task-feedback">
                <h4>Manager Feedback:</h4>
                <p>{task.feedback}</p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default WorkHistory;