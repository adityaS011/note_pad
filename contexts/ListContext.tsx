'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '@/services/firebase';

export type Lists = { id?: string; title: string; description: string };

type ListsContextType = {
  lists: Lists[];
  isLoading: boolean;
  selectedList: Lists | null;
  fetchLists: () => Promise<void>;
  addList: (newList: Lists) => Promise<void>;
  updateList: (updatedList: Lists) => Promise<void>;
  deleteList: (id: string) => Promise<void>;
  selectList: (list: Lists | null) => void;
};

const ListsContext = createContext<ListsContextType | undefined>(undefined);

export const ListsProvider = ({ children }: { children: React.ReactNode }) => {
  const [lists, setLists] = useState<Lists[]>([]);
  const [selectedList, setSelectedList] = useState<Lists | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const listsCollectionRef = collection(db, 'lists');

  const fetchLists = async () => {
    setIsLoading(true);
    const data = await getDocs(listsCollectionRef);
    setLists(
      data.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Lists[]
    );
    setIsLoading(false);
  };

  const addList = async (newList: Lists) => {
    const docRef = await addDoc(listsCollectionRef, newList);
    setLists([...lists, { ...newList, id: docRef.id }]);
  };

  const updateList = async (updatedList: Lists) => {
    if (!updatedList.id) return;
    const listDoc = doc(db, 'lists', updatedList.id);
    await updateDoc(listDoc, {
      title: updatedList.title,
      description: updatedList.description,
    });
    setLists(
      lists.map((list) => (list.id === updatedList.id ? updatedList : list))
    );
  };

  const deleteList = async (id: string) => {
    const listDoc = doc(db, 'lists', id);
    await deleteDoc(listDoc);
    setLists(lists.filter((list) => list.id !== id));
  };

  const selectList = (list: Lists | null) => setSelectedList(list);

  useEffect(() => {
    fetchLists();
  }, []);

  return (
    <ListsContext.Provider
      value={{
        lists,
        isLoading,
        selectedList,
        fetchLists,
        addList,
        updateList,
        deleteList,
        selectList,
      }}
    >
      {children}
    </ListsContext.Provider>
  );
};

export const useLists = () => {
  const context = useContext(ListsContext);
  if (!context) {
    throw new Error('useLists must be used within a ListsProvider');
  }
  return context;
};
