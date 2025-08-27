// components/sidebar/SidebarItem.tsx
'use client';

import Link from 'next/link';

interface SidebarItemProps {
  item: {
    id: string;
    label: string;
    icon: string;
    href: string;
  };
  isActive: boolean;
  isCompact: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  isActive,
  isCompact,
  onClick,
}) => {
  return (
    <Link href={item.href} passHref>
      <div
        onClick={onClick}
        className={`
          flex items-center p-3 rounded-xl
          transition-all duration-200
          cursor-pointer group relative
          ${isCompact ? 'justify-center' : 'justify-start'}
          ${
            isActive
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }
        `}
        title={isCompact ? item.label : undefined}
      >
        {/* Иконка */}
        <span className="text-xl flex-shrink-0">{item.icon}</span>
        
        {/* Текст (скрывается в компактном режиме) */}
        {!isCompact && (
          <span
            className="ml-3 font-medium whitespace-nowrap transition-opacity duration-200"
          >
            {item.label}
          </span>
        )}

        {/* Подсказка при компактном режиме */}
        {isCompact && (
          <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
            {item.label}
          </span>
        )}
      </div>
    </Link>
  );
};

export default SidebarItem;