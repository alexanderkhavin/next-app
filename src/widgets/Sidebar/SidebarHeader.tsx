// components/sidebar/SidebarHeader.tsx
import { Folder } from "lucide-react";
import ThemeToggle from "../ThemeToggle";

interface SidebarHeaderProps {
  isCompact: boolean;
  onToggle?: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ isCompact, onToggle }) => {
  return (
    <div className="flex items-center justify-between px-3 py-2" style={{height: '69px'}}>
      {/* Логотип - всегда виден */}
      <div className="flex items-center p-3">
        <div className="w-8 h-8 p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Folder color="#ffffff" />
        </div>
        
        {/* Название - скрывается в компактном режиме */}
        {!isCompact && (
          <span className="ml-3 text-lg font-bold text-white text-nowrap">
            Генератор заявок
          </span>
        )}
      </div>
    </div>
  );
};

export default SidebarHeader;