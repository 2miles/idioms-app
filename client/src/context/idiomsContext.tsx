import React, { useState, createContext, useEffect, ReactNode } from 'react';
import { Example, Idiom } from '@/types';
import { publicIdiomFinder } from '@/apis/idiomFinder';
import useAuthorizedIdiomFinder from '@/apis/useAuthorizedIdiomFinder';

type IdiomsContextType = {
  idioms: Idiom[];
  setIdioms: React.Dispatch<React.SetStateAction<Idiom[]>>;
  addIdioms: (idiom: Idiom) => Promise<void>;
  updateIdiom: (updatedIdiom: Idiom) => Promise<void>;
  deleteIdiom: (id: number) => Promise<void>;
  updateExamples: (idiomId: number, updatedExamples: Example[]) => Promise<void>;
  addExampleToIdiom: (idiomId: number, newExample: Example) => Promise<void>;
};

const defaultContext: IdiomsContextType = {
  idioms: [],
  setIdioms: () => {},
  addIdioms: async () => {},
  updateIdiom: async () => {},
  deleteIdiom: async () => {},
  updateExamples: async () => {},
  addExampleToIdiom: async () => {},
};

type IdiomsContextProviderProps = {
  children: ReactNode;
};

export const IdiomsContext = createContext<IdiomsContextType>(defaultContext);

export const IdiomsContextProvider = ({ children }: IdiomsContextProviderProps) => {
  const [idioms, setIdioms] = useState<Idiom[]>([]);
  const getAuthorizedIdiomFinder = useAuthorizedIdiomFinder();

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
    try {
      const response = await publicIdiomFinder.get('/');
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
    if (idioms.length > 0) {
      console.log('Data already fetched');
      return;
    }
    fetchData();
  }, []);

  // Add, update, and delete idioms (recalculate positions after each operation)

  const addIdioms = async (idiom: Idiom) => {
    try {
      const api = await getAuthorizedIdiomFinder();
      const response = await api.post('/', idiom); // idiom may need preprocessing depending on form structure

      const newIdiom = response.data.data.idiom;
      const updatedIdioms = addPositionsToIdioms([...idioms, newIdiom]);
      setIdioms(updatedIdioms);
    } catch (err) {
      console.error('Failed to add idiom:', err);
    }
  };

  const updateIdiom = async (updatedIdiom: Idiom) => {
    try {
      const api = await getAuthorizedIdiomFinder();
      const response = await api.put(`/${updatedIdiom.id}`, updatedIdiom);

      const updated = response.data.data.idiom;
      const updatedIdioms = addPositionsToIdioms(
        idioms.map((idiom) => (idiom.id === updated.id ? updated : idiom)),
      );
      setIdioms(updatedIdioms);
    } catch (err) {
      console.error('Failed to update idiom:', err);
    }
  };

  const deleteIdiom = async (id: number) => {
    try {
      const api = await getAuthorizedIdiomFinder();
      await api.delete(`/${id}`);
      const updatedIdioms = addPositionsToIdioms(idioms.filter((idiom) => idiom.id !== id));
      setIdioms(updatedIdioms);
    } catch (err) {
      console.error('Failed to delete idiom:', err);
    }
  };

  const updateExamples = async (idiomId: number, updatedExamples: Example[]) => {
    try {
      const api = await getAuthorizedIdiomFinder();
      await api.put(`/${idiomId}/examples`, { examples: updatedExamples });

      const updatedIdioms = idioms.map((idiom) =>
        idiom.id === idiomId ? { ...idiom, examples: updatedExamples } : idiom,
      );
      setIdioms(updatedIdioms);
    } catch (err) {
      console.error('Failed to update examples:', err);
    }
  };

  const addExampleToIdiom = async (idiomId: number, newExample: Example) => {
    try {
      const api = await getAuthorizedIdiomFinder();
      const response = await api.post(`/${idiomId}/examples`, newExample);

      const savedExample = response.data.data.example;
      setIdioms((prevIdioms) =>
        prevIdioms.map((idiom) =>
          idiom.id === idiomId
            ? { ...idiom, examples: [...(idiom.examples || []), savedExample] }
            : idiom,
        ),
      );
    } catch (err) {
      console.error('Failed to add example:', err);
    }
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
