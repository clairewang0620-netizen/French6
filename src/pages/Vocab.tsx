import React, { useState } from 'react';
import { Level, Word } from '../types';
import { VOCAB_DATA } from '../data/vocab';
import { AudioButton } from '../components/AudioButton';
import { ArrowLeft, Book, ChevronLeft, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';

type ViewState = 'list' | 'flashcard';

export const Vocab: React.FC = () => {
  // Default View is List
  const [view, setView] = useState<ViewState>('list');
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const [filterLevel, setFilterLevel] = useState<Level | 'ALL'>('ALL');

  // Filter words
  const displayWords = filterLevel === 'ALL' 
    ? VOCAB_DATA 
    : VOCAB_DATA.filter(w => w.level === filterLevel);

  const handleWordClick = (word: Word) => {
    setSelectedWord(word);
    setView('flashcard');
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setView('list');
    setSelectedWord(null);
  };

  const navigateWord = (direction: 'next' | 'prev') => {
    if (!selectedWord) return;
    const currentIndex = displayWords.findIndex(w => w.id === selectedWord.id);
    if (currentIndex === -1) return;

    let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    
    // Loop navigation logic (optional, but good for UX, or stop at ends)
    if (newIndex >= displayWords.length) newIndex = 0;
    if (newIndex < 0) newIndex = displayWords.length - 1;

    setSelectedWord(displayWords[newIndex]);
  };

  return (
    <div className="page-container max-w-4xl mx-auto">
      {/* ------------------- LIST VIEW ------------------- */}
      {view === 'list' && (
        <div className="animate-fade-in space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-[#002654]">核心单词表</h1>
            <p className="text-gray-500">点击单词进入卡片学习</p>
          </div>

          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            <button 
              onClick={() => setFilterLevel('ALL')}
              className={clsx(
                "px-4 py-1.5 rounded-full text-sm font-bold border transition-colors",
                filterLevel === 'ALL' ? "bg-[#002654] text-white border-[#002654]" : "bg-white text-gray-500 border-gray-200 hover:border-[#002654]"
              )}
            >
              全部
            </button>
            {Object.values(Level).map(lvl => (
              <button 
                key={lvl}
                onClick={() => setFilterLevel(lvl)}
                className={clsx(
                  "px-4 py-1.5 rounded-full text-sm font-bold border transition-colors",
                  filterLevel === lvl ? "bg-[#002654] text-white border-[#002654]" : "bg-white text-gray-500 border-gray-200 hover:border-[#002654]"
                )}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Word List */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-50 text-xs font-bold text-gray-400 uppercase tracking-wider flex justify-between">
              <span>词汇列表 ({displayWords.length})</span>
              <span>等级</span>
            </div>
            {displayWords.map((word, index) => (
              <div 
                key={word.id}
                onClick={() => handleWordClick(word)}
                className={clsx(
                  "p-5 flex items-center justify-between cursor-pointer hover:bg-blue-50 transition-colors border-b border-gray-50 last:border-0 group",
                )}
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-400 group-hover:bg-[#002654] group-hover:text-white transition-colors">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-[#1A202C] group-hover:text-[#002654]">{word.french}</h3>
                    <p className="text-sm text-gray-500">{word.chinese}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={clsx(
                    "text-xs font-bold px-2 py-1 rounded",
                    word.level === Level.A1 && "bg-green-100 text-green-700",
                    word.level === Level.A2 && "bg-blue-100 text-blue-700",
                    word.level === Level.B1 && "bg-yellow-100 text-yellow-700",
                    word.level === Level.B2 && "bg-orange-100 text-orange-700",
                    word.level === Level.C1 && "bg-red-100 text-red-700",
                  )}>
                    {word.level}
                  </span>
                  <Book size={16} className="text-gray-300 group-hover:text-[#002654]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------- FLASHCARD VIEW ------------------- */}
      {view === 'flashcard' && selectedWord && (
        <div className="animate-slide-up flex flex-col items-center min-h-[70vh] justify-center relative">
          <button 
            onClick={handleBack}
            className="absolute top-0 left-0 flex items-center gap-2 text-gray-500 hover:text-[#002654] font-medium transition-colors"
          >
            <ArrowLeft size={20} /> 返回列表
          </button>

          <div className="w-full flex items-center justify-between gap-4">
            
            {/* Prev Button */}
            <button 
              onClick={() => navigateWord('prev')}
              className="p-3 rounded-full hover:bg-gray-100 text-gray-400 hover:text-[#002654] transition-colors hidden md:block"
            >
              <ChevronLeft size={32} />
            </button>

            {/* Card */}
            <div className="flex-1 max-w-lg bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 text-center relative overflow-hidden mx-auto">
              <div className="absolute top-0 left-0 w-full h-2 bg-[#002654]"></div>
              
              <span className="absolute top-6 right-6 text-xs font-black text-gray-200 text-4xl select-none">
                {selectedWord.level}
              </span>

              {/* Word Section */}
              <div className="mb-10">
                <h2 className="text-5xl md:text-6xl font-black text-[#002654] mb-3 tracking-tight">
                  {selectedWord.french}
                </h2>
                <div className="inline-flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                  <span className="font-mono text-gray-500">{selectedWord.ipa}</span>
                  <AudioButton text={selectedWord.french} className="text-[#CE1126]" />
                </div>
              </div>

              <div className="w-16 h-1 bg-gray-100 mx-auto mb-10 rounded-full"></div>

              {/* Meaning Section */}
              <h3 className="text-2xl font-bold text-gray-800 mb-10">
                {selectedWord.chinese}
              </h3>

              {/* Example Section */}
              <div className="bg-[#F7F9FC] p-6 rounded-2xl border border-gray-200 text-left relative">
                <div className="absolute top-4 right-4">
                   <AudioButton text={selectedWord.example.french} className="text-[#002654]" size={18} />
                </div>
                <p className="text-lg text-[#002654] font-medium mb-2 pr-8 leading-relaxed">
                  {selectedWord.example.french}
                </p>
                <p className="text-sm text-gray-500">
                  {selectedWord.example.chinese}
                </p>
              </div>
            </div>

            {/* Next Button */}
            <button 
              onClick={() => navigateWord('next')}
              className="p-3 rounded-full hover:bg-gray-100 text-gray-400 hover:text-[#002654] transition-colors hidden md:block"
            >
              <ChevronRight size={32} />
            </button>
          </div>
          
          {/* Mobile Navigation Controls */}
          <div className="flex md:hidden items-center gap-8 mt-8">
            <button 
              onClick={() => navigateWord('prev')}
              className="p-4 rounded-full bg-white shadow-md border border-gray-100 text-gray-600 active:scale-95 transition-transform"
            >
              <ChevronLeft size={24} />
            </button>
            <span className="text-sm font-bold text-gray-400">
              {displayWords.findIndex(w => w.id === selectedWord.id) + 1} / {displayWords.length}
            </span>
            <button 
              onClick={() => navigateWord('next')}
              className="p-4 rounded-full bg-white shadow-md border border-gray-100 text-gray-600 active:scale-95 transition-transform"
            >
              <ChevronRight size={24} />
            </button>
          </div>

        </div>
      )}
    </div>
  );
};