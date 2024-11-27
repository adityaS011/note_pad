// components/Sidebar.tsx
'use client';

import React, { useEffect } from 'react';
import { useSidebar } from '@/contexts/SidebarContext';
import { useRouter } from 'next/navigation';
import { Lists, useLists } from '@/contexts/ListContext';

const Sidebar = () => {
  const { isCollapsed, toggleSidebar } = useSidebar();
  const { lists, selectedList, selectList, fetchLists } = useLists();
  const router = useRouter();

  const handleNavigation = (list: Lists) => {
    if (!list) return;
    if (selectedList?.id === list.id) {
      router.push('/dashboard');
      selectList(null);
      return;
    }
    router.push(`/dashboard/?id=${list.id}`);
    selectList(list);
  };
  useEffect(() => {
    fetchLists();
  }, [lists]);
  return (
    <div
      className={`transition-transform transform ${
        isCollapsed ? '-translate-x-full' : 'translate-x-0'
      } fixed  z-10 w-screen md:w-64 bg-[#F1F2F7] h-screen  border `}
    >
      <div className='flex justify-between items-center h-14 px-4 border-b border-[#C8CBD9]'>
        <h2 className='font-bold text-lg'>Notes</h2>
        <button onClick={toggleSidebar} className='md:hidden text-gray-700'>
          {isCollapsed ? '☰' : '✖'}
        </button>
      </div>
      <div className='py-2 mt-4 h-full justify-between flex flex-col gap-2'>
        <div className='flex flex-col gap-6'>
          <button
            onClick={() => {
              toggleSidebar();
              router.push('/dashboard');
            }}
            className='text-green-500 border mx-4 rounded bg-slate-50 border-green-500 px-2 py-1 hover:bg-green-500 hover:text-white'
          >
            + Create
          </button>
          <div className='flex-grow overflow-y-auto gap-2 flex flex-col no-scrollbars'>
            <input
              placeholder='Search..'
              className='focus:outline-none border p-2 mx-4 rounded bg-slate-50 text-black'
            />
            <div className='flex-grow min-h-0  no-scrollbars'>
              {lists.map((list) => (
                <div
                  key={list.id}
                  onClick={() => handleNavigation(list)}
                  className={`${
                    selectedList?.id === list.id
                      ? 'bg-[#b2bcf8]'
                      : 'hover:bg-[#c5cae9]'
                  }`}
                >
                  <div className='px-3  mr-2 ml-4 cursor-pointer  '>
                    <h3 className='font-medium  opacity-80 border-b-[0.5px] pt-2 truncate border-[#cdcfda]  pb-1 '>
                      {list.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
