import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('mathbath-theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('mathbath-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('mathbath-theme', 'light');
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative flex items-center justify-between w-16 h-8 rounded-full px-1 focus-visible-clay transition-all duration-500"
      style={{
        background: dark
          ? 'linear-gradient(135deg, #2E2F5B 0%, #1A1B41 100%)'
          : 'linear-gradient(135deg, #FFF3CD 0%, #E8F4FD 100%)',
        boxShadow: dark
          ? 'inset 0 2px 0 rgba(255,255,255,0.05), 0 4px 16px rgba(0,0,30,0.5)'
          : 'inset 0 2px 0 rgba(255,255,255,0.9), 0 4px 16px rgba(255,165,0,0.2)',
      }}
    >
      {/* Track icons */}
      <span className="text-xs z-0 pointer-events-none">
        <Sun size={13} className="text-amber-400" />
      </span>
      <span className="text-xs z-0 pointer-events-none">
        <Moon size={13} className="text-indigo-300" />
      </span>

      {/* Floating thumb */}
      <span
        className="absolute top-1 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500 cubic-bezier(0.34,1.56,0.64,1)"
        style={{
          left: dark ? '34px' : '2px',
          background: dark
            ? 'linear-gradient(135deg, #6C63FF 0%, #4FC3F7 100%)'
            : 'linear-gradient(135deg, #FFD166 0%, #FF6B6B 100%)',
          boxShadow: dark
            ? '0 2px 8px rgba(108,99,255,0.6), inset 0 1px 0 rgba(255,255,255,0.3)'
            : '0 2px 8px rgba(255,165,0,0.5), inset 0 1px 0 rgba(255,255,255,0.8)',
        }}
      >
        {dark
          ? <Moon size={12} className="text-white" />
          : <Sun size={12} className="text-white" />
        }
      </span>
    </button>
  );
}