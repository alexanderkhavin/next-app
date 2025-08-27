// components/sidebar/SidebarFooter.tsx
import ThemeToggle from "../ThemeToggle";

interface SidebarFooterProps {
  isCompact: boolean;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ isCompact }) => {
  return (
    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        {/* Переключатель темы */}
        <div className={isCompact ? 'flex justify-center w-full' : ''}>
          <ThemeToggle />
        </div>

        {/* Информация пользователя - скрывается в компактном режиме */}
        {!isCompact && (
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">И</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900 dark:text-white">Иван Иванов</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Администратор</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarFooter;