import React, { useState, createContext, useEffect, ReactNode } from 'react';
import { Example, Idiom } from '@/types';
import IdiomFinder from '@/apis/idiomFinder';
import useAuthToken from '@/hooks/useAuthToken';

type IdiomsContextType = {
  idioms: Idiom[];
  setIdioms: React.Dispatch<React.SetStateAction<Idiom[]>>;
  addIdioms: (idiom: Idiom) => void;
  updateIdiom: (updatedIdiom: Idiom) => void;
  deleteIdiom: (id: number) => void;
  updateExamples: (idiomId: number, updatedExamples: Example[]) => void;
  addExampleToIdiom: (idiomId: number, newExample: Example) => void;
};

// Default context values
const defaultContext: IdiomsContextType = {
  idioms: [],
  setIdioms: () => {},
  addIdioms: () => {},
  updateIdiom: () => {},
  deleteIdiom: () => {},
  updateExamples: () => {},
  addExampleToIdiom: () => {},
};

type IdiomsContextProviderProps = {
  children: ReactNode;
};

export const IdiomsContext = createContext<IdiomsContextType>(defaultContext);

export const IdiomsContextProvider = ({ children }: IdiomsContextProviderProps) => {
  const [idioms, setIdioms] = useState<Idiom[]>([]);
  const token = useAuthToken();

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

  const fetchData = async () => {
    if (!token) {
      console.error('Access token is missing. Please log in.');
      return;
    }

    try {
      const response = await IdiomFinder.get('/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const fetchedIdioms = response.data.data.idioms;
      const fetchedExamples = response.data.data.examples;
      const idiomsWithExamples = fetchedIdioms.map((idiom: Idiom) => ({
        ...idiom,
        examples: fetchedExamples
          ? fetchedExamples.filter((example: Example) => example.idiom_id === idiom.id)
          : [],
      }));
      setIdioms(addPositionsToIdioms(idiomsWithExamples));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!token) {
      console.log('Token is not available yet.');
      return; // Prevent fetching data if no token is available
    }
    if (idioms.length > 0) {
      console.log('Data already fetched');
      return;
    }
    fetchData();
  }, [token]); // Fetch only when the token is available

  // Add, update, and delete idioms (recalculate positions after each operation)
  const addIdioms = (idiom: Idiom) => {
    const updatedIdioms = addPositionsToIdioms([...idioms, idiom]);
    setIdioms(updatedIdioms);
  };

  const updateIdiom = (updatedIdiom: Idiom) => {
    const updatedIdioms = addPositionsToIdioms(
      idioms.map((idiom: Idiom) => (idiom.id === updatedIdiom.id ? updatedIdiom : idiom)),
    );
    setIdioms(updatedIdioms);
  };

  const deleteIdiom = (id: number) => {
    const updatedIdioms = addPositionsToIdioms(idioms.filter((idiom: Idiom) => idiom.id !== id));
    setIdioms(updatedIdioms);
  };

  // Add, update, and delete examples
  const updateExamples = (idiomId: number, updatedExamples: Example[]) => {
    const updatedIdioms = idioms.map((idiom: Idiom) =>
      idiom.id === idiomId ? { ...idiom, examples: updatedExamples } : idiom,
    );
    setIdioms(updatedIdioms);
  };

  const addExampleToIdiom = (idiomId: number, newExample: Example) => {
    setIdioms((prevIdioms) =>
      prevIdioms.map((idiom) =>
        idiom.id === idiomId
          ? { ...idiom, examples: [...(idiom.examples || []), newExample] }
          : idiom,
      ),
    );
  };

  return (
    <IdiomsContext.Provider
      value={{
        idioms,
        setIdioms,
        addIdioms,
        updateIdiom,
        deleteIdiom,
        updateExamples,
        addExampleToIdiom,
      }}
    >
      {children}
    </IdiomsContext.Provider>
  );
};
