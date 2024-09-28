
import React from 'react';

const TasksTable = () => {
  const tasksData = [
    { id: 1, task: 'Complete project report', dueDate: '2024-10-01', status: 'Pending' },
    { id: 2, task: 'Attend team meeting', dueDate: '2024-09-28', status: 'Completed' },
    { id: 3, task: 'Prepare presentation for client', dueDate: '2024-10-05', status: 'Pending' },
  ];

  return (
    <div className="tasks-table-container">
      <h2>Tasks Assigned</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Task</th>
            <th>Due Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasksData.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.task}</td>
              <td>{item.dueDate}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TasksTable;
