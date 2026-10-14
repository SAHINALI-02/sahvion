import React from 'react';

interface BrandWordmarkProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showTagline?: boolean;
  withGlow?: boolean;
}

const logoSizeClasses = {
  sm: 'h-7 w-auto md:h-8',
  md: 'h-9 w-auto md:h-11',
  lg: 'h-14 w-auto',
  xl: 'h-18 w-auto md:h-24',
  hero: 'h-24 w-auto md:h-32',
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
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src="/images/sahvion-logo.png"
        alt="SAHVION logo"
        className={`${logoSizeClasses[size]} max-w-none object-contain block rounded-lg transition-transform duration-300 hover:scale-[1.02] ${
          withGlow ? 'drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]' : ''
        }`}
        style={{ filter: 'saturate(1.1) contrast(1.05)' }}
      />
    </div>
  );
};


export const BrandTagline: React.FC<{ className?: string }> = ({ className = '' }) => null;
