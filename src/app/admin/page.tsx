// app/admin/page.tsx
'use client';

import LayoutWithSidebar from '@/components/LayoutWithSidebar';
import Link from 'next/link';

export default function AdminPage() {
  const adminSections = [
    {
      title: 'Должностные инструкции',
      description: 'Управление должностными инструкциями сотрудников на портале',
      icon: '📋',
      href: '/admin/instructions',
      count: 0 // можно добавить счетчики
    },
    {
      title: 'Адреса',
      description: 'Управление адресами и местоположениями',
      icon: '🏢',
      href: '/admin/locations',
      count: 0
    },
    {
      title: 'Должности',
      description: 'Управление должностями и позициями',
      icon: '💼',
      href: '/admin/positions',
      count: 0
    },
    {
      title: 'Пользователи',
      description: 'Управление пользователями и правами доступа',
      icon: '👥',
      href: '/admin/users',
      count: 0
    }
  ];

  return (
    <LayoutWithSidebar>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Администрирование системы
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adminSections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">{section.icon}</span>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {section.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {section.description}
                  </p>
                </div>
                {section.count > 0 && (
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full">
                    {section.count}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </LayoutWithSidebar>
  );
}