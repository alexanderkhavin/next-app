// components/sidebar/Sidebar.tsx
'use client';

import { useState } from 'react';
import SidebarHeader from './SidebarHeader';
import SidebarItem from './SidebarItem';
import SidebarFooter from './SidebarFooter';

interface SidebarProps {
  isCompact?: boolean;
  onToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCompact = false, onToggle }) => {
  const [activeItem, setActiveItem] = useState('dashboard');

  const menuItems = [
        { id: 'docs', label: 'Документы', icon: '🚀', href: '/docs' },
        { id: 'access', label: 'Доступы', icon: '✅', href: '/accesse' },
        { id: 'status', label: 'Статусы', icon: '👥', href: '/status' },
    ];

  return (
    <aside
      className={`
        bg-blue-900
        h-full
        flex flex-col
        transition-all duration-300 ease-in-out
        ${isCompact ? 'w-20' : 'w-64'}
      `}
    >
      <SidebarHeader isCompact={isCompact} onToggle={onToggle} />
      
      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
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