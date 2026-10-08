import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ProfileAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  showStatusBadge?: boolean;
  shape?: 'circle' | 'rounded';
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  size = 'md',
  className = '',
  showStatusBadge = false,
  shape = 'circle'
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Size styling maps
  const sizeClasses = {
    sm: 'w-9 h-9 text-xs',
    md: 'w-11 h-11 text-sm',
    lg: 'w-24 h-24 text-2xl',
    hero: 'w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 text-4xl'
  };

  const roundedClasses = shape === 'circle' ? 'rounded-full' : 'rounded-2xl';

  return (
    <div
      className={`relative inline-block select-none shrink-0 ${sizeClasses[size]} ${className}`}
      aria-label="Dhananjaya Barik Avatar"
    >
      <div
        className={`w-full h-full ${roundedClasses} overflow-hidden border border-white/10 ${
          size === 'hero' ? 'bg-[#2997ee]' : 'bg-gradient-to-br from-[#121629] to-[#0c0f1c]'
        } shadow-xl flex items-center justify-center relative transition-all duration-300 group`}
      >
        {!imageError ? (
          <>
            <img
              src={PERSONAL_INFO.profilePhoto}
              alt="Dhananjaya Barik - Full Stack Java Developer"
              className={`w-full h-full object-cover ${
                size === 'hero'
                  ? 'object-[center_20%] scale-[0.88] origin-center'
                  : 'object-top'
              } ${roundedClasses} transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0 absolute inset-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              loading={size === 'hero' ? 'eager' : 'lazy'}
              decoding="async"
            />
            {/* Fallback displayed while image is loading or if missing */}
            {!imageLoaded && (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-cyan-500/15 via-[#111628] to-emerald-500/15 text-cyan-400 font-mono font-bold tracking-wider">
                <span>DB</span>
              </div>
            )}
          </>
        ) : (
          /* Graceful DB Initials Fallback */
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-cyan-500/15 via-[#111628] to-emerald-500/15 text-cyan-400 font-mono font-bold tracking-wider border border-cyan-500/20">
            <span>DB</span>
            {size === 'hero' && (
              <span className="text-[11px] font-sans font-normal text-slate-400 mt-2 tracking-normal px-4 text-center">
                Full Stack Java Developer
              </span>
            )}
          </div>
        )}

        {/* Ambient subtle inner glow overlay */}
        <div
          className={`absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 ${roundedClasses}`}
        />
      </div>

      {/* Online / Active Availability Status Indicator */}
      {showStatusBadge && (
        <span
          className={`absolute ${
            size === 'hero'
              ? 'bottom-2 right-2 sm:bottom-3 sm:right-3 p-1.5'
              : 'bottom-0 right-0 p-0.5'
          } rounded-full bg-[#090a0f] ring-2 ring-[#090a0f]`}
        >
          <span className="relative flex h-3 w-3 sm:h-3.5 sm:w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 sm:h-3.5 sm:w-3.5 bg-emerald-500"></span>
          </span>
        </span>
      )}
    </div>
  );
};
