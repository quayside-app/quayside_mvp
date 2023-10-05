'use client'

import React, { createContext, useContext, useState } from 'react';

// Create a Context object.
const ApiResponseContext = createContext();

// Custom hook to use the Context.
export const useApiResponse = () => {
  return useContext(ApiResponseContext);
};

// Provider component to wrap the parts of your app where you want to access the API response.
export const ApiResponseProvider = ({ children }) => {
  const [apiResponse, setApiResponse] = useState(null);

  return (
    <ApiResponseContext.Provider value={{ apiResponse, setApiResponse }}>
      {children}
    </ApiResponseContext.Provider>
  );
};