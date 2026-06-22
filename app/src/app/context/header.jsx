import React, { createContext, useContext, useState } from 'react';

const HeaderStateContext = createContext();

export const HeaderContextProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <HeaderStateContext.Provider value={{
      isMenuOpen, setIsMenuOpen,
      toggleMenu,
    }}>
      {children}
    </HeaderStateContext.Provider>
  )
}

export const useHeaderContext = () => useContext(HeaderStateContext);