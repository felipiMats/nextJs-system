'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Navbar } from '@/components/Navbar';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarExpanded, setSidebarExpanded] = useState(true);

  return (
    <div className="flex">
      <Navbar onToggleSidebar={() => setSidebarExpanded(!isSidebarExpanded)} />
      <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setSidebarExpanded} />
      <main
        className={`flex-1 p-4 transition-all duration-300 ${
          isSidebarExpanded ? "ml-0 sm:ml-64" : "ml-0 sm:ml-20"
        } mt-16`}
      >
        {children}
      </main>
    </div>
  );
}
