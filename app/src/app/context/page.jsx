import React, { createContext, useContext, useState } from 'react';

const PageStateContext = createContext();

export const PageContextProvider = ({ children }) => {
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  return (
    <PageStateContext.Provider value={{
      breadcrumbs, setBreadcrumbs
    }}>
      {children}
    </PageStateContext.Provider>
  )
}

export const usePageContext = () => useContext(PageStateContext);