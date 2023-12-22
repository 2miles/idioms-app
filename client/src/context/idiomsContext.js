import React from 'react';
import { useState, createContext } from 'react';

export const IdiomsContext = createContext()

export const IdiomsContextProvider = props =>  {
  const [idioms, setIdioms] = useState([])
  return (
    <IdiomsContext.Provider value={{idioms, setIdioms}}>
      {props.children}
    </IdiomsContext.Provider>
  )
}