import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

// Определяем варианты стилей с помощью class-variance-authority
const badgeVariants = cva(
  'inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
        primary: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
        secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
        success: 'bg-green-100 text-green-800 hover:bg-green-200',
        danger: 'bg-red-100 text-red-800 hover:bg-red-200',
        warning: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
        info: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
      },
      size: {
        sm: 'text-xs px-2 py-0.5',
        md: 'text-sm px-2.5 py-0.5',
        lg: 'text-base px-4 py-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

// Определяем типы для пропсов
export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant,
  size,
  className = '',
  onClick,
  interactive = false,
  ...props
}) => {
  return (
    <span
      className={badgeVariants({
        variant,
        size,
        className: `${className} ${interactive ? 'cursor-pointer' : ''}`,
      })}
      onClick={onClick}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;