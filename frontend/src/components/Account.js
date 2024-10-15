import React, { useState, useEffect } from 'react';
import * as api from '../services/api';

const Account = () => {
  const [account, setAccount] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchAccountData();
  }, []);

  const fetchAccountData = async () => {
    try {
      const response = await api.updateEmployeeAccount();
      setAccount(response.data);
    } catch (error) {
      console.error('Error fetching account data:', error);
    }
  };

  const handleInputChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.fetchEmployeeAccount(account);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating account:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await api.logout();
      console.log('Logged out successfully');
      // Redirect to login page or update app state
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (!account) return <div>Loading...</div>;

  return (
    <div className="account-container">
      <h2>Account Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={account.name}
              onChange={handleInputChange}
            />
          ) : (
            <span>{account.name}</span>
          )}
        </div>
        <div className="form-group">
          <label>Email:</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={account.email}
              onChange={handleInputChange}
            />
          ) : (
            <span>{account.email}</span>
          )}
        </div>
        <div className="form-group">
          <label>Position:</label>
          <span>{account.position}</span>
        </div>
        <div className="form-group">
          <label>Department:</label>
          <span>{account.department}</span>
        </div>
        {isEditing ? (
          <button type="submit" className="saveB">Save Changes</button>
        ) : (
          <button type="button" className="EditB" onClick={() => setIsEditing(true)}>Edit</button>
        )}
      </form>
      <button onClick={handleLogout} className="logoutB">Logout</button>
    </div>
  );
};

export default Account;