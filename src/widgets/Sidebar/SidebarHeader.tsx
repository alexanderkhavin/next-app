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
    </div>
  );
};

export default SidebarHeader;