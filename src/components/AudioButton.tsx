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
    e.preventDefault();
    e.stopPropagation();
    
    // 调用原始 DOM 注入引擎
    audioService.play(text);
  };

  return (
    <button 
      onClick={handlePlay}
      className={clsx(
        "p-2 rounded-full transition-all flex items-center justify-center active:scale-90 hover:bg-black/5",
        className
      )}
      title="播放发音"
    >
      <Volume2 size={size} />
    </button>
  );
};