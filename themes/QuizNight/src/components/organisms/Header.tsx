import React, { useState, useEffect } from 'react';
import { Button } from '@components/atoms';
import { Menu, X, Play } from 'lucide-react';
import { cn } from '@lib/utils/cn';

export interface HeaderProps {
  className?: string;
}

/**
 * Header Component - Atomic Design: Organism
 *
 * Main navigation header with mobile menu.
 * Sticky header with scroll effects.
 * Mobile-first responsive design.
 *
 * @example
 * <Header />
 */
export const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Quizzes', href: '/quizzes' },
    { label: 'Categories', href: '/categories' },
    { label: 'Leaderboard', href: '/leaderboard' },
    { label: 'About', href: '/about' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-transparent',
        className
      )}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2 sm:gap-3 group"
            aria-label="QuizNight Home"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
              <Play size={20} fill="white" />
            </div>
            <span className="text-xl sm:text-2xl font-display font-bold text-dark-900">
              Quiz<span className="text-primary-600">Night</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-dark-700 hover:text-primary-600 transition-colors relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" size="md">
              Sign In
            </Button>
            <Button variant="primary" size="md">
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
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
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
            <div className="pt-4 px-4 space-y-2 border-t border-dark-200">
              <Button variant="outline" size="md" className="w-full">
                Sign In
              </Button>
              <Button variant="primary" size="md" className="w-full">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
