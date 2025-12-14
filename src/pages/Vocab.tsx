import React, { useState, useMemo } from 'react';
import { Level } from '../types';
import { VOCAB_DATA } from '../data/vocab';
import { AudioButton } from '../components/AudioButton';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';

export const Vocab: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState<Level>(Level.A1);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter data strictly by level
  const words = useMemo(() => VOCAB_DATA.filter(w => w.level === currentLevel), [currentLevel]);
  
  // Safety check
  const currentWord = words[currentIndex] || words[0];

  const handleLevelChange = (lvl: Level) => {
    setCurrentLevel(lvl);
    setCurrentIndex(0);
  };

  const nextWord = () => {
    setCurrentIndex((prev) => (prev + 1) % words.length);
  };

  const prevWord = () => {
    setCurrentIndex((prev) => (prev - 1 + words.length) % words.length);
  };

  if (!currentWord) return <div>No data available</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-2xl mx-auto">
      {/* Level Selector - Minimalist Tabs */}
      <div className="flex gap-2 mb-10 bg-white p-1.5 rounded-full shadow-sm border border-gray-100 overflow-x-auto max-w-full">
        {Object.values(Level).map(lvl => (
          <button
            key={lvl}
            onClick={() => handleLevelChange(lvl)}
            className={clsx(
              "px-6 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap",
              currentLevel === lvl 
                ? 'bg-[#0055A4] text-white shadow-md' 
                : 'text-gray-500 hover:bg-gray-50'
            )}
          >
            {lvl}
          </button>
        ))}
      </div>

      {/* The Immersive Card */}
      <div className="w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 relative overflow-hidden flex flex-col items-center text-center min-h-[450px] justify-between transition-all duration-300">
        {/* Progress Indicator */}
        <div className="absolute top-6 right-6 text-xs font-mono text-gray-400">
          {currentIndex + 1} / {words.length}
        </div>
        
        {/* Decorative background element */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

        {/* Content */}
        <div className="z-10 flex flex-col items-center w-full mt-4">
          <h2 className="text-5xl md:text-6xl font-bold text-[#1A202C] mb-4 tracking-tight">
            {currentWord.french}
          </h2>
          
          <div className="bg-gray-50 px-4 py-1 rounded-full text-gray-500 font-mono text-sm mb-8 border border-gray-100">
            {currentWord.ipa}
          </div>

          <div className="w-full h-px bg-gray-100 mb-8 max-w-[200px]"></div>

          <p className="text-2xl text-[#0055A4] font-medium mb-8">
            {currentWord.chinese}
          </p>

          <div className="bg-[#F7F9FC] p-6 rounded-2xl w-full text-left border border-gray-100 relative group">
            <p className="text-lg text-gray-800 font-medium mb-2">{currentWord.example.french}</p>
            <p className="text-sm text-gray-500">{currentWord.example.chinese}</p>
            
            <div className="absolute top-4 right-4">
               <AudioButton 
                 text={currentWord.example.french} 
                 size={20} 
                 className="text-[#EF4135] bg-white shadow-sm p-2 hover:bg-red-50"
               />
            </div>
          </div>
        </div>

        {/* Main Audio Action */}
        <div className="mt-8 z-10">
          <AudioButton 
            text={currentWord.french} 
            size={32} 
            className="bg-[#EF4135] text-white p-5 rounded-full shadow-lg hover:bg-red-600 hover:scale-105 transition-all"
          />
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center gap-6 mt-8">
        <button 
          onClick={prevWord}
          className="p-4 rounded-full text-gray-400 hover:bg-white hover:text-[#0055A4] hover:shadow-md transition-all"
        >
          <ChevronLeft size={28} />
        </button>
        <div className="text-sm font-medium text-gray-400">切换单词</div>
        <button 
          onClick={nextWord}
          className="p-4 rounded-full text-gray-400 hover:bg-white hover:text-[#0055A4] hover:shadow-md transition-all"
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
};