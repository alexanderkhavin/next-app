// components/LayoutWithSidebar.tsx
'use client';

import { useState } from 'react';
import Sidebar from './Sidebar/Sidebar';

interface LayoutWithSidebarProps {
  children: React.ReactNode;
}

const LayoutWithSidebar: React.FC<LayoutWithSidebarProps> = ({ children }) => {
  const [isCompact, setIsCompact] = useState(false);

  const toggleSidebar = () => {
    setIsCompact(!isCompact);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Сайдбар */}
      <div className="flex-shrink-0" >
        <Sidebar isCompact={isCompact} onToggle={toggleSidebar} />
      </div>

      {/* Основная область */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Хедер с кнопкой переключения */}
        <header className="border-b border-gray-200 dark:border-slate-700 p-4 flex-shrink-0 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              aria-label={isCompact ? "Развернуть меню" : "Свернуть меню"}
            >
              <svg
                className="w-5 h-5 text-gray-600 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-400 dark:bg-gray-700 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">{"Иванов Иван Иванович".split(' ').map((n: string) => n[0]).slice(0,2).join('').toUpperCase()}</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Иванов И.И.</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">n0000-00-000</p>
              </div>
            </div>
          </div>
        </header>

        {/* Основной контент */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default LayoutWithSidebar;