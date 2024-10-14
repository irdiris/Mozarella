import React, { useState } from 'react';
import PopupForm from './PopupForm';
import { useLanguage, text } from '../context/LanguageContext';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [currentUser, setCurrentUser] = useState({
    username: 'johndoe',
    email: 'john@example.com',
    organizationName: 'Acme Inc.'
  });
  const { language, toggleLanguage } = useLanguage();
  const [users, setUsers] = useState([
    { id: 1, username: 'user1', email: 'user1@example.com', role: 'admin' },
    { id: 2, username: 'user2', email: 'user2@example.com', role: 'user' },
  ]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '', role: 'user' });

  const handleAccountUpdate = (e) => {
    e.preventDefault();
    console.log('Account updated', currentUser);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    console.log('Password change requested');
  };

  const handleUserUpdate = (userId, field, value) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, [field]: value } : user
    ));
    console.log('User updated', userId, field, value);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setNewUser({ username: '', email: '', password: '', role: 'user' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateNewAccount = (e) => {
    e.preventDefault();
    console.log('New account created', newUser);
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
    closePopup();
  };

  return (
    <div className="settings-page">
      <h2>{text[language].settings}</h2>
    

      <div className="settings-content">

        
          <div className="user-management">
            <h3>{text[language].userManagement}</h3>
            <button onClick={openPopup} className="newEmp">{text[language].createNewAccount}</button>
            <table>
              <thead>
                <tr>
                  <th>{text[language].username}</th>
                  <th>{text[language].email}</th>
                  <th>{text[language].role}</th>
                  <th>{text[language].actions}</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      <select 
                        value={user.role} 
                        onChange={(e) => handleUserUpdate(user.id, 'role', e.target.value)}
                        className="popselect"
                      >
                        <option value="admin">{text[language].admin}</option>
                        <option value="user">{text[language].user}</option>
                      </select>
                    </td>
                    <td>
                      <button onClick={() => console.log('Reset password for', user.id)} className="modif">{text[language].resetPassword}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      
      </div>

      <PopupForm isOpen={isPopupOpen} onClose={closePopup} title={text[language].createNewAccount}>
        <form onSubmit={handleCreateNewAccount}>
          <input className='popinput'
            type="text"
            name="username"
            value={newUser.username}
            onChange={handleInputChange}
            placeholder={text[language].username}
            required
          />
          <input className='popinput'
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            placeholder={text[language].email}
            required
          />
          <input className='popinput'
            type="password"
            name="password"
            value={newUser.password}
            onChange={handleInputChange}
            placeholder={text[language].newPassword}
            required
          />
          <select className='popselect'
            name="role"
            value={newUser.role}
            onChange={handleInputChange}
            required
          >
            <option value="user">{text[language].user}</option>
            <option value="admin">{text[language].admin}</option>
          </select>
          <button className='popbutton' type="submit">{text[language].submit}</button>
        </form>
      </PopupForm>
    </div>
  );
};

export default Settings;