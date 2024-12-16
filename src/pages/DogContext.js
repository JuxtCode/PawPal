import React, { createContext, useState } from 'react';

export const DogContext = createContext();

export const DogProvider = ({ children }) => {
  const [dogs, setDogs] = useState([]); // Shared state for dog data

  return (
    <DogContext.Provider value={{ dogs, setDogs }}>
      {children}
    </DogContext.Provider>
  );
};
