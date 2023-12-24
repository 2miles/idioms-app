import React from 'react';
import { useState, createContext } from 'react';
 
export const IdiomsContext = createContext();


export const IdiomsContextProvider = props =>  {
  const [idioms, setIdioms] = useState([]);

  const addIdioms = (idiom) => {
    setIdioms([...idioms, idiom])
  }

  return (
    <IdiomsContext.Provider value={{idioms, setIdioms, addIdioms}}>
      {props.children}
    </IdiomsContext.Provider>
  )
}