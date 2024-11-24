import React from 'react';
import { BiLogOutCircle } from 'react-icons/bi';
import { IconSideBar } from '@/icons';
import { MdMenu } from 'react-icons/md';
import { useSidebar } from '@/contexts/SidebarContext';

const Navbar = () => {
  const { toggleSidebar } = useSidebar();
  return (
    <div className='w-full justify-between flex flex-row items-center gap-4 border-b h-14 pt-1'>
      <div
        className='mr-8 p-1 rounded-full cursor-pointer ml-2 hover:bg-slate-100 left-0 opacity-80'
        onClick={toggleSidebar}
      >
        <IconSideBar className='w-6 h-6 hidden md:block' />

        <MdMenu className='w-6 h-6 md:hidden block' />
      </div>
      <div className='px-8 right-0'>
        <BiLogOutCircle className='w-6 h-6 text-gray-500' />
      </div>
    </div>
  );
};

export default Navbar;
