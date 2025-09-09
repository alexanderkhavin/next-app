// app/status/page.tsx
import LayoutWithSidebar from '@/components/LayoutWithSidebar';

export default function StatusPage() {
  return (
    <LayoutWithSidebar>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Статус системы
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">API</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">Работает стабильно</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Время ответа: 120мс</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">База данных</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">В норме</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Запросов: 42/сек</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
            <div className="flex items-center mb-4">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Кэш</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">Частичная нагрузка</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Заполненность: 78%</p>
          </div>
        </div>
        
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">История событий</h3>
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <span className="text-gray-500 dark:text-gray-400">10:30</span>
              <span className="ml-4 text-gray-900 dark:text-white">Обновление безопасности</span>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-gray-500 dark:text-gray-400">09:15</span>
              <span className="ml-4 text-gray-900 dark:text-white">Резервное копирование</span>
            </div>
          </div>
        </div>
      </div>
    </LayoutWithSidebar>
  );
}

export const metadata = {
  title: 'Статусы',
  description: 'Пока не понятно, зачем оно здесь, но таков был макет',
};