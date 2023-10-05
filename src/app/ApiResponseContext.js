'use client'

import React, { createContext, useContext, useState } from 'react'

/**
 * Context specifically for storing and accessing the API response data.
 */
const ApiResponseContext = createContext()

/**
 * Hook that provides a shortcut for accessing the API response context.
 *
 * @returns {Object} Context object containing `apiResponse` data and its setter `setApiResponse`.
 */
export const useApiResponse = () => {
  return useContext(ApiResponseContext)
}

/**
 * A provider component that wraps parts of the application where the API
 * response should be accessible. The children components can read or
 * update the API response.
 *
 * @param {React.ReactNode} props.children - React children components.
 *
 * @returns {React.ReactNode} Children components wrapped with the context provider.
 */
export const ApiResponseProvider = ({ children }) => {
  const [apiResponse, setApiResponse] = useState(null)

  return (
    <ApiResponseContext.Provider value={{ apiResponse, setApiResponse }}>
      {children}
    </ApiResponseContext.Provider>
  )
}
