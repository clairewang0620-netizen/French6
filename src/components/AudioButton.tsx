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
    e.stopPropagation();
    audioService.speak(text);
  };

  return (
    <button 
      onClick={handlePlay}
      className={clsx(
        "p-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors text-primary",
        className
      )}
      aria-label="Play audio"
    >
      <Volume2 size={size} />
    </button>
  );
};