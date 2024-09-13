
import React from 'react';
import { Button } from './ui/Button';
import { Card, CardHeader, CardContent } from './ui/Card';

const ManagerView = () => {
  return (
    <Card className="card">
      <CardHeader className="card-header">Manager Dashboard</CardHeader>
      <CardContent className="card-content">
        <Button className="button">Create Employee Account</Button>
        <Button className="button">Assign Tasks</Button>
        <Button className="button">Give Feedback</Button>
        <Button className="button">Make Announcements</Button>
        <Button className="button">Check Employee Work History</Button>
      </CardContent>
    </Card>
  );
};

export default ManagerView;
