import React from 'react';
import { Play, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { cn } from '@lib/utils/cn';

export interface FooterProps {
  className?: string;
}

/**
 * Footer Component - Atomic Design: Organism
 *
 * Site footer with links and social media.
 * Responsive multi-column layout.
 *
 * @example
 * <Footer />
 */
export const Footer: React.FC<FooterProps> = ({ className }) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Categories', href: '/categories' },
      { label: 'Leaderboard', href: '/leaderboard' },
    ],
    Company: [
      { label: 'About Us', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
    Resources: [
      { label: 'Help Center', href: '/help' },
      { label: 'API Docs', href: '/docs' },
      { label: 'Community', href: '/community' },
      { label: 'Guidelines', href: '/guidelines' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'GDPR', href: '/gdpr' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:hello@logicleague.com', label: 'Email' },
  ];

  return (
    <footer className={cn('bg-dark-900 text-dark-100 pt-12 sm:pt-16 pb-8', className)}>
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12 mb-12">
          {/* Brand Column */}
          <div className="sm:col-span-2">
            <a href="/" className="inline-flex items-center gap-2 sm:gap-3 mb-4 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                <Play size={20} fill="white" />
              </div>
              <span className="text-2xl font-display font-bold text-white">
                Logic<span className="text-primary-400">League</span>
              </span>
            </a>
            <p className="text-dark-400 mb-6 max-w-sm">
              Challenge your mind with thousands of exciting quizzes, puzzles, and brain teasers.
              Join our community of knowledge seekers today!
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-dark-800 hover:bg-primary-600 flex items-center justify-center transition-colors"
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-bold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-dark-400 hover:text-primary-400 transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-dark-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-dark-400 text-center sm:text-left">
              © {currentYear} LogicLeague. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-dark-400">
              <a href="/sitemap" className="hover:text-primary-400 transition-colors">
                Sitemap
              </a>
              <a href="/accessibility" className="hover:text-primary-400 transition-colors">
                Accessibility
              </a>
              <a href="/status" className="hover:text-primary-400 transition-colors">
                Status
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
