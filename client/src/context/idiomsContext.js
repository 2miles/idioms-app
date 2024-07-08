import React from 'react';
import { useState, createContext } from 'react';

// This context object will hold the shared state and functions related to
// idioms that can be accessed by any component within its subtree.
export const IdiomsContext = createContext();

export const IdiomsContextProvider = (props) => {
  const [idioms, setIdioms] = useState([]);
  const [selectedIdiom, setSelectedIdiom] = useState(null);

  const addIdioms = (idiom) => {
    setIdioms((prevIdioms) => [...prevIdioms, idiom]);
  };

  return (
    // This means that any components nested inside IdiomsContextProvider in the component tree will
    // have access to the values provided by the value prop
    // It provides these values to any component that needs them via the IdiomsContext.Provider,
    // allowing for state management and sharing across your application's component tree.
    <IdiomsContext.Provider
      value={{ idioms, setIdioms, addIdioms, selectedIdiom, setSelectedIdiom }}
    >
      {props.children}
    </IdiomsContext.Provider>
  );
};
