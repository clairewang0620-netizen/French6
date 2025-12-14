import React, { useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { QUIZ_DATA } from '../data/quiz';
import { QuizQuestion } from '../types';
import { Trash2 } from 'lucide-react';

export const Mistakes: React.FC = () => {
  const [mistakes, setMistakes] = useState<QuizQuestion[]>([]);

  const loadMistakes = () => {
    const ids = storageService.getMistakes();
    const data = QUIZ_DATA.filter(q => ids.includes(q.id));
    setMistakes(data);
  };

  useEffect(() => {
    loadMistakes();
  }, []);

  const removeMistake = (id: string) => {
    storageService.removeMistake(id);
    loadMistakes();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        错题本 
        <span className="text-sm font-normal bg-red-100 text-red-600 px-2 py-1 rounded-full">
          {mistakes.length}
        </span>
      </h2>

      {mistakes.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p>太棒了！暂时没有错题。</p>
          <p className="text-sm mt-2">在测试中答错的题目会自动出现在这里。</p>
        </div>
      ) : (
        <div className="space-y-4">
          {mistakes.map(q => (
            <div key={q.id} className="bg-white p-5 rounded-lg shadow-sm border border-l-4 border-l-secondary relative">
              <span className="absolute top-4 right-4 text-xs font-bold text-gray-300">{q.level}</span>
              <p className="font-medium text-lg mb-3 pr-6">{q.question}</p>
              <div className="space-y-1 mb-4">
                {q.options.map((opt, idx) => (
                  <div key={idx} className={`text-sm px-3 py-1 rounded ${idx === q.answer ? 'bg-green-100 text-green-800 font-medium' : 'text-gray-500'}`}>
                    {opt} {idx === q.answer && '✓'}
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-end border-t pt-3">
                <p className="text-xs text-gray-500 flex-1 mr-4">{q.explanation}</p>
                <button 
                  onClick={() => removeMistake(q.id)}
                  className="text-gray-400 hover:text-red-500 p-2"
                  title="移除此题"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};