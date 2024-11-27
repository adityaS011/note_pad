import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '@/services/firebase';
import { BiLogOutCircle } from 'react-icons/bi';
import { IconSideBar } from '@/icons';
import { MdMenu } from 'react-icons/md';
import { useSidebar } from '@/contexts/SidebarContext';
import NoteForm from './components/NoteForm';

export type Lists = { id: string; title: string; description?: string };

const Dashboard = () => {
  const [lists, setLists] = useState<Lists[]>([]);
  const [selectedList, setSelectedList] = useState<Lists>({
    title: '',
    description: '',
    id: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toggleSidebar } = useSidebar();
  const [textEditable, setTextEditable] = useState(false);

  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const listsCollectionRef = collection(db, 'lists');

  useEffect(() => {
    const fetchLists = async () => {
      const data = await getDocs(listsCollectionRef);
      setLists(
        data.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Lists[]
      );
    };
    fetchLists();
    return () => {
      setTextEditable(false);
    };
  }, []);

  useEffect(() => {
    const fetchListById = async () => {
      if (id) {
        setIsLoading(true);
        const docRef = doc(db, 'lists', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setSelectedList({ id, ...data } as Lists);
        } else {
          setSelectedList({
            title: '',
            description: '',
            id: '', // Ensure it's empty for new creation
          });
        }
        setIsLoading(false);
      } else {
        setSelectedList({
          title: '',
          description: '',
          id: '', // No id for a new list
        });
      }
    };
    fetchListById();
  }, [id]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedList((prevSelectedList) => ({
      ...prevSelectedList,
      title: e.target.value,
    }));
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedList((prevSelectedList) => ({
      ...prevSelectedList,
      description: e.target.value,
    }));
  };

  const handleUpdateList = async (updatedList: Lists) => {
    if (!updatedList.id) return; // Ensure we don't try to update without an id
    setIsLoading(true);
    const listDoc = doc(db, 'lists', updatedList.id);
    await updateDoc(listDoc, {
      title: updatedList.title,
      description: updatedList.description,
    });
    setLists((prevLists) =>
      prevLists.map((list) => (list.id === updatedList.id ? updatedList : list))
    );
    setIsLoading(false);
  };

  const handleAddList = async (newList: Lists) => {
    if (!newList.title || !newList.description) return; // Prevent adding incomplete lists
    setIsLoading(true);

    // Do not include id for new list; Firestore will generate it
    const docRef = await addDoc(listsCollectionRef, {
      title: newList.title,
      description: newList.description,
    });

    // Now we can add the new list with the generated id
    setLists([
      ...lists,
      { ...newList, id: docRef.id }, // Add the generated id to the list
    ]);
    setIsLoading(false);
  };

  const handleDeleteList = async () => {
    if (!selectedList || !selectedList.id) return;
    setIsLoading(true);
    const listDoc = doc(db, 'lists', selectedList.id);
    await deleteDoc(listDoc);
    setLists(lists.filter((list) => list.id !== selectedList.id));
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className='flex h-screen'>
        <div className='flex-1 h-full'>
          <div className=' inset-0 flex h-full justify-center items-center bg-gray-200 bg-opacity-50 z-10'>
            <div className='w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin'></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex h-screen'>
      <div className='flex-1'>
        <div className='w-full flex justify-between items-center gap-4 border-b h-14 pt-1'>
          <div
            className='mr-8 p-1 rounded-full cursor-pointer ml-2 hover:bg-slate-100 left-0 opacity-80'
            onClick={() => toggleSidebar()}
          >
            <IconSideBar className='w-6 h-6 hidden md:block' />
            <MdMenu className='w-6 h-6 md:hidden block' />
          </div>
          <div
            className='flex-1 text-center px-8 flex justify-center items-center relative'
            onClick={() => setTextEditable(true)}
            onBlur={() => {
              setTextEditable(false);
            }}
          >
            {!textEditable ? (
              <div className='flex justify-center items-center gap-2 w-full cursor-pointer font-bold'>
                <span className='text-2xl'>
                  {selectedList?.title || 'Sample Title (new)'}
                </span>
                <span className='hidden group-hover:block'>✏️</span>
              </div>
            ) : (
              <input
                type='text'
                value={selectedList?.title || ''}
                onChange={handleTitleChange}
                className='bg-slate-100 focus:outline-none w-full px-8 py-2'
              />
            )}
          </div>
          <div className='px-8'>
            <BiLogOutCircle className='w-6 h-6 text-gray-500' />
          </div>
        </div>

        <NoteForm
          currentList={selectedList}
          setCurrentList={setSelectedList}
          list={selectedList}
          onSave={selectedList.id ? handleUpdateList : handleAddList}
          onDelete={selectedList.id ? handleDeleteList : undefined}
        />
      </div>
    </div>
  );
};

export default Dashboard;
