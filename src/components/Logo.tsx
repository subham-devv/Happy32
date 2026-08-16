import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
  imageClassName?: string;
  isWatermark?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'light',
  size = 'md',
  showTagline = false,
  className = '',
  imageClassName,
  isWatermark = false,
  onClick,
}) => {
  const isDark = variant === 'dark';
  const [imgError, setImgError] = useState(false);
  const location = useLocation();

  const handleLogoClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick(e);
    }

    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  // Image height mapping based on size
  const imgHeightClass =
    size === 'sm'
      ? 'h-8 sm:h-9'
      : size === 'lg'
      ? 'h-12 sm:h-15 md:h-16'
      : 'h-9 sm:h-11 md:h-12';

  return (
    <Link
      to="/"
      onClick={handleLogoClick}
      className={`group flex items-center gap-2.5 sm:gap-3 select-none transition-all duration-500 ${isWatermark ? 'scale-[0.88] sm:scale-95 origin-left' : ''} ${className}`}
    >
      {/* Client's Logo Image Badge */}
      {!imgError && (
        <div
          className={
            isDark
              ? 'relative shrink-0 inline-flex items-center justify-center transition-all duration-500 group-hover:scale-[1.03]'
              : 'relative shrink-0 inline-flex items-center justify-center overflow-hidden rounded-xl border border-[#A8854A]/25 bg-white p-1 sm:p-1.5 shadow-xs transition-all duration-300 group-hover:scale-[1.03] group-hover:border-[#A8854A]'
          }
        >
          <img
            src={isDark ? '/logo-dark.png' : '/logo.png'}
            alt="Happy 32 Emblem"
            className={`${imageClassName || imgHeightClass} w-auto object-contain ${isDark ? '' : 'rounded-lg'}`}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />
        </div>
      )}

      {/* Brand Typography Lockup */}
      <div className="flex flex-col justify-center">
        {/* Tier 1: Main Clinic Name "Happy 32" */}
        <span
          className={`font-cormorant font-medium tracking-tight transition-all duration-500 leading-none ${
            size === 'sm'
              ? 'text-xl sm:text-2xl'
              : size === 'lg'
              ? 'text-3xl sm:text-4xl md:text-5xl'
              : 'text-2xl sm:text-[26px] md:text-[28px]'
          } ${
            isDark
              ? 'text-[#FAF7F2] group-hover:text-[#D4AF37]'
              : 'text-[#0E0C0A] group-hover:text-[#A8854A]'
          }`}
        >
          Happy 32
        </span>

        {/* Tier 2: Sub Heading "Dentofacial Clinic" */}
        <span
          className={`font-dmSans font-medium uppercase tracking-[0.24em] transition-all duration-500 leading-tight ${
            size === 'sm'
              ? 'text-[8.5px] mt-1.5'
              : size === 'lg'
              ? 'text-xs sm:text-sm mt-2'
              : 'text-[9.5px] sm:text-[10.5px] mt-1.5'
          } ${
            isDark
              ? 'text-[#D4AF37]'
              : 'text-[#A8854A]'
          }`}
        >
          Dentofacial Clinic
        </span>

        {/* Tier 3: Optional Sub-Sub Heading */}
        {showTagline && (
          <span
            className={`font-dmSans font-light uppercase tracking-[0.2em] transition-colors leading-tight ${
              size === 'lg' ? 'text-xs sm:text-sm mt-1' : 'text-[8.5px] sm:text-[9px] mt-0.5'
            } ${isDark ? 'text-[#A09588]' : 'text-[#7A6E64]'}`}
          >
            Dental & Cosmetic Surgeon
          </span>
        )}
      </div>
    </Link>
  );
};



