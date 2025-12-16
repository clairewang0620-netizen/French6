import React, { useState } from 'react';
import { Volume2, Loader2 } from 'lucide-react';
import { audioService } from '../services/audioService';
import { clsx } from 'clsx';

interface AudioButtonProps {
  text: string;
  className?: string;
  size?: number;
}

export const AudioButton: React.FC<AudioButtonProps> = ({ text, className, size = 20 }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isPlaying || isLoading) {
      audioService.stop();
      setIsPlaying(false);
      setIsLoading(false);
      return;
    }

    // Set temporary loading state before audio actually starts
    setIsLoading(true);

    audioService.speak(text, {
      onStart: () => {
        setIsLoading(false);
        setIsPlaying(true);
      },
      onEnd: () => {
        setIsPlaying(false);
        setIsLoading(false);
      },
      onError: () => {
        setIsPlaying(false);
        setIsLoading(false);
      }
    });
  };

  return (
    <button 
      onClick={handlePlay}
      className={clsx(
        "p-2 rounded-full transition-all duration-200 flex items-center justify-center relative",
        // Visual state management
        isPlaying 
          ? "bg-blue-100 text-blue-600 scale-110" 
          : "hover:bg-gray-100 active:bg-gray-200 text-primary hover:scale-105 active:scale-95",
        className
      )}
      aria-label={isPlaying ? "Stop audio" : "Play audio"}
    >
      {isLoading ? (
        <Loader2 size={size} className="animate-spin" />
      ) : isPlaying ? (
        <Volume2 size={size} className="animate-pulse" />
      ) : (
        <Volume2 size={size} />
      )}
    </button>
  );
};