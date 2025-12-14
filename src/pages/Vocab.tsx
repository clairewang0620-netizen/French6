import React, { useState, useMemo } from 'react';
import { Level } from '../types';
import { VOCAB_DATA } from '../data/vocab';
import { AudioButton } from '../components/AudioButton';
import { ChevronLeft, ChevronRight, BookOpen, Layers, Repeat } from 'lucide-react';
import { clsx } from 'clsx';

export const Vocab: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState<Level>(Level.A1);
  const [viewMode, setViewMode] = useState<'list' | 'flashcard'>('list');
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const words = useMemo(() => VOCAB_DATA.filter(w => w.level === currentLevel), [currentLevel]);

  const handleLevelChange = (lvl: Level) => {
    setCurrentLevel(lvl);
    setCardIndex(0);
    setIsFlipped(false);
  };

  const nextCard = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCardIndex((prev) => (prev + 1) % words.length);
    setIsFlipped(false);
  };

  const prevCard = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCardIndex((prev) => (prev - 1 + words.length) % words.length);
    setIsFlipped(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Level Selector */}
      <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center overflow-x-auto">
        <div className="flex space-x-1 w-full">
          {Object.values(Level).map(lvl => (
            <button
              key={lvl}
              onClick={() => handleLevelChange(lvl)}
              className={clsx(
                "flex-1 px-3 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap",
                currentLevel === lvl 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-gray-500 hover:bg-gray-50'
              )}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="flex justify-between items-center px-1">
        <span className="text-gray-500 text-sm font-medium">{words.length} 个单词</span>
        <div className="bg-gray-100 p-1 rounded-lg flex text-xs font-medium">
          <button 
            onClick={() => setViewMode('list')}
            className={clsx(
              "px-3 py-1.5 rounded-md flex items-center gap-1 transition-all",
              viewMode === 'list' ? "bg-white text-primary shadow-sm" : "text-gray-500 hover:text-gray-700"
            )}
          >
            <BookOpen size={14} /> 列表
          </button>
          <button 
            onClick={() => setViewMode('flashcard')}
            className={clsx(
              "px-3 py-1.5 rounded-md flex items-center gap-1 transition-all",
              viewMode === 'flashcard' ? "bg-white text-primary shadow-sm" : "text-gray-500 hover:text-gray-700"
            )}
          >
            <Layers size={14} /> 卡片
          </button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="grid gap-3 animate-fade-in">
          {words.map((word) => (
            <div key={word.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:border-blue-200 transition-colors">
              <div className="flex-1">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-bold text-lg text-slate-800">{word.term}</span>
                  <span className="text-xs text-gray-400 font-mono bg-gray-50 px-1.5 py-0.5 rounded">{word.ipa}</span>
                </div>
                <div className="text-sm text-gray-600">{word.definition}</div>
              </div>
              <AudioButton text={word.term} className="bg-blue-50 text-primary hover:bg-primary hover:text-white transition-colors" />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center animate-fade-in">
          {/* Flashcard Container */}
          <div 
            className="relative w-full aspect-[4/5] md:aspect-[16/9] perspective cursor-pointer group max-h-[500px]"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div className={clsx(
              "relative w-full h-full duration-500 preserve-3d transition-transform shadow-xl rounded-2xl",
              isFlipped && "rotate-y-180"
            )}>
              {/* Front Side */}
              <div className="absolute w-full h-full backface-hidden bg-white rounded-2xl border border-gray-100 flex flex-col items-center justify-center p-8 text-center">
                <div className="absolute top-4 right-4 bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-bold">{currentLevel}</div>
                <div className="absolute top-4 left-4 text-gray-300 text-xs">
                  {cardIndex + 1} / {words.length}
                </div>
                
                <div className="flex-1 flex flex-col items-center justify-center w-full">
                  <h2 className="text-5xl font-bold text-slate-800 mb-4">{words[cardIndex].term}</h2>
                  <span className="text-gray-400 font-mono text-lg">{words[cardIndex].ipa}</span>
                </div>
                
                <div className="mt-auto w-full flex justify-center pb-8" onClick={(e) => e.stopPropagation()}>
                  <AudioButton text={words[cardIndex].term} size={32} className="bg-primary text-white p-4 hover:bg-blue-700 hover:scale-110 shadow-lg" />
                </div>
                <p className="text-xs text-gray-300 absolute bottom-4">点击翻转查看释义</p>
              </div>

              {/* Back Side */}
              <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-slate-800 rounded-2xl text-white flex flex-col items-center justify-center p-8 text-center">
                <div className="flex-1 flex flex-col items-center justify-center w-full">
                  <h3 className="text-2xl font-bold mb-6 text-blue-200">{words[cardIndex].definition}</h3>
                  
                  <div className="bg-white/10 p-5 rounded-xl w-full text-left backdrop-blur-sm border border-white/10">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-lg font-medium leading-relaxed">{words[cardIndex].exampleFr}</p>
                      <div onClick={(e) => e.stopPropagation()} className="shrink-0 ml-3">
                        <AudioButton text={words[cardIndex].exampleFr} size={20} className="bg-white/20 text-white hover:bg-white/30" />
                      </div>
                    </div>
                    <p className="text-white/60 text-sm mt-2 pt-2 border-t border-white/10">{words[cardIndex].exampleCn}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 absolute bottom-4">点击翻转回单词</p>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-8 mt-8">
            <button onClick={prevCard} className="p-4 bg-white rounded-full shadow-md border border-gray-100 hover:bg-gray-50 text-gray-600 active:scale-95 transition-all">
              <ChevronLeft />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); setIsFlipped(!isFlipped); }} 
              className="px-6 py-2 bg-white rounded-full text-sm font-medium text-primary shadow-sm border border-gray-100 hover:bg-blue-50 transition-colors flex items-center gap-2"
            >
              <Repeat size={14} /> 翻转
            </button>
            <button onClick={nextCard} className="p-4 bg-white rounded-full shadow-md border border-gray-100 hover:bg-gray-50 text-gray-600 active:scale-95 transition-all">
              <ChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};