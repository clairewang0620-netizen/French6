import React, { useState, useEffect } from 'react';
import { Level, Word } from '../types';
import { VOCAB_DATA } from '../data/vocab';
import { AudioButton } from '../components/AudioButton';
import { ArrowLeft, Book, ChevronLeft, ChevronRight, Star, Check, Bookmark, Layers } from 'lucide-react';
import { storageService } from '../services/storageService';
import { clsx } from 'clsx';

type ViewState = 'list' | 'flashcard';

export const Vocab: React.FC = () => {
  // Default View is List
  const [view, setView] = useState<ViewState>('list');
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const [filterLevel, setFilterLevel] = useState<Level | 'ALL'>('ALL');
  const [showStrengthenedOnly, setShowStrengthenedOnly] = useState(false);
  const [strengthenedIds, setStrengthenedIds] = useState<string[]>([]);

  useEffect(() => {
    // Load strengthened words on mount
    setStrengthenedIds(storageService.getStrengthenedWordIds());
  }, []);

  const handleToggleStrengthen = (wordId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    storageService.toggleStrengthenWord(wordId);
    setStrengthenedIds(storageService.getStrengthenedWordIds());
  };

  // Filter words logic
  let displayWords = filterLevel === 'ALL' 
    ? VOCAB_DATA 
    : VOCAB_DATA.filter(w => w.level === filterLevel);

  if (showStrengthenedOnly) {
    displayWords = displayWords.filter(w => strengthenedIds.includes(w.id));
  }

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
    
    // Loop navigation logic
    if (newIndex >= displayWords.length) newIndex = 0;
    if (newIndex < 0) newIndex = displayWords.length - 1;

    setSelectedWord(displayWords[newIndex]);
  };

  const handleAction = (action: 'know' | 'strengthen') => {
    if (!selectedWord) return;
    if (action === 'strengthen') {
      if (!strengthenedIds.includes(selectedWord.id)) {
        handleToggleStrengthen(selectedWord.id);
      }
    }
    navigateWord('next');
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

          {/* Controls Container */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            {/* Level Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              <button 
                onClick={() => setFilterLevel('ALL')}
                className={clsx(
                  "px-3 py-1.5 rounded-full text-xs font-bold border transition-colors",
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
                    "px-3 py-1.5 rounded-full text-xs font-bold border transition-colors",
                    filterLevel === lvl ? "bg-[#002654] text-white border-[#002654]" : "bg-white text-gray-500 border-gray-200 hover:border-[#002654]"
                  )}
                >
                  {lvl}
                </button>
              ))}
            </div>

            {/* Strengthen Filter Toggle */}
            <button
              onClick={() => setShowStrengthenedOnly(!showStrengthenedOnly)}
              className={clsx(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all border",
                showStrengthenedOnly 
                  ? "bg-amber-50 text-amber-700 border-amber-200 shadow-sm" 
                  : "bg-gray-50 text-gray-500 border-transparent hover:bg-gray-100"
              )}
            >
              <Bookmark size={16} fill={showStrengthenedOnly ? "currentColor" : "none"} />
              {showStrengthenedOnly ? "只看强化集" : "强化集"}
            </button>
          </div>

          {/* Word List */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[300px]">
            {displayWords.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <Layers size={48} className="mb-4 opacity-20" />
                <p>暂无单词</p>
                {showStrengthenedOnly && <p className="text-xs mt-2">在单词卡片中点击“加强记忆”加入此列表</p>}
              </div>
            ) : (
              <>
                <div className="p-4 border-b border-gray-50 text-xs font-bold text-gray-400 uppercase tracking-wider flex justify-between">
                  <span>词汇列表 ({displayWords.length})</span>
                  <span>等级</span>
                </div>
                {displayWords.map((word, index) => {
                  const isStrengthened = strengthenedIds.includes(word.id);
                  return (
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
                          <div className="flex items-center gap-2">
                             <h3 className="font-bold text-lg text-[#1A202C] group-hover:text-[#002654]">{word.french}</h3>
                             {isStrengthened && <Star size={14} className="text-amber-400 fill-amber-400" />}
                          </div>
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
                  );
                })}
              </>
            )}
          </div>
        </div>
      )}

      {/* ------------------- FLASHCARD VIEW ------------------- */}
      {view === 'flashcard' && selectedWord && (
        <div className="animate-slide-up flex flex-col items-center min-h-[70vh] justify-center relative pb-20">
          <button 
            onClick={handleBack}
            className="absolute top-0 left-0 flex items-center gap-2 text-gray-500 hover:text-[#002654] font-medium transition-colors"
          >
            <ArrowLeft size={20} /> 返回列表
          </button>

          <div className="w-full flex items-center justify-between gap-4">
            
            {/* Prev Button (Desktop) */}
            <button 
              onClick={() => navigateWord('prev')}
              className="p-3 rounded-full hover:bg-gray-100 text-gray-400 hover:text-[#002654] transition-colors hidden md:block"
            >
              <ChevronLeft size={32} />
            </button>

            {/* Card */}
            <div className="flex-1 max-w-lg bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 text-center relative overflow-hidden mx-auto">
              <div className="absolute top-0 left-0 w-full h-2 bg-[#002654]"></div>
              
              {strengthenedIds.includes(selectedWord.id) && (
                <div className="absolute top-4 left-4 text-amber-500 bg-amber-50 px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1">
                  <Star size={12} fill="currentColor" /> 强化中
                </div>
              )}
              
              <span className="absolute top-6 right-6 text-xs font-black text-gray-200 text-4xl select-none">
                {selectedWord.level}
              </span>

              {/* Word Section */}
              <div className="mb-10 mt-4">
                <h2 className="text-5xl md:text-6xl font-black text-[#002654] mb-3 tracking-tight break-words">
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

              {/* Action Buttons (Learning Mode) */}
              <div className="mt-10 grid grid-cols-2 gap-4">
                 <button
                    onClick={() => handleAction('strengthen')}
                    className="flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-all active:scale-95"
                 >
                    <Star size={20} /> 加强记忆
                 </button>
                 <button
                    onClick={() => handleAction('know')}
                    className="flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 transition-all active:scale-95"
                 >
                    <Check size={20} /> 认识
                 </button>
              </div>
            </div>

            {/* Next Button (Desktop) */}
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