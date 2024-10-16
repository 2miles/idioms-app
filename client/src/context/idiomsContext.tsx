import React, { useState, createContext, useEffect, ReactNode } from 'react';

import { Idiom } from 'types';
import IdiomFinder from 'apis/idiomFinder';

// Define the structure of the context
type IdiomsContextType = {
  idioms: Idiom[];
  selectedIdiom: Idiom | null;
  setIdioms: React.Dispatch<React.SetStateAction<Idiom[]>>;
  setSelectedIdiom: React.Dispatch<React.SetStateAction<Idiom | null>>;
  addIdioms: (idiom: Idiom) => void;
  updateIdiom: (updatedIdiom: Idiom) => void;
  deleteIdiom: (id: number) => void;
};

// Placeholder data and functions that will be overridden in provider
const defaultContext: IdiomsContextType = {
  idioms: [],
  selectedIdiom: null,
  setIdioms: () => {},
  setSelectedIdiom: () => {},
  addIdioms: () => {},
  updateIdiom: () => {},
  deleteIdiom: () => {},
};

type IdiomsContextProviderProps = {
  children: ReactNode;
};
// Create the context with a default value
// This context object will hold the shared state and functions related to
export const IdiomsContext = createContext<IdiomsContextType>(defaultContext);

export const IdiomsContextProvider = ({ children }: IdiomsContextProviderProps) => {
  const [idioms, setIdioms] = useState<Idiom[]>([]);
  const [selectedIdiom, setSelectedIdiom] = useState<Idiom | null>(null);

  // Calculate the positions of idioms based on their timestamps
  // Updates / adds a position field
  const addPositionsToIdioms = (idioms: Idiom[]): Idiom[] => {
    return idioms
      .sort(
        (a: Idiom, b: Idiom) => new Date(a.timestamps).getTime() - new Date(b.timestamps).getTime(),
      )
      .map((idiom: Idiom, index: number) => ({
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
  const addIdioms = (idiom: Idiom) => {
    const updatedIdioms = addPositionsToIdioms([...idioms, idiom]);
    setIdioms(updatedIdioms);
  };

  // Update an idiom and recalculate positions
  const updateIdiom = (updatedIdiom: Idiom) => {
    const updatedIdioms = addPositionsToIdioms(
      idioms.map((idiom: Idiom) => (idiom.id === updatedIdiom.id ? updatedIdiom : idiom)),
    );
    setIdioms(updatedIdioms);
  };

  // Delete an idiom and recalculate positions
  const deleteIdiom = (id: number) => {
    const updatedIdioms = addPositionsToIdioms(idioms.filter((idiom: Idiom) => idiom.id !== id));
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
        selectedIdiom,
        setIdioms,
        addIdioms,
        updateIdiom,
        deleteIdiom,
        setSelectedIdiom,
      }}
    >
      {children}
    </IdiomsContext.Provider>
  );
};
