import React, { useState, useEffect } from 'react';
import { Volume2, PlayCircle } from 'lucide-react';
import { audioService } from '../services/audioService';

export const AudioUnlocker: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show on Android (as requested) or general mobile if needed. 
    // Prompt specifically targets "Android system" fixes.
    const isAndroid = /Android/i.test(navigator.userAgent);
    
    // Check if already unlocked in this session (audioService tracks instance state)
    // In a real SPA, this component mounts once. 
    if (isAndroid && !audioService.isUnlocked) {
      setVisible(true);
    }
  }, []);

  const handleUnlock = () => {
    audioService.unlock();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div 
      className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in"
      onClick={handleUnlock}
      onTouchStart={handleUnlock}
    >
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl transform transition-all scale-100">
        <div className="w-16 h-16 bg-blue-50 text-[#002654] rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <Volume2 size={32} />
        </div>
        
        <h2 className="text-xl font-bold text-[#002654] mb-3">
          开启发音功能
        </h2>
        
        <p className="text-gray-500 mb-8 leading-relaxed">
          为了确保在微信和浏览器中能正常朗读单词，请点击下方按钮激活音频系统。
        </p>

        <button 
          onClick={handleUnlock}
          className="w-full bg-[#CE1126] text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          <PlayCircle size={20} />
          点击开始学习
        </button>
      </div>
    </div>
  );
};