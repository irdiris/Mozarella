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
      <div className="settings-nav">
        <button onClick={() => setActiveTab('account')} className={activeTab === 'account' ? 'active' : ''}>{text[language].accountSettings}</button>
        <button onClick={() => setActiveTab('language')} className={activeTab === 'language' ? 'active' : ''}>{text[language].languageSettings}</button>
        <button onClick={() => setActiveTab('users')} className={activeTab === 'users' ? 'active' : ''}>{text[language].userManagement}</button>
      </div>

      <div className="settings-content">
        {activeTab === 'account' && (
          <div className="account-settings">
            <h3>{text[language].accountSettings}</h3>
            <form onSubmit={handleAccountUpdate}>
              <div className="form-group">
                <label htmlFor="username">{text[language].username}:</label>
                <input
                  type="text"
                  id="username"
                  value={currentUser.username}
                  onChange={(e) => setCurrentUser({...currentUser, username: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">{text[language].email}:</label>
                <input
                  type="email"
                  id="email"
                  value={currentUser.email}
                  onChange={(e) => setCurrentUser({...currentUser, email: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label htmlFor="orgName">{text[language].organizationName}:</label>
                <input
                  type="text"
                  id="orgName"
                  value={currentUser.organizationName}
                  onChange={(e) => setCurrentUser({...currentUser, organizationName: e.target.value})}
                />
              </div>
              <button type="submit" className="newEmp">{text[language].updateAccount}</button>
            </form>

            <h3>{text[language].changePassword}</h3>
            <form onSubmit={handlePasswordChange}>
              <div className="form-group">
                <label htmlFor="currentPassword">{text[language].currentPassword}:</label>
                <input type="password" id="currentPassword" />
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">{text[language].newPassword}:</label>
                <input type="password" id="newPassword" />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">{text[language].confirmNewPassword}:</label>
                <input type="password" id="confirmPassword" />
              </div>
              <button type="submit" className="newEmp">{text[language].changePassword}</button>
            </form>
          </div>
        )}

        {activeTab === 'language' && (
          <div className="language-settings">
            <h3>{text[language].languageSettings}</h3>
            <div className="form-group">
              <label htmlFor="language">{text[language].selectLanguage}:</label>
              <select
                id="language"
                value={language}
                onChange={toggleLanguage}
                className="popselect"
              >
                <option value="en">{text[language].english}</option>
                <option value="fr">{text[language].french}</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
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
        )}
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