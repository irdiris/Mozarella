import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'en' ? 'fr' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const text = {
  en: {
    settings: 'Settings',
    accountSettings: 'Account Settings',
    languageSettings: 'Language Settings',
    userManagement: 'User Management',
    selectLanguage: 'Select Language',
    english: 'English',
    french: 'French',
    username: 'Username',
    email: 'Email',
    organizationName: 'Organization Name',
    updateAccount: 'Update Account',
    changePassword: 'Change Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmNewPassword: 'Confirm New Password',
    createNewAccount: 'Create New Account',
    role: 'Role',
    actions: 'Actions',
    resetPassword: 'Reset Password',
    admin: 'Admin',
    user: 'User',
    submit: 'Submit',
    employees: 'Employees',
    groups: 'Groups',
    addNewEmployee: 'Add New Employee',
    addNewGroup: 'Add New Group',
    firstName: 'First Name',
    lastName: 'Last Name',
    type: 'Type',
    manager: 'Manager',
    modify: 'Modify',
    delete: 'Delete',
    cancel: 'Cancel'
  },
  fr: {
    settings: 'Paramètres',
    accountSettings: 'Paramètres du compte',
    languageSettings: 'Paramètres de langue',
    userManagement: 'Gestion des utilisateurs',
    selectLanguage: 'Choisir la langue',
    english: 'Anglais',
    french: 'Français',
    username: 'Nom d\'utilisateur',
    email: 'Email',
    organizationName: 'Nom de l\'organisation',
    updateAccount: 'Mettre à jour le compte',
    changePassword: 'Changer le mot de passe',
    currentPassword: 'Mot de passe actuel',
    newPassword: 'Nouveau mot de passe',
    confirmNewPassword: 'Confirmer le nouveau mot de passe',
    createNewAccount: 'Créer un nouveau compte',
    role: 'Rôle',
    actions: 'Actions',
    resetPassword: 'Réinitialiser le mot de passe',
    admin: 'Administrateur',
    user: 'Utilisateur',
    submit: 'Soumettre',
    employees: 'Employés',
    groups: 'Groupes',
    addNewEmployee: 'Ajouter un nouvel employé',
    addNewGroup: 'Ajouter un nouveau groupe',
    firstName: 'Prénom',
    lastName: 'Nom',
    type: 'Type',
    manager: 'Gestionnaire',
    modify: 'Modifier',
    delete: 'Supprimer',
    cancel: 'Annuler'
  }
};