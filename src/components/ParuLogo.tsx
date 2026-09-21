import React from 'react';

interface ParuLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showGlow?: boolean;
}

export const ParuLogo: React.FC<ParuLogoProps> = ({
  className = '',
  size = 'md',
  showGlow = true,
}) => {
  const sizeStyles = {
    sm: 'h-6 text-xl tracking-widest',
    md: 'h-9 text-3xl tracking-widest',
    lg: 'h-14 text-5xl tracking-widest',
    hero: 'h-24 md:h-36 text-6xl md:text-9xl tracking-[0.2em]',
  };

  return (
    <div
      className={`relative inline-flex items-center font-black italic select-none font-title ${sizeStyles[size]} ${className}`}
      style={{
        fontFamily: "'Syne', -apple-system, sans-serif",
        transform: 'skewX(-12deg)',
      }}
    >
      {/* 3D Underlay Glow (Terminal Green) */}
      {showGlow && (
        <span
          className="absolute inset-0 text-[#12FE07] opacity-60 translate-x-[3px] translate-y-[3px] blur-[3px] transition-all duration-300 pointer-events-none"
          aria-hidden="true"
        >
          PARU
        </span>
      )}

      {/* 3D Chassi Layer */}
      <span
        className="absolute inset-0 text-[#1A1A1A] translate-x-[2px] translate-y-[2px] pointer-events-none"
        aria-hidden="true"
      >
        PARU
      </span>

      {/* Main Front Layer (Clean White with subtle glow) */}
      <span
        className="relative z-10 text-[#F9F9F9] transition-all duration-300 hover:text-[#12FE07] cursor-pointer"
        style={{
          textShadow: showGlow
            ? '0 0 20px rgba(18, 254, 7, 0.45), 0 0 40px rgba(255, 46, 136, 0.25)'
            : 'none',
        }}
      >
        PARU
      </span>
    </div>
  );
};
