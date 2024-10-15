import React, { useState, useEffect } from 'react';
import * as api from '../services/api';

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchEmployeeFeedbacks();
  }, []);

  const fetchEmployeeFeedbacks = async () => {
    try {
      const response = await api.fetchEmployeeFeedbacks();
      setFeedbacks(response.data);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    }
  };

  return (
    <div className="feedback-container">
      <h2>Feedback from Managers</h2>
      {feedbacks.length === 0 ? (
        <p>No feedback received yet.</p>
      ) : (
        feedbacks.map(feedback => (
          <div key={feedback.id} className="feedback-block">
            <h3>{feedback.managerName}</h3>
            <p className="feedback-date">{new Date(feedback.date).toLocaleDateString()}</p>
            <p>{feedback.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Feedback;