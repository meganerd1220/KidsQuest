import React, { createContext, useContext, useState } from 'react';

// Create a new context
const UserIdContext = createContext();

// Create a provider for the context
export const UserIdProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  return (
    <UserIdContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserIdContext.Provider>
  );
};

// Custom hook for using UserIdContext
export const useUserId = () => useContext(UserIdContext);