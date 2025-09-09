// components/ThemeToggle.tsx
'use client';

import { Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialIsDark = savedTheme ? savedTheme === 'dark' : systemIsDark;
    
    setIsDark(initialIsDark);
    document.documentElement.classList.toggle('dark', initialIsDark);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle('dark', newIsDark);
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  };

  return (
<button
  onClick={toggleTheme}
  className="p-2 rounded-lg bg-blue-800 dark:bg-gray-800 hover:bg-blue-700 dark:hover:bg-gray-700 transition-all duration-300 text-center cursor-pointer"
  title={isDark ? 'Переключить на светлую тему' : 'Переключить на темную тему'}
>
  {isDark ? (
    <span className="w-5 h-5 cursor-pointer"><Sun color="#ffffff" /></span>
  ) : (
    <span className="w-5 h-5 cursor-pointer"><Moon color="#ffffff" /></span>
  )}
</button>
  );
}