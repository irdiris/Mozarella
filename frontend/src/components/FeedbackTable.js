
import React from 'react';


const FeedbackTable = ({ feedbackData }) => {
  return (
    <div className="feedback-table-container">
      <h2 className="feedback-table-title">Employee Feedback</h2>
      <table className="feedback-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Feedback</th>
            <th>From</th>
          </tr>
        </thead>
        <tbody>
          {feedbackData.map((feedback, index) => (
            <tr key={index}>
              <td>{feedback.date}</td>
              <td>{feedback.message}</td>
              <td>{feedback.from}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackTable;
