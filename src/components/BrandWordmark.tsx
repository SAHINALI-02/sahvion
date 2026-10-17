import React from 'react';

interface BrandWordmarkProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showTagline?: boolean;
  withGlow?: boolean;
}

const logoSizeClasses = {
  sm: 'h-6 sm:h-7 md:h-8 w-auto',
  md: 'h-7 sm:h-8 md:h-10 lg:h-11 w-auto',
  lg: 'h-9 sm:h-12 md:h-14 w-auto',
  xl: 'h-12 sm:h-16 md:h-20 lg:h-24 w-auto',
  hero: 'h-16 sm:h-20 md:h-28 lg:h-32 w-auto',
};

/**
 * SAHVION brand wordmark — uses the official logo PNG asset.
 * Transparent-background image displayed at the right size per context.
 */
export const BrandWordmark: React.FC<BrandWordmarkProps> = ({
  className = '',
  size = 'md',
  showTagline = false,
  withGlow = true,
}) => {
  return (
    <div className={`inline-flex items-center select-none max-w-full ${className}`}>
      <img
        src="/images/sahvion-logo.png"
        alt="SAHVION logo"
        className={`${logoSizeClasses[size]} max-w-full object-contain block rounded-lg transition-transform duration-300 hover:scale-[1.02] ${
          withGlow ? 'drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]' : ''
        }`}
        style={{ filter: 'saturate(1.1) contrast(1.05)' }}
      />
    </div>
  );
};


export const BrandTagline: React.FC<{ className?: string }> = ({ className = '' }) => null;
