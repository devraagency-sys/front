
import React from 'react';
import clsx from 'clsx';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={clsx(
        'relative p-2 rounded-full cursor-pointer backdrop-blur-sm transition-all duration-300 hover:scale-105',
        theme === 'dark' ? 'bg-black/20 border-gold/20' : 'bg-white/10 border-gray-200'
      )}
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        <Sun
          className={clsx(
            'absolute inset-0 w-5 h-5 text-gold transition-all duration-300',
            theme === 'dark' ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
          )}
        />
        <Moon
          className={clsx(
            'absolute inset-0 w-5 h-5 text-gold transition-all duration-300',
            theme === 'light' ? 'opacity-0 -rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
          )}
        />
      </div>
    </button>
  );
};
