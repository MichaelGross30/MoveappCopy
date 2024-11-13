import React, { createContext, useState, useContext } from 'react';

// Create a Context for MoveDetails
const MoveDetailsContext = createContext();

// Provider component
export const MoveDetailsProvider = ({ children }) => {
  // State to hold moveDetails
  const [moveDetails, setMoveDetails] = useState({
    name: '',
    description: '',
    MOVEPicture: '',
    invitedUsers: [],
    startDateTime: '',
    endDateTime: '',
    lockedGallery: false,
    location: '',
    maxUsers: 0,
  });

  return (
    <MoveDetailsContext.Provider value={{ moveDetails, setMoveDetails }}>
      {children}
    </MoveDetailsContext.Provider>
  );
};

// Custom hook to use MoveDetailsContext
export const useMoveDetails = () => {
  const context = useContext(MoveDetailsContext);
  if (!context) {
    throw new Error('useMoveDetails must be used within a MoveDetailsProvider');
  }
  return context;
};


