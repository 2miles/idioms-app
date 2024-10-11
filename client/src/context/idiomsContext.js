import React, { useState, createContext, useEffect } from 'react';
import IdiomFinder from '../apis/idiomFinder';

// This context object will hold the shared state and functions related to
// idioms that can be accessed by any component within its subtree.
export const IdiomsContext = createContext();

export const IdiomsContextProvider = (props) => {
  const [idioms, setIdioms] = useState([]);
  const [selectedIdiom, setSelectedIdiom] = useState(null);

  // Calculate the positions of idioms based on their timestamps
  // Adds a position field to the idioms
  const addPositionsToIdioms = (idioms) => {
    return idioms
      .sort((a, b) => new Date(a.timestamps) - new Date(b.timestamps))
      .map((idiom, index) => ({
        ...idiom,
        position: index + 1,
      }));
  };

  // Fetch idioms from the API and set initial positions
  const fetchData = async () => {
    try {
      const response = await IdiomFinder.get('/');
      const idiomsWithPositions = addPositionsToIdioms(response.data.data.idioms);
      setIdioms(idiomsWithPositions);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Add an idiom and recalculate positions
  const addIdioms = (idiom) => {
    const updatedIdioms = addPositionsToIdioms([...idioms, idiom]);
    setIdioms(updatedIdioms);
  };

  // Update an idiom and recalculate positions
  const updateIdiom = (updatedIdiom) => {
    const updatedIdioms = addPositionsToIdioms(
      idioms.map((idiom) => (idiom.id === updatedIdiom.id ? updatedIdiom : idiom)),
    );
    setIdioms(updatedIdioms);
  };

  // Delete an idiom and recalculate positions
  const deleteIdiom = (id) => {
    const updatedIdioms = addPositionsToIdioms(idioms.filter((idiom) => idiom.id !== id));
    setIdioms(updatedIdioms);
  };

  // This means that any components nested inside IdiomsContextProvider in the component tree will
  // have access to the values provided by the value prop
  // It provides these values to any component that needs them via the IdiomsContext.Provider,
  // allowing for state management and sharing across your application's component tree.
  return (
    <IdiomsContext.Provider
      value={{
        idioms,
        setIdioms,
        addIdioms,
        updateIdiom,
        deleteIdiom,
        selectedIdiom,
        setSelectedIdiom,
      }}
    >
      {props.children}
    </IdiomsContext.Provider>
  );
};
