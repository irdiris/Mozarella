

import React, { useState, useContext } from 'react';
import { Button } from './ui/Button';
import { Card, CardHeader, CardContent } from './ui/Card';
import { UserContext } from '../context/UserContext';
import { clockIn, clockOut, checkWork, updateInfo, getWorkHistory, getFeedback } from '../services/api';

const EmployeeView = () => {
  const [clockedIn, setClockedIn] = useState(false);
  const { user } = useContext(UserContext);

  const handleClockInOut = async () => {
    if (clockedIn) {
      await clockOut(user.id);
    } else {
      await clockIn(user.id);
    }
    setClockedIn(!clockedIn);
  };



  return (
    <Card className="card">
      <CardHeader className="card-header">Employee Dashboard</CardHeader>
      <CardContent className="card-content">
        <Button className="button" onClick={handleClockInOut}>
          {clockedIn ? 'Clock Out' : 'Clock In'}
        </Button>
        <Button className="button" onClick={() => checkWork(user.id)}>Check Work</Button>
        <Button className="button" onClick={() => updateInfo(user.id)}>Update Information</Button>
        <Button className="button" onClick={() => getWorkHistory(user.id)}>Work History</Button>
        <Button className="button" onClick={() => getFeedback(user.id)}>View Feedback</Button>
      </CardContent>
    </Card>
  );
};

export default EmployeeView;
