import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { useEffect, useState } from 'react';

export default function Layout() {
  // Initialize theme on mount
  useEffect(() => {
    const stored = localStorage.getItem('mathbath-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = stored ? stored === 'dark' : prefersDark;
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'var(--mb-bg)', color: 'var(--mb-text)' }}>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}