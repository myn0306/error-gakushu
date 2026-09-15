import React from 'react';

export type MascotMood =
  | 'happy'
  | 'thinking'
  | 'cheering'
  | 'worried'
  | 'proud'
  | 'waving'
  | 'normal';

export interface MascotProps {
  mood?: MascotMood;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  bubbleText?: string;
  speakerName?: string;
  className?: string;
}

const MOOD_IMAGE_MAP: Record<MascotMood, string> = {
  normal: '/mascot/usako-normal.jpg',
  thinking: '/mascot/usako-normal.jpg',
  worried: '/mascot/usako-worried.jpg',
  cheering: '/mascot/usako-cheering.jpg',
  proud: '/mascot/usako-happy.jpg',
  waving: '/mascot/usako-waving.jpg',
  happy: '/mascot/usako-happy.jpg',
};

export const Mascot: React.FC<MascotProps> = ({
  mood = 'happy',
  size = 'md',
  bubbleText,
  speakerName = 'DXうさ子ちゃん',
  className = '',
}) => {
  const sizeMap = {
    sm: { width: 56, height: 68 },
    md: { width: 88, height: 106 },
    lg: { width: 128, height: 154 },
    xl: { width: 168, height: 202 },
  };

  const { width, height } = sizeMap[size];
  const imageSrc = MOOD_IMAGE_MAP[mood] ?? MOOD_IMAGE_MAP.normal;

  return (
    <div className={`flex flex-col sm:flex-row items-center gap-2 sm:gap-3 max-w-full min-w-0 ${className}`}>
      <div
        className="relative shrink-0 transition-transform duration-300 hover:scale-105"
        style={{ width, height }}
      >
        <img
          src={imageSrc}
          alt={`${speakerName}（${mood}）`}
          width={width}
          height={height}
          className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(150,120,100,0.15)]"
        />
      </div>

      {bubbleText && (
        <div className="relative bg-white border-2 border-[#ffd3e0] rounded-[20px] px-3 py-2.5 sm:px-4 sm:py-3 shadow-[0_4px_12px_rgba(150,120,100,0.15)] w-full min-w-0 max-w-sm sm:max-w-md text-sm sm:text-base leading-relaxed text-[#5a4a42]">
          <div className="hidden sm:block absolute top-1/2 -left-2.5 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white z-10" />
          <div className="hidden sm:block absolute top-1/2 -left-3.5 -translate-y-1/2 w-0 h-0 border-t-[9px] border-t-transparent border-b-[9px] border-b-transparent border-r-[9px] border-r-[#ffd3e0]" />
          <div className="sm:hidden absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-white z-10" />
          <div className="sm:hidden absolute -top-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-b-[9px] border-b-[#ffd3e0]" />
          <span className="font-bold text-[#ff9db8] mr-1.5">{speakerName}:</span>
          {bubbleText}
        </div>
      )}
    </div>
  );
};
