'use client';

import React, { Suspense } from 'react';
import Dashboard from './Dashboard';
import { useSidebar } from '@/contexts/SidebarContext';

const page = () => {
  const { isCollapsed } = useSidebar();

  return (
    <div
      className={`flex-1 transition-all duration-300 ${
        isCollapsed ? 'md:w-full ' : ' md:ml-64'
      }`}
    >
      <Suspense>
        <Dashboard />
      </Suspense>
    </div>
  );
};

export default page;
