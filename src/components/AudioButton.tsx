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
    // 阻止冒泡，防止触发卡片点击等
    e.stopPropagation();
    
    // 直接调用播放，无任何中间状态
    audioService.play(text);
  };

  return (
    <button 
      onClick={handlePlay}
      className={clsx(
        "p-2 rounded-full transition-all flex items-center justify-center active:scale-95 hover:bg-black/5",
        className
      )}
      title="点击播放发音"
    >
      <Volume2 size={size} />
    </button>
  );
};