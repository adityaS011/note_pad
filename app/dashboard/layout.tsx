import Sidebar from '@/components/Sidebar';
import { ListsProvider } from '@/contexts/ListContext';
import { SidebarProvider } from '@/contexts/SidebarContext';
import React from 'react';

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='w-screen min-h-screen h-full flex flex-col gap-2 overflow-hidden'>
      <div className='flex h-screen'>
        <ListsProvider>
          <SidebarProvider>
            <Sidebar />
            <div className='flex-1'>{children}</div>
          </SidebarProvider>
        </ListsProvider>
      </div>
    </div>
  );
};

export default layout;
