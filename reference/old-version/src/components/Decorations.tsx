import React from 'react';

export const SparkleIcon: React.FC<{ className?: string; color?: string; size?: number }> = ({
  className = '',
  color = '#ffc94d',
  size = 18,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={`inline-block ${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
  </svg>
);

export const FlowerIcon: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 20,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={`inline-block ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="7" r="4" fill="#ffd3e0" />
    <circle cx="17" cy="12" r="4" fill="#ffe9a8" />
    <circle cx="12" cy="17" r="4" fill="#d3f3e8" />
    <circle cx="7" cy="12" r="4" fill="#cfe9f7" />
    <circle cx="12" cy="12" r="3.5" fill="#ffffff" stroke="#ff9db8" strokeWidth="1.5" />
  </svg>
);

export const SectionBadge: React.FC<{
  emoji: string;
  title: string;
  badgeBg?: string;
  borderColor?: string;
  className?: string;
}> = ({
  emoji,
  title,
  badgeBg = '#ffd3e0',
  borderColor = '#ff9db8',
  className = '',
}) => (
  <div
    className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border-2 shadow-[0_4px_12px_rgba(150,120,100,0.15)] font-bold text-sm sm:text-base text-[#5a4a42] ${className}`}
    style={{ backgroundColor: badgeBg, borderColor }}
  >
    <span className="text-xl leading-none">{emoji}</span>
    <span>{title}</span>
    <SparkleIcon size={14} color="#ff9db8" className="ml-0.5 animate-pulse" />
  </div>
);

export const BackgroundFloatingDecorations: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 select-none">
    {/* Soft pastel gradient orbs */}
    <div
      className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-60 blur-3xl"
      style={{ backgroundColor: '#cfe9f7' }}
    />
    <div
      className="absolute top-1/4 -right-24 w-96 h-96 rounded-full opacity-50 blur-3xl"
      style={{ backgroundColor: '#ffd3e0' }}
    />
    <div
      className="absolute bottom-10 left-1/3 w-80 h-80 rounded-full opacity-45 blur-3xl"
      style={{ backgroundColor: '#d3f3e8' }}
    />
    <div
      className="absolute bottom-1/3 -left-20 w-80 h-80 rounded-full opacity-50 blur-3xl"
      style={{ backgroundColor: '#ffe9a8' }}
    />

    {/* Floating tiny sparkles and candy icons */}
    <div className="absolute top-20 left-[10%] text-yellow-300 opacity-60 animate-bounce text-xl">✦</div>
    <div className="absolute top-48 right-[12%] text-pink-300 opacity-70 text-2xl">✨</div>
    <div className="absolute top-96 left-[6%] text-cyan-300 opacity-50 text-lg">🌸</div>
    <div className="absolute top-[60%] right-[8%] text-purple-300 opacity-60 text-xl">🍬</div>
    <div className="absolute bottom-32 left-[15%] text-pink-400 opacity-60 text-xl">⭐</div>
    <div className="absolute bottom-16 right-[22%] text-amber-300 opacity-70 text-xl">✨</div>
  </div>
);
