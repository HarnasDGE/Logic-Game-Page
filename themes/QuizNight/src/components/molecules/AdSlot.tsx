import React from 'react';
import { cn } from '@lib/utils/cn';

export interface AdSlotProps {
  /**
   * Ad slot format
   */
  format?: 'banner' | 'rectangle' | 'skyscraper' | 'leaderboard' | 'square';
  /**
   * Additional class names
   */
  className?: string;
  /**
   * Ad slot ID for targeting
   */
  slotId?: string;
}

const formatDimensions = {
  banner: 'w-full h-[90px] sm:h-[120px]', // 728x90 or 970x90
  leaderboard: 'w-full h-[90px]', // 728x90
  rectangle: 'w-full max-w-[300px] h-[250px]', // 300x250
  skyscraper: 'w-[160px] h-[600px]', // 160x600
  square: 'w-[250px] h-[250px]', // 250x250
};

/**
 * AdSlot Component - Advertisement Placeholder
 *
 * Responsive ad slot component with placeholder styling.
 * Ready for integration with ad networks (Google AdSense, etc.)
 *
 * @example
 * <AdSlot format="rectangle" slotId="ad-sidebar-1" />
 */
export const AdSlot: React.FC<AdSlotProps> = ({
  format = 'rectangle',
  className,
  slotId = 'ad-slot',
}) => {
  return (
    <div
      className={cn(
        'ad-slot relative rounded-lg border-2 border-dashed border-dark-200 bg-dark-50 overflow-hidden',
        formatDimensions[format],
        className
      )}
      data-ad-slot={slotId}
    >
      {/* Placeholder content - will be replaced by actual ads */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
        <div className="text-3xl mb-2">📢</div>
        <p className="text-xs font-semibold text-dark-400 uppercase tracking-wide">
          Advertisement
        </p>
        <p className="text-[10px] text-dark-300 mt-1">
          {format === 'banner' && '728×90 / 970×90'}
          {format === 'leaderboard' && '728×90'}
          {format === 'rectangle' && '300×250'}
          {format === 'skyscraper' && '160×600'}
          {format === 'square' && '250×250'}
        </p>
      </div>

      {/* Gradient overlay for visual appeal */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 to-secondary-50/30 pointer-events-none" />
    </div>
  );
};
