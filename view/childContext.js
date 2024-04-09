import React, { createContext, useState, useContext } from 'react';

// child name

const ChildNameContext = createContext();

export const ChildNameProvider = ({ children }) => {
  const [childName, setChildName] = useState(null);

  return (
    <ChildNameContext.Provider value={{ childName, setChildName }}>
      {children}
    </ChildNameContext.Provider>
  );
};
// hook
export const useChildName = () => useContext(ChildNameContext);

// child ID

const ChildIDContext = createContext();

export const ChildIDProvider = ({ children }) => {
  const [childID, setChildID] = useState(null);

  return (
    <ChildIDContext.Provider value={{ childID, setChildID }}>
      {children}
    </ChildIDContext.Provider>
  );
};
//hook
export const useChildID = () => useContext(ChildIDContext);