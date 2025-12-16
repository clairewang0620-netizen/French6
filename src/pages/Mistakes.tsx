import React, { useState, useEffect } from 'react';
import { storageService, DictationMistake } from '../services/storageService';
import { QUIZ_DATA } from '../data/quiz';
import { QuizQuestion } from '../types';
import { Trash2, Brain, Headphones, AlertTriangle } from 'lucide-react';
import { clsx } from 'clsx';

type Tab = 'quiz' | 'dictation';

export const Mistakes: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('quiz');
  const [quizMistakes, setQuizMistakes] = useState<QuizQuestion[]>([]);
  const [dictMistakes, setDictMistakes] = useState<DictationMistake[]>([]);

  const loadData = () => {
    // Load Quiz Mistakes
    const ids = storageService.getMistakes();
    const qData = QUIZ_DATA.filter(q => ids.includes(q.id));
    setQuizMistakes(qData);

    // Load Dictation Mistakes
    const dData = storageService.getDictationMistakes();
    // Sort by wrong count desc
    dData.sort((a, b) => b.wrongCount - a.wrongCount);
    setDictMistakes(dData);
  };

  useEffect(() => {
    loadData();
  }, []);

  const removeQuizMistake = (id: string) => {
    storageService.removeMistake(id);
    loadData();
  };

  const removeDictMistake = (id: string) => {
    storageService.removeDictationMistake(id);
    loadData();
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-[#002654]">
        错题本 
      </h2>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-gray-100">
        <button
          onClick={() => setActiveTab('quiz')}
          className={clsx(
            "pb-3 px-4 font-bold text-sm flex items-center gap-2 transition-all border-b-2",
            activeTab === 'quiz' 
              ? "text-[#002654] border-[#002654]" 
              : "text-gray-400 border-transparent hover:text-gray-600"
          )}
        >
          <Brain size={18} /> 测试错题 
          <span className="bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full text-xs">{quizMistakes.length}</span>
        </button>
        <button
          onClick={() => setActiveTab('dictation')}
          className={clsx(
            "pb-3 px-4 font-bold text-sm flex items-center gap-2 transition-all border-b-2",
            activeTab === 'dictation' 
              ? "text-[#002654] border-[#002654]" 
              : "text-gray-400 border-transparent hover:text-gray-600"
          )}
        >
          <Headphones size={18} /> 听写错词
          <span className="bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full text-xs">{dictMistakes.length}</span>
        </button>
      </div>

      {/* CONTENT: QUIZ */}
      {activeTab === 'quiz' && (
        <>
          {quizMistakes.length === 0 ? (
            <div className="text-center py-20 text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <p>暂无测试错题</p>
            </div>
          ) : (
            <div className="space-y-4">
              {quizMistakes.map(q => (
                <div key={q.id} className="bg-white p-5 rounded-xl shadow-sm border border-l-4 border-l-secondary relative animate-fade-in">
                  <span className="absolute top-4 right-4 text-xs font-bold text-gray-300">{q.level}</span>
                  <p className="font-medium text-lg mb-3 pr-6 text-[#1A202C]">{q.question}</p>
                  <div className="space-y-1 mb-4">
                    {q.options.map((opt, idx) => (
                      <div key={idx} className={`text-sm px-3 py-1 rounded ${idx === q.answer ? 'bg-green-100 text-green-800 font-medium' : 'text-gray-400'}`}>
                        {opt} {idx === q.answer && '✓'}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-end border-t pt-3 border-gray-50">
                    <p className="text-xs text-gray-500 flex-1 mr-4">{q.explanation}</p>
                    <button 
                      onClick={() => removeQuizMistake(q.id)}
                      className="text-gray-300 hover:text-red-500 p-2 transition-colors"
                      title="移除此题"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* CONTENT: DICTATION */}
      {activeTab === 'dictation' && (
        <>
          {dictMistakes.length === 0 ? (
            <div className="text-center py-20 text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <p>暂无听写错词</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dictMistakes.map(m => (
                <div key={m.wordId} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between animate-fade-in">
                   <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-xl text-[#002654]">{m.french}</h3>
                        {m.wrongCount > 2 && (
                          <div className="flex items-center gap-1 text-[10px] font-bold bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded">
                             <AlertTriangle size={10} /> 易错 {m.wrongCount}次
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{m.chinese}</p>
                   </div>
                   <button 
                      onClick={() => removeDictMistake(m.wordId)}
                      className="text-gray-300 hover:text-red-500 p-2 transition-colors"
                      title="已掌握，移除"
                    >
                      <Trash2 size={18} />
                    </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};