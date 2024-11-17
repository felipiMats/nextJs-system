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
    <div className="flex flex-col min-h-screen">
      <Navbar onToggleSidebar={() => setSidebarExpanded(!isSidebarExpanded)} />
      <div className="flex flex-1">
        <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setSidebarExpanded} />
        <main
          className={`flex-1 p-4 transition-all duration-300 ${
            isSidebarExpanded ? "ml-0 sm:ml-64" : "ml-0 sm:ml-20"
          } mt-16`}
        >
          {children}
        </main>
      </div>
      <footer className="w-full bg-gray-50 text-center py-2 mt-auto">
        <p className="text-xs text-gray-400">
          Desenvolvido com <strong>S2</strong> por @FelipiMats
        </p>
      </footer>
    </div>
  );
}
