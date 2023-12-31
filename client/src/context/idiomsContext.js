import React from 'react';
import { useState, createContext } from 'react';
 
export const IdiomsContext = createContext();


export const IdiomsContextProvider = props =>  {
  const [idioms, setIdioms] = useState([]);
  const [selectedIdiom, setSelectedIdiom] = useState(null);

  const addIdioms = (idiom) => {
    setIdioms([...idioms, idiom])
  }

  return (
    <IdiomsContext.Provider value={{idioms, setIdioms, addIdioms, selectedIdiom, setSelectedIdiom}}>
      {props.children}
    </IdiomsContext.Provider>
  )
}