import React, { useState } from 'react';
import { Button } from '@components/atoms';
import { Mail } from 'lucide-react';
import { cn } from '@lib/utils/cn';

export interface NewsletterSectionProps {
  className?: string;
}

/**
 * NewsletterSection Component - Newsletter signup with illustration
 *
 * Community CTA section with email signup
 *
 * @example
 * <NewsletterSection />
 */
export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ className }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    // Handle newsletter signup
  };

  return (
    <section className={cn('relative py-16 sm:py-24 bg-gradient-to-br from-primary-100 via-secondary-50 to-accent-50 overflow-hidden', className)}>
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-6xl opacity-10">📧</div>
      <div className="absolute bottom-10 right-10 text-6xl opacity-10">🔔</div>
      <div className="absolute top-1/2 right-[15%] text-4xl opacity-10">✨</div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Illustration */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-square">
              {/* Campfire illustration placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-9xl filter drop-shadow-2xl">🔥</div>
              </div>

              {/* People around campfire */}
              <div className="absolute top-[20%] left-[10%] text-5xl">👨</div>
              <div className="absolute top-[15%] right-[15%] text-5xl">👩</div>
              <div className="absolute bottom-[25%] left-[5%] text-5xl">🧑</div>
              <div className="absolute bottom-[20%] right-[10%] text-5xl">👧</div>
              <div className="absolute top-[50%] left-[25%] text-4xl">👦</div>
              <div className="absolute top-[45%] right-[25%] text-4xl">🧒</div>

              {/* Decorative elements */}
              <div className="absolute top-[10%] left-[50%] text-3xl animate-float">💬</div>
              <div className="absolute bottom-[15%] left-[50%] text-2xl animate-float" style={{ animationDelay: '0.5s' }}>🎵</div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-dark-900 mb-4">
              Community CTA
            </h2>
            <p className="text-lg sm:text-xl text-dark-600 mb-8">
              Siqnez mnie to ronus un to our newsletter!
            </p>

            {/* Email form */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Spiszz your email"
                className="flex-1 px-5 py-3 rounded-xl border-2 border-dark-300 focus:border-primary-500 focus:outline-none text-dark-900 placeholder:text-dark-400"
                required
              />
              <Button
                type="submit"
                variant="primary"
                size="lg"
                leftIcon={<Mail size={20} />}
                className="bg-primary-600 hover:bg-primary-700 text-white font-bold whitespace-nowrap"
              >
                Zapisz mnie!
              </Button>
            </form>

            {/* Trust indicators */}
            <div className="mt-6 flex items-center justify-center lg:justify-start gap-6 text-sm text-dark-600">
              <div className="flex items-center gap-2">
                <span className="text-primary-600">✓</span>
                <span>No spam</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary-600">✓</span>
                <span>Weekly tips</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary-600">✓</span>
                <span>Unsubscribe anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
