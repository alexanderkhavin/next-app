// components/sidebar/Sidebar.tsx
'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import SidebarHeader from './SidebarHeader';
import SidebarItem from './SidebarItem';
import SidebarFooter from './SidebarFooter';
import { CalendarCheck2, FileText, ShieldCheck } from "lucide-react";

interface SidebarProps {
  isCompact?: boolean;
  onToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCompact = false, onToggle }) => {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState('');

  useEffect(() => {
    if (pathname === '/documents') setActiveItem('documents');
    else if (pathname === '/admin') setActiveItem('admin');
    else setActiveItem('');
  }, [pathname]);

  const menuItems = [
        { id: 'documents', label: 'Документы', icon: <FileText color="#ffffff" />, href: '/documents' },
        { id: 'admin', label: 'Администрирование', icon: <ShieldCheck color="#ffffff" />, href: '/admin' },
    ];

  return (
    <aside
      className={`
        bg-blue-800 dark:bg-gray-800
        h-full
        flex flex-col
        transition-all duration-300 ease-in-out
        ${isCompact ? 'w-20' : 'w-64'}
      `}
    >
      <SidebarHeader isCompact={isCompact} onToggle={onToggle} />
      <nav className="flex-1 px-3 space-y-2">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            isActive={activeItem === item.id}
            isCompact={isCompact}
            onClick={() => setActiveItem(item.id)}
          />
        ))}
      </nav>

      <SidebarFooter isCompact={isCompact} />
    </aside>
  );
};

export default Sidebar;