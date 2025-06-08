import React, { useState, createContext, useEffect, ReactNode } from 'react';
import { Example, Idiom, NewIdiomInput, UpdateIdiomInput } from '@/types';
import { publicIdiomFinder } from '@/apis/idiomFinder';
import useAuthorizedIdiomFinder from '@/apis/useAuthorizedIdiomFinder';

type IdiomsContextType = {
  idioms: Idiom[];
  setIdioms: React.Dispatch<React.SetStateAction<Idiom[]>>;
  addIdioms: (idiom: NewIdiomInput) => Promise<Idiom | null>;
  updateIdiom: (id: number, changes: UpdateIdiomInput) => Promise<Idiom | null>;
  deleteIdiom: (id: number) => Promise<void>;
  updateExamples: (idiomId: number, updatedExamples: Example[]) => Promise<void>;
  addExampleToIdiom: (idiomId: number, exampleText: string) => Promise<Example | null>;
};

const defaultContext: IdiomsContextType = {
  idioms: [],
  setIdioms: () => {},
  addIdioms: async () => null,
  updateIdiom: async () => null,
  deleteIdiom: async () => {},
  updateExamples: async () => {},
  addExampleToIdiom: async () => null,
};

type IdiomsContextProviderProps = {
  children: ReactNode;
};

export const IdiomsContext = createContext<IdiomsContextType>(defaultContext);

export const IdiomsContextProvider = ({ children }: IdiomsContextProviderProps) => {
  const [idioms, setIdioms] = useState<Idiom[]>([]);
  const getAuthorizedIdiomFinder = useAuthorizedIdiomFinder();

  const addPositionsToIdioms = (idioms: Idiom[]): Idiom[] => {
    const sorted = idioms.sort(
      (a: Idiom, b: Idiom) => new Date(b.timestamps).getTime() - new Date(a.timestamps).getTime(),
    );
    const total = sorted.length;
    return sorted.map((idiom, index) => ({ ...idiom, position: total - index }));
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
  const addIdioms = async (idiom: NewIdiomInput): Promise<Idiom | null> => {
    try {
      const api = await getAuthorizedIdiomFinder();
      const response = await api.post('/', idiom);
      const newIdiom = response.data.data.idiom;
      const updatedIdioms = addPositionsToIdioms([...idioms, newIdiom]);
      setIdioms(updatedIdioms);
      return newIdiom;
    } catch (err) {
      console.error('Failed to add idiom:', err);
      return null;
    }
  };

  const updateIdiom = async (id: number, changes: UpdateIdiomInput) => {
    try {
      const api = await getAuthorizedIdiomFinder();
      const response = await api.put(`/${id}`, changes);

      const updated = response.data.data.idiom;
      const existing = idioms.find((i) => i.id === id);
      const preservedExamples = existing?.examples ?? [];

      const updatedIdioms = addPositionsToIdioms(
        idioms.map((idiom) =>
          idiom.id === id ? { ...updated, examples: preservedExamples } : idiom,
        ),
      );
      setIdioms(updatedIdioms);
      return updated;
    } catch (err) {
      console.error('Failed to update idiom:', err);
      return null;
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

  const addExampleToIdiom = async (
    idiomId: number,
    exampleText: string,
  ): Promise<Example | null> => {
    try {
      const api = await getAuthorizedIdiomFinder();
      const response = await api.post(`/${idiomId}/examples`, {
        example: exampleText.trim() || null,
      });

      const savedExample = response.data.data.example;
      setIdioms((prevIdioms) =>
        prevIdioms.map((idiom) =>
          idiom.id === idiomId
            ? { ...idiom, examples: [...(idiom.examples || []), savedExample] }
            : idiom,
        ),
      );
      return savedExample;
    } catch (err) {
      console.error('Failed to add example:', err);
      return null;
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
