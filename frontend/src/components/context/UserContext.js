
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //  need Simulating an API call to get user data
    const fetchUser = async () => {
      try {
        //  API call...
        const response = await new Promise(resolve => 
          setTimeout(() => resolve({ 
            id: 1, 
            name: 'John Doe', 
            email: 'john@example.com', 
            role: 'manager' 
          }), 1000)
        );
        setUser(response);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    // Implement login logic here.....
    setLoading(true);
    try {
      // Replace this with API calll
      const response = await new Promise(resolve =>
        setTimeout(() => resolve({ 
          id: 1, 
          name: 'John Doe', 
          email: email, 
          role: 'manager' 
        }), 1000)
      );
      setUser(response);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // Implement logout logic here....
    setUser(null);
  };

  const updateUser = (updatedInfo) => {
    setUser(prevUser => ({ ...prevUser, ...updatedInfo }));
  };

  return (
    <UserContext.Provider value={{ user, loading, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Export the UserContext itself
export { UserContext };
