import React, { useState, useEffect, useRef } from 'react';
import { VOCAB_DATA } from '../data/vocab';
import { Word } from '../types';
import { audioService } from '../services/audioService';
import { storageService } from '../services/storageService';
import { Headphones, CheckCircle, XCircle, ArrowRight, RefreshCw, Play } from 'lucide-react';
import { clsx } from 'clsx';

type State = 'idle' | 'playing' | 'result';

export const Dictation: React.FC = () => {
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [userInput, setUserInput] = useState('');
  const [status, setStatus] = useState<State>('idle');
  const [isCorrect, setIsCorrect] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Pick random word on mount or session change
  useEffect(() => {
    pickRandomWord();
  }, [sessionCount]);

  const pickRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * VOCAB_DATA.length);
    const word = VOCAB_DATA[randomIndex];
    setCurrentWord(word);
    setUserInput('');
    setStatus('idle');
    setIsCorrect(false);
    
    // Auto focus input
    setTimeout(() => {
        if(inputRef.current) inputRef.current.focus();
    }, 100);
  };

  const playAudio = () => {
    if (currentWord) {
      audioService.speak(currentWord.french);
      // Re-focus input after click play
      inputRef.current?.focus();
    }
  };

  const normalize = (str: string) => {
    // Basic normalization: lowercase, trim. 
    // In a real app, you might remove accents for lenient mode, but here we require strict accents for learning.
    return str.trim().toLowerCase();
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!currentWord || status === 'result') return;

    const input = normalize(userInput);
    const answer = normalize(currentWord.french);

    const correct = input === answer;
    setIsCorrect(correct);
    setStatus('result');

    if (!correct) {
      storageService.saveDictationMistake(currentWord.id, currentWord.french, currentWord.chinese);
    }
  };

  const handleNext = () => {
    setSessionCount(prev => prev + 1);
  };

  if (!currentWord) return null;

  return (
    <div className="page-container max-w-2xl mx-auto flex flex-col justify-center min-h-[60vh]">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-[#002654] flex items-center justify-center gap-3">
          <Headphones size={32} /> 单词听写
        </h1>
        <p className="text-gray-500 mt-2">听音拼写 · 严格区分重音符号</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 relative overflow-hidden">
        {/* Progress Hint */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-100">
             <div className="h-full bg-cyan-500 transition-all" style={{ width: `${(sessionCount % 10) * 10}%` }}></div>
        </div>

        {/* Audio Section */}
        <div className="flex flex-col items-center mb-10">
          <button 
            onClick={playAudio}
            className="w-24 h-24 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center hover:bg-cyan-100 hover:scale-105 active:scale-95 transition-all shadow-sm border border-cyan-100 mb-4"
          >
            <Play size={40} fill="currentColor" className="ml-1" />
          </button>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">点击播放发音</p>
        </div>

        {/* Input Section */}
        <form onSubmit={handleSubmit} className="relative max-w-sm mx-auto">
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={status === 'result'}
            placeholder="在此输入法语..."
            className={clsx(
              "w-full text-center text-2xl font-bold py-4 border-b-2 bg-transparent outline-none transition-colors placeholder:font-normal placeholder:text-gray-300",
              status === 'idle' ? "border-gray-200 focus:border-[#002654] text-[#1A202C]" : "",
              status === 'result' && isCorrect ? "border-green-500 text-green-600" : "",
              status === 'result' && !isCorrect ? "border-red-500 text-red-600 line-through decoration-2" : ""
            )}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </form>

        {/* Feedback Section */}
        {status === 'result' && (
            <div className="mt-8 animate-slide-up text-center">
                {isCorrect ? (
                    <div className="flex flex-col items-center text-green-600">
                        <CheckCircle size={48} className="mb-2" />
                        <span className="font-bold text-xl">拼写正确！</span>
                        <p className="text-gray-400 mt-2">{currentWord.chinese}</p>
                    </div>
                ) : (
                    <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                        <div className="flex justify-center text-[#CE1126] mb-2"><XCircle size={32} /></div>
                        <p className="text-sm text-gray-500 font-bold uppercase mb-1">正确拼写</p>
                        <p className="text-2xl font-black text-[#002654] mb-2">{currentWord.french}</p>
                        <p className="text-gray-500">{currentWord.chinese}</p>
                    </div>
                )}
            </div>
        )}

        {/* Action Button */}
        <div className="mt-10">
            {status === 'idle' ? (
                <button 
                    onClick={handleSubmit}
                    disabled={!userInput.trim()}
                    className="w-full py-4 rounded-xl bg-[#002654] text-white font-bold text-lg hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg active:scale-[0.98]"
                >
                    提交答案
                </button>
            ) : (
                <button 
                    onClick={handleNext}
                    className={clsx(
                        "w-full py-4 rounded-xl text-white font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98]",
                        isCorrect ? "bg-green-600 hover:bg-green-700" : "bg-[#002654] hover:bg-blue-900"
                    )}
                >
                    下一题 <ArrowRight size={20} />
                </button>
            )}
        </div>

      </div>
      
      <div className="text-center mt-6">
         <button 
            onClick={pickRandomWord} 
            className="text-gray-400 hover:text-[#002654] text-sm flex items-center justify-center gap-1 mx-auto transition-colors"
         >
            <RefreshCw size={14} /> 换一个词
         </button>
      </div>
    </div>
  );
};