'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle=()=> {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <button
      onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-full bg-gray-200 dark:bg-accent-hover text-gray-800 dark:text-gray-200 transition-all"
      aria-label="Toggle Dark/Light Mode"
    >
      {currentTheme === 'dark' ? <FaSun /> : <FaMoon />}
    </button>
  );
}

export default ThemeToggle ;