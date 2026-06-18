import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { BookOpen, Layers, Search } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home', icon: BookOpen },
    { to: '/browse', label: 'Browse', icon: Layers },
  ];

  return (
    <nav
      className="sticky top-0 z-50 w-full dark:bg-[rgba(26,27,65,0.88)]"
      style={{
        background: 'rgba(248,247,255,0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(100,100,200,0.1)',
        boxShadow: '0 2px 24px rgba(80,80,160,0.08)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group focus-visible-clay rounded-2xl px-2 py-1"
        >
          <div
            className="w-9 h-9 rounded-2xl flex items-center justify-center text-lg font-bold text-white select-none"
            style={{
              background: 'linear-gradient(135deg, #FF6B6B 0%, #FFD166 100%)',
              boxShadow: '0 4px 12px rgba(255,107,107,0.4), inset 0 1px 0 rgba(255,255,255,0.4)',
            }}
          >
            M
          </div>
          <span
            className="text-xl font-bold hidden sm:block"
            style={{ color: 'var(--mb-text)' }}
          >
            <span className="dark:text-[#4FC3F7]" style={{ color: 'var(--mb-text)' }}>Math</span><span style={{ color: '#FF6B6B' }}>Bath</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-1.5 px-4 py-2 rounded-2xl text-sm font-600 transition-all duration-200 focus-visible-clay"
                style={{
                  color: active ? '#FF6B6B' : 'var(--mb-text-muted)',
                  background: active ? 'rgba(255,107,107,0.1)' : 'transparent',
                  fontWeight: active ? '700' : '500',
                }}
              >
                <Icon size={15} />
                {label}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Link
            to="/browse"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-white pill-btn focus-visible-clay"
            style={{
              background: 'linear-gradient(135deg, #FF6B6B 0%, #FFD166 100%)',
              boxShadow: '0 4px 14px rgba(255,107,107,0.35), inset 0 1px 0 rgba(255,255,255,0.3)',
            }}
          >
            <Search size={14} />
            Explore Topics
          </Link>
          <ThemeToggle />

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-xl focus-visible-clay"
            style={{ color: 'var(--mb-text-muted)' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-0.5 mb-1 rounded-full" style={{ background: 'var(--mb-text)' }} />
            <div className="w-5 h-0.5 mb-1 rounded-full" style={{ background: 'var(--mb-text)' }} />
            <div className="w-5 h-0.5 rounded-full" style={{ background: 'var(--mb-text)' }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-4 pb-4 flex flex-col gap-1"
          style={{ borderTop: '1px solid var(--mb-border)' }}
        >
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold transition-all"
              style={{ color: 'var(--mb-text)', background: 'var(--mb-surface)' }}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}