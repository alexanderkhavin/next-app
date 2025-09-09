// app/access/page.tsx
import LayoutWithSidebar from '@/widgets/LayoutWithSidebar';

export default function AccessPage() {
  return (
    <LayoutWithSidebar>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Управление доступом
        </h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Пользователи</h3>
              <ul className="space-y-2">
                <li className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                  <span className="text-gray-900 dark:text-white">Иван Иванов</span>
                  <span className="text-sm text-green-600 dark:text-green-400">Активен</span>
                </li>
                <li className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                  <span className="text-gray-900 dark:text-white">Петр Петров</span>
                  <span className="text-sm text-yellow-600 dark:text-yellow-400">Ожидание</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Разрешения</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-blue-600" />
                  <span className="ml-2 text-gray-900 dark:text-white">Чтение документов</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-blue-600" />
                  <span className="ml-2 text-gray-900 dark:text-white">Редактирование</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-blue-600" />
                  <span className="ml-2 text-gray-900 dark:text-white">Администрирование</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutWithSidebar>
  );
}

export const metadata = {
  title: 'Управление доступом - Моя система',
  description: 'Управление пользователями и правами доступа',
};