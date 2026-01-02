import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@components/atoms';
import { Menu, X, Play, ChevronDown, User, LogIn, UserPlus, Gamepad2 } from 'lucide-react';
import { cn } from '@lib/utils/cn';
import type { QuizCategory } from '@types/index';

export interface HeaderProps {
  className?: string;
}

const categories: Array<{ name: string; value: QuizCategory; icon: string; href?: string }> = [
  { name: 'Trivia', value: 'trivia', icon: '🎯' },
  { name: 'Logic Puzzles', value: 'logic', icon: '🧩' },
  { name: 'Math Games', value: 'math', icon: '🔢' },
  { name: 'Sudoku', value: 'sudoku', icon: '🎲', href: '/sudoku' },
  { name: 'Daily Sudoku', value: 'sudoku', icon: '🏆', href: '/sudoku/daily' },
  { name: 'Crosswords', value: 'crossword', icon: '📝' },
  { name: 'Riddles', value: 'riddles', icon: '💡' },
  { name: 'Memory Games', value: 'memory', icon: '🧠' },
  { name: 'Word Games', value: 'word-games', icon: '📖' },
];

/**
 * Enhanced Header Component - Atomic Design: Organism
 *
 * Main navigation header with:
 * - Games dropdown menu with categories
 * - User account dropdown with login/signup
 * - Mobile-responsive design
 * - Sticky header with scroll effects
 * - Animated interactions
 *
 * @example
 * <Header />
 */
export const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGamesDropdownOpen, setIsGamesDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const gamesDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (gamesDropdownRef.current && !gamesDropdownRef.current.contains(event.target as Node)) {
        setIsGamesDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Leaderboard', href: '/leaderboard' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-[100]',
        'transition-all duration-300',
        isScrolled
          ? 'bg-white/98 backdrop-blur-md shadow-lg'
          : 'bg-white/80 backdrop-blur-sm',
        className
      )}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo with bounce animation */}
          <a
            href="/"
            className="flex items-center gap-2 sm:gap-3 group"
            aria-label="LogicLeague Home"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:animate-wiggle transition-transform">
              <Play size={20} fill="white" />
            </div>
            <span className="text-xl sm:text-2xl font-display font-bold text-dark-900">
              Logic<span className="text-primary-600">League</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-dark-700 hover:text-primary-600 transition-colors relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300" />
              </a>
            ))}

            {/* Games Dropdown */}
            <div className="relative" ref={gamesDropdownRef}>
              <button
                onClick={() => setIsGamesDropdownOpen(!isGamesDropdownOpen)}
                className="flex items-center gap-2 text-sm font-semibold text-dark-700 hover:text-primary-600 transition-colors group"
              >
                <Gamepad2 size={18} className="group-hover:animate-wiggle" />
                Games
                <ChevronDown
                  size={16}
                  className={cn(
                    'transition-transform duration-200',
                    isGamesDropdownOpen && 'rotate-180'
                  )}
                />
              </button>

              {/* Games Dropdown Menu */}
              {isGamesDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border-2 border-dark-100 overflow-hidden animate-slide-down z-[110]">
                  <div className="p-2">
                    {categories.map((cat) => (
                      <a
                        key={cat.value}
                        href={cat.href || `/category/${cat.value}`}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary-50 transition-colors group"
                      >
                        <span className="text-2xl group-hover:animate-float">{cat.icon}</span>
                        <span className="text-sm font-medium text-dark-700 group-hover:text-primary-600">
                          {cat.name}
                        </span>
                      </a>
                    ))}
                  </div>
                  <div className="border-t border-dark-100 p-2">
                    <a
                      href="/all-games"
                      className="block px-4 py-3 text-center text-sm font-semibold text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"
                    >
                      View All Games →
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* User Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="relative" ref={userDropdownRef}>
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-dark-700 hover:bg-dark-100 transition-colors"
                aria-label="User menu"
              >
                <User size={18} />
                <ChevronDown
                  size={16}
                  className={cn(
                    'transition-transform duration-200',
                    isUserDropdownOpen && 'rotate-180'
                  )}
                />
              </button>

              {/* User Dropdown Menu */}
              {isUserDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border-2 border-dark-100 overflow-hidden animate-slide-down z-[110]">
                  <div className="p-2">
                    <a
                      href="/login"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary-50 transition-colors group"
                    >
                      <LogIn size={18} className="text-dark-600 group-hover:text-primary-600 transition-colors" />
                      <span className="text-sm font-medium text-dark-700 group-hover:text-primary-600">
                        Sign In
                      </span>
                    </a>
                    <a
                      href="/register"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary-50 transition-colors group"
                    >
                      <UserPlus size={18} className="text-dark-600 group-hover:text-secondary-600 transition-colors" />
                      <span className="text-sm font-medium text-dark-700 group-hover:text-secondary-600">
                        Sign Up
                      </span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            <Button variant="primary" size="md" className="shadow-lg hover:shadow-xl transition-shadow">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-dark-700 hover:text-primary-600 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300',
            isMobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="py-4 space-y-2 border-t border-dark-200">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block px-4 py-2.5 text-base font-medium text-dark-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}

            {/* Mobile Games Section */}
            <div className="pt-4 border-t border-dark-200">
              <div className="px-4 py-2 text-xs font-bold text-dark-500 uppercase tracking-wider flex items-center gap-2">
                <Gamepad2 size={14} />
                Categories
              </div>
              <div className="grid grid-cols-2 gap-2 px-2">
                {categories.map((cat) => (
                  <a
                    key={cat.value}
                    href={cat.href || `/category/${cat.value}`}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-dark-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="text-lg">{cat.icon}</span>
                    <span className="truncate">{cat.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile User Actions */}
            <div className="pt-4 px-4 space-y-2 border-t border-dark-200">
              <Button variant="outline" size="md" className="w-full" leftIcon={<LogIn size={18} />}>
                Sign In
              </Button>
              <Button variant="primary" size="md" className="w-full" leftIcon={<UserPlus size={18} />}>
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
