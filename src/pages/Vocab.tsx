import React, { useState, useMemo } from 'react';
import { Level } from '../types';
import { VOCAB_DATA } from '../data/vocab';
import { AudioButton } from '../components/AudioButton';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

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

  const nextCard = () => {
    setCardIndex((prev) => (prev + 1) % words.length);
    setIsFlipped(false);
  };

  const prevCard = () => {
    setCardIndex((prev) => (prev - 1 + words.length) % words.length);
    setIsFlipped(false);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      {/* Controls */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        {Object.values(Level).map(lvl => (
          <button
            key={lvl}
            onClick={() => handleLevelChange(lvl)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-all ${
              currentLevel === lvl 
                ? 'bg-primary text-white shadow-md transform scale-105' 
                : 'bg-white text-gray-600 border hover:bg-gray-50'
            }`}
          >
            {lvl}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-500 text-sm">{words.length} 个单词</span>
        <button 
          onClick={() => setViewMode(viewMode === 'list' ? 'flashcard' : 'list')}
          className="flex items-center gap-1 text-sm text-primary font-medium px-3 py-1 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
        >
          <BookOpen size={16} />
          {viewMode === 'list' ? '切换卡片模式' : '切换列表模式'}
        </button>
      </div>

      {viewMode === 'list' ? (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          {words.map((word) => (
            <div key={word.id} className="p-4 border-b last:border-0 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div>
                <div className="font-bold text-lg text-primary">{word.term}</div>
                <div className="text-xs text-gray-500 font-mono mb-1">{word.ipa}</div>
                <div className="text-sm text-gray-700">{word.definition}</div>
              </div>
              <AudioButton text={word.term} className="text-gray-400 hover:text-primary" />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center min-h-[50vh] justify-center">
          {words.length > 0 ? (
            <div 
              className="relative w-full h-80 perspective cursor-pointer group"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div className={`relative w-full h-full duration-500 preserve-3d transition-transform ${isFlipped ? 'rotate-y-180' : ''}`}>
                {/* Front */}
                <div className="absolute w-full h-full backface-hidden bg-white border-2 border-primary/10 shadow-xl rounded-2xl flex flex-col items-center justify-center p-6 text-center">
                  <span className="text-4xl font-bold text-primary mb-4">{words[cardIndex].term}</span>
                  <span className="text-gray-500 font-mono mb-6 bg-gray-100 px-2 py-1 rounded">{words[cardIndex].ipa}</span>
                  <div 
                    className="absolute bottom-6 right-6" 
                    onClick={(e) => e.stopPropagation()} 
                  >
                     <AudioButton text={words[cardIndex].term} size={32} className="bg-blue-50 text-primary hover:bg-blue-100" />
                  </div>
                  <p className="text-xs text-gray-400 absolute bottom-4 left-0 right-0">点击卡片查看释义</p>
                </div>

                {/* Back */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 shadow-xl rounded-2xl flex flex-col items-center justify-center p-6 text-center">
                   <h3 className="text-2xl font-bold mb-6 text-gray-800">{words[cardIndex].definition}</h3>
                   <div className="bg-white p-4 rounded-xl shadow-sm w-full text-left border border-gray-100">
                     <div className="flex justify-between items-start mb-2">
                       <p className="text-primary font-medium leading-relaxed">{words[cardIndex].exampleFr}</p>
                       <div onClick={(e) => e.stopPropagation()} className="shrink-0 ml-2">
                         <AudioButton text={words[cardIndex].exampleFr} size={18}/>
                       </div>
                     </div>
                     <p className="text-gray-500 text-sm border-t pt-2 mt-1">{words[cardIndex].exampleCn}</p>
                   </div>
                </div>
              </div>
            </div>
          ) : (
             <div className="text-gray-500">暂无数据</div>
          )}

          <div className="flex items-center gap-8 mt-8">
            <button onClick={prevCard} className="p-4 bg-white rounded-full shadow-lg hover:bg-gray-50 text-primary transition-transform active:scale-95"><ChevronLeft /></button>
            <span className="font-mono text-gray-500 font-medium">{cardIndex + 1} / {words.length}</span>
            <button onClick={nextCard} className="p-4 bg-white rounded-full shadow-lg hover:bg-gray-50 text-primary transition-transform active:scale-95"><ChevronRight /></button>
          </div>
        </div>
      )}
    </div>
  );
};