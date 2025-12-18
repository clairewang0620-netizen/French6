import React from 'react';
import { Volume2 } from 'lucide-react';
import { audioService } from '../services/audioService';
import { clsx } from 'clsx';

interface AudioButtonProps {
  text: string;
  className?: string;
  size?: number;
}

export const AudioButton: React.FC<AudioButtonProps> = ({ text, className, size = 20 }) => {
  
  const handlePlay = (e: React.MouseEvent) => {
    // 核心：不要在任何 setTimeout 或 Promise 之后调用 play()
    // 必须直接在 onClick 响应函数的第一级调用
    e.preventDefault();
    e.stopPropagation();
    
    audioService.play(text);
  };

  return (
    <button 
      onClick={handlePlay}
      className={clsx(
        "p-2 rounded-full transition-all flex items-center justify-center active:scale-95 touch-manipulation hover:bg-black/5",
        className
      )}
      title="播放发音"
    >
      <Volume2 size={size} />
    </button>
  );
};