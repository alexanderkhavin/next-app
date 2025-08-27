// components/sidebar/SidebarHeader.tsx
import ThemeToggle from "../ThemeToggle";

interface SidebarHeaderProps {
  isCompact: boolean;
  onToggle?: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ isCompact, onToggle }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
      {/* Логотип - всегда виден */}
      <div className="flex items-center">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">M</span>
        </div>
        
        {/* Название - скрывается в компактном режиме */}
        {!isCompact && (
          <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
            Меню
          </span>
        )}
      </div>

      {/* Кнопка переключения - скрывается в компактном режиме */}
      {!isCompact && (
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Свернуть меню"
          title="Свернуть меню"
        >
          <svg
            className="w-5 h-5 text-gray-600 dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SidebarHeader;