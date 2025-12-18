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
    // 阻止冒泡和默认行为
    e.preventDefault();
    e.stopPropagation();
    
    // 核心：在用户点击的同步执行流中立即调用
    audioService.play(text);
  };

  return (
    <button 
      onClick={handlePlay}
      className={clsx(
        "p-2 rounded-full transition-all flex items-center justify-center active:scale-90 touch-manipulation hover:bg-black/5",
        className
      )}
      type="button"
      aria-label="播放法语发音"
    >
      <Volume2 size={size} />
    </button>
  );
};