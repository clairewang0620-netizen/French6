import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { audioService } from '../services/audioService';
import { clsx } from 'clsx';

interface AudioButtonProps {
  text: string;
  className?: string;
  size?: number;
}

export const AudioButton: React.FC<AudioButtonProps> = ({ text, className, size = 20 }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Check readiness on mount
  useEffect(() => {
    // Simple check to see if voices are likely loaded or system is ready
    // We delay slightly to allow window.speechSynthesis to init
    const timer = setTimeout(() => {
        setIsReady(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isPlaying) return;

    audioService.speak(text, {
      onStart: () => setIsPlaying(true),
      onEnd: () => setIsPlaying(false),
      onError: () => setIsPlaying(false)
    });
  };

  return (
    <button 
      onClick={handlePlay}
      disabled={isPlaying}
      className={clsx(
        "p-2 rounded-full transition-all duration-200 flex items-center justify-center",
        // Visual state management
        isPlaying 
          ? "bg-blue-100 text-blue-600 scale-110 cursor-default" 
          : "hover:bg-gray-100 active:bg-gray-200 text-primary cursor-pointer hover:scale-105 active:scale-95",
        // Opacity when disabled/playing to indicate non-interactivity
        isPlaying && "opacity-80", 
        className
      )}
      aria-label={isPlaying ? "Playing..." : "Play audio"}
    >
      {isPlaying ? (
        <Volume2 size={size} className="animate-pulse" />
      ) : (
        <Volume2 size={size} />
      )}
    </button>
  );
};