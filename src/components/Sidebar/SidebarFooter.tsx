// components/sidebar/SidebarFooter.tsx
import ThemeToggle from "../ThemeToggle";

interface SidebarFooterProps {
  isCompact: boolean;
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ isCompact }) => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        {/* Переключатель темы */}
        <div className={isCompact ? 'flex justify-center w-full' : ''}>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default SidebarFooter;