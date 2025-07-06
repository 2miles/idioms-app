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
  updateExamples: (idiomId: number, updatedExamples: Example[]) => Promise<Example[] | null>;
  deleteExampleById: (exampleId: number) => Promise<Example | null>;
  addExampleToIdiom: (idiomId: number, exampleText: string) => Promise<Example | null>;
  isLoading: boolean;
  hasFetched: boolean;
};

const defaultContext: IdiomsContextType = {
  idioms: [],
  setIdioms: () => {},
  addIdioms: async () => null,
  updateIdiom: async () => null,
  deleteIdiom: async () => {},
  updateExamples: async () => null,
  deleteExampleById: async () => null,
  addExampleToIdiom: async () => null,
  isLoading: true,
  hasFetched: false,
};

type IdiomsContextProviderProps = {
  children: ReactNode;
};

export const IdiomsContext = createContext<IdiomsContextType>(defaultContext);

export const IdiomsContextProvider = ({ children }: IdiomsContextProviderProps) => {
  const [idioms, setIdioms] = useState<Idiom[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);
  const getAuthorizedIdiomFinder = useAuthorizedIdiomFinder();

  const addPositionsToIdioms = (idioms: Idiom[]): Idiom[] => {
    const sorted = idioms.sort(
      (a, b) => new Date(b.timestamps).getTime() - new Date(a.timestamps).getTime(),
    );
    const total = sorted.length;
    return sorted.map((idiom, index) => ({ ...idiom, position: total - index }));
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await publicIdiomFinder.get('/');
      const fetchedIdioms = response.data.data.idioms;
      const fetchedExamples = response.data.data.examples;
      const idiomsWithExamples = fetchedIdioms.map((idiom: Idiom) => ({
        ...idiom,
        examples: fetchedExamples?.filter((ex: Example) => ex.idiom_id === idiom.id) || [],
      }));
      setIdioms(addPositionsToIdioms(idiomsWithExamples));
    } catch (err) {
      console.error('Failed to fetch idioms:', err);
    } finally {
      setIsLoading(false);
      setHasFetched(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Add, update, and delete idioms (recalculate positions after each operation)
  const addIdioms = async (idiom: NewIdiomInput): Promise<Idiom | null> => {
    try {
      const api = await getAuthorizedIdiomFinder();
      const response = await api.post('/', idiom);
      const newIdiom = response.data.data.idiom;
      setIdioms((prev) => addPositionsToIdioms([...prev, newIdiom]));
      return newIdiom;
    } catch (err) {
      console.error('Failed to add idiom:', err);
      return null;
    }
  };

  const updateIdiom = async (id: number, changes: UpdateIdiomInput): Promise<Idiom | null> => {
    try {
      const api = await getAuthorizedIdiomFinder();
      const response = await api.put(`/${id}`, changes);
      const updated = response.data.data.idiom;
      const preservedExamples = idioms.find((i) => i.id === id)?.examples || [];

      setIdioms((prev) =>
        addPositionsToIdioms(
          prev.map((idiom) =>
            idiom.id === id ? { ...updated, examples: preservedExamples } : idiom,
          ),
        ),
      );
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
      setIdioms((prev) => addPositionsToIdioms(prev.filter((idiom) => idiom.id !== id)));
    } catch (err) {
      console.error('Failed to delete idiom:', err);
    }
  };

  const updateExamples = async (
    idiomId: number,
    updatedExamples: Example[],
  ): Promise<Example[] | null> => {
    try {
      const api = await getAuthorizedIdiomFinder();
      const response = await api.put(`/${idiomId}/examples`, { examples: updatedExamples });
      const savedExamples = response.data?.examples ?? updatedExamples;

      setIdioms((prev) =>
        prev.map((idiom) => (idiom.id === idiomId ? { ...idiom, examples: savedExamples } : idiom)),
      );

      return savedExamples;
    } catch (err) {
      console.error('Failed to update examples:', err);
      return null;
    }
  };

  const deleteExampleById = async (exampleId: number): Promise<Example | null> => {
    try {
      const api = await getAuthorizedIdiomFinder();
      const response = await api.delete(`/examples/${exampleId}`);
      return response.data?.data?.example ?? null;
    } catch (err) {
      console.error('Failed to delete example:', err);
      return null;
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

      setIdioms((prev) =>
        prev.map((idiom) =>
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
        deleteExampleById,
        addExampleToIdiom,
        isLoading,
        hasFetched,
      }}
    >
      {children}
    </IdiomsContext.Provider>
  );
};
