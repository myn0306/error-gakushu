import React from 'react';

export interface MascotProps {
  mood?: 'happy' | 'thinking' | 'cheering' | 'worried' | 'proud' | 'waving';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  bubbleText?: string;
  speakerName?: string;
  className?: string;
}

export const Mascot: React.FC<MascotProps> = ({
  mood = 'happy',
  size = 'md',
  bubbleText,
  speakerName = 'ぽよまる',
  className = '',
}) => {
  const sizeMap = {
    sm: { width: 56, height: 56, bubbleMax: 'max-w-xs' },
    md: { width: 88, height: 88, bubbleMax: 'max-w-sm' },
    lg: { width: 128, height: 128, bubbleMax: 'max-w-md' },
    xl: { width: 168, height: 168, bubbleMax: 'max-w-lg' },
  };

  const { width, height } = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* SVG Character */}
      <div
        className="relative shrink-0 transition-transform duration-300 hover:scale-105"
        style={{ width, height }}
      >
        <svg
          viewBox="0 0 160 160"
          className="w-full h-full drop-shadow-[0_4px_12px_rgba(150,120,100,0.15)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Fluffy body gradient */}
            <linearGradient id="bodyGrad" x1="80" y1="20" x2="80" y2="150" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffffff" />
              <stop offset="0.85" stopColor="#ffffff" />
              <stop offset="1" stopColor="#ffd3e0" />
            </linearGradient>
            {/* Blush cheeks soft blur */}
            <radialGradient id="blushGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff9db8" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#ffb3c1" stopOpacity="0" />
            </radialGradient>
            {/* Ribbon gradient */}
            <linearGradient id="ribbonGrad" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#ffc94d" />
              <stop offset="1" stopColor="#ff9db8" />
            </linearGradient>
          </defs>

          {/* Ears / Little fluffy tufts */}
          <ellipse cx="50" cy="38" rx="16" ry="18" fill="#ffffff" stroke="#ffd3e0" strokeWidth="3" transform="rotate(-15 50 38)" />
          <ellipse cx="50" cy="38" rx="9" ry="11" fill="#ffd3e0" transform="rotate(-15 50 38)" />

          <ellipse cx="110" cy="38" rx="16" ry="18" fill="#ffffff" stroke="#ffd3e0" strokeWidth="3" transform="rotate(15 110 38)" />
          <ellipse cx="110" cy="38" rx="9" ry="11" fill="#ffd3e0" transform="rotate(15 110 38)" />

          {/* Main Round Fluffy Body */}
          <ellipse
            cx="80"
            cy="92"
            rx="56"
            ry="50"
            fill="url(#bodyGrad)"
            stroke="#ffd3e0"
            strokeWidth="3.5"
          />

          {/* Paws / Hands */}
          {mood === 'cheering' ? (
            <>
              <ellipse cx="38" cy="62" rx="11" ry="11" fill="#ffffff" stroke="#ffd3e0" strokeWidth="3" />
              <ellipse cx="122" cy="62" rx="11" ry="11" fill="#ffffff" stroke="#ffd3e0" strokeWidth="3" />
              {/* Star on right hand */}
              <path
                d="M126 50L128 55L133 55L129 58L131 63L126 60L122 63L124 58L120 55L125 55Z"
                fill="#ffc94d"
              />
            </>
          ) : mood === 'thinking' ? (
            <>
              <ellipse cx="44" cy="98" rx="10" ry="10" fill="#ffffff" stroke="#ffd3e0" strokeWidth="3" />
              <ellipse cx="106" cy="85" rx="10" ry="10" fill="#ffffff" stroke="#ffd3e0" strokeWidth="3" />
            </>
          ) : mood === 'waving' ? (
            <>
              <ellipse cx="36" cy="95" rx="10" ry="10" fill="#ffffff" stroke="#ffd3e0" strokeWidth="3" />
              <ellipse cx="125" cy="70" rx="11" ry="11" fill="#ffffff" stroke="#ffd3e0" strokeWidth="3" />
            </>
          ) : (
            <>
              <ellipse cx="42" cy="98" rx="10" ry="9" fill="#ffffff" stroke="#ffd3e0" strokeWidth="3" />
              <ellipse cx="118" cy="98" rx="10" ry="9" fill="#ffffff" stroke="#ffd3e0" strokeWidth="3" />
            </>
          )}

          {/* Cheeks - Red blush */}
          <circle cx="50" cy="96" r="14" fill="url(#blushGrad)" />
          <circle cx="110" cy="96" r="14" fill="url(#blushGrad)" />

          {/* Little feet */}
          <ellipse cx="60" cy="136" rx="13" ry="8" fill="#ffffff" stroke="#ffd3e0" strokeWidth="3" />
          <ellipse cx="100" cy="136" rx="13" ry="8" fill="#ffffff" stroke="#ffd3e0" strokeWidth="3" />

          {/* Eyes & Eyebrows depending on mood */}
          {mood === 'happy' || mood === 'waving' ? (
            <>
              {/* Joyful curved eyes */}
              <path d="M58 84C62 78 68 78 72 84" stroke="#5a4a42" strokeWidth="4" strokeLinecap="round" />
              <path d="M88 84C92 78 98 78 102 84" stroke="#5a4a42" strokeWidth="4" strokeLinecap="round" />
              {/* Cute smile */}
              <path d="M75 92C78 96 82 96 85 92" stroke="#5a4a42" strokeWidth="3.5" strokeLinecap="round" />
            </>
          ) : mood === 'cheering' ? (
            <>
              {/* Sparkling round big eyes */}
              <ellipse cx="64" cy="80" rx="7" ry="8.5" fill="#5a4a42" />
              <ellipse cx="96" cy="80" rx="7" ry="8.5" fill="#5a4a42" />
              <circle cx="62" cy="78" r="3" fill="#ffffff" />
              <circle cx="94" cy="78" r="3" fill="#ffffff" />
              <circle cx="66" cy="83" r="1.5" fill="#ffffff" />
              <circle cx="98" cy="83" r="1.5" fill="#ffffff" />
              {/* Big joyful open mouth */}
              <path d="M74 88C74 96 86 96 86 88Z" fill="#ff9db8" stroke="#5a4a42" strokeWidth="2.5" />
            </>
          ) : mood === 'thinking' ? (
            <>
              {/* Curious eyes */}
              <circle cx="64" cy="81" r="6" fill="#5a4a42" />
              <circle cx="62" cy="79" r="2.5" fill="#ffffff" />
              <circle cx="96" cy="81" r="6" fill="#5a4a42" />
              <circle cx="94" cy="79" r="2.5" fill="#ffffff" />
              {/* Little curious 'o' mouth */}
              <circle cx="80" cy="94" r="4.5" fill="#ff9db8" stroke="#5a4a42" strokeWidth="2" />
            </>
          ) : mood === 'worried' ? (
            <>
              {/* Gentle teardrop eyes */}
              <path d="M58 80C62 84 68 84 72 80" stroke="#5a4a42" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M88 80C92 84 98 84 102 80" stroke="#5a4a42" strokeWidth="3.5" strokeLinecap="round" />
              {/* Little wavy mouth */}
              <path d="M74 95Q77 92 80 95Q83 98 86 95" stroke="#5a4a42" strokeWidth="3" strokeLinecap="round" fill="none" />
              {/* Cute blue sweat drop */}
              <path d="M116 66C116 71 112 74 109 74C106 74 105 71 107 68C109 65 116 60 116 66Z" fill="#cfe9f7" />
            </>
          ) : (
            <>
              {/* Proud wink */}
              <path d="M58 82C62 76 68 76 72 82" stroke="#5a4a42" strokeWidth="4" strokeLinecap="round" />
              <ellipse cx="96" cy="81" rx="6.5" ry="8" fill="#5a4a42" />
              <circle cx="94" cy="79" r="2.5" fill="#ffffff" />
              <path d="M74 92C78 96 82 96 85 92" stroke="#5a4a42" strokeWidth="3" strokeLinecap="round" />
            </>
          )}

          {/* Tiny yellow sparkle or heart near head */}
          <path
            d="M80 16L82 22L88 22L83 26L85 32L80 28L75 32L77 26L72 22L78 22Z"
            fill="url(#ribbonGrad)"
            className="animate-pulse"
          />
        </svg>
      </div>

      {/* Speech Bubble (if provided) */}
      {bubbleText && (
        <div className="relative bg-white border-2 border-[#ffd3e0] rounded-[20px] px-4 py-3 shadow-[0_4px_12px_rgba(150,120,100,0.15)] max-w-sm sm:max-w-md text-sm sm:text-base leading-relaxed text-[#5a4a42]">
          {/* Arrow / tail for bubble */}
          <div className="absolute top-1/2 -left-2.5 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white z-10" />
          <div className="absolute top-1/2 -left-3.5 -translate-y-1/2 w-0 h-0 border-t-9 border-t-transparent border-b-9 border-b-transparent border-r-9 border-r-[#ffd3e0]" />
          <span className="font-bold text-[#ff9db8] mr-1.5">{speakerName}:</span>
          {bubbleText}
        </div>
      )}
    </div>
  );
};
