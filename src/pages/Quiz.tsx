import React, { useState, useEffect } from 'react';
import { Level, QuizQuestion } from '../types';
import { QUIZ_DATA } from '../data/quiz';
import { storageService } from '../services/storageService';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { clsx } from 'clsx';

export const Quiz: React.FC = () => {
  const [level, setLevel] = useState<Level>(Level.A1);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    // Reset when level changes
    const levelQuestions = QUIZ_DATA.filter(q => q.level === level);
    setQuestions(levelQuestions);
    resetQuiz();
  }, [level]);

  const resetQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
    setFinished(false);
  };

  const handleOptionSelect = (idx: number) => {
    if (showResult) return;
    setSelectedOption(idx);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    
    const isCorrect = selectedOption === questions[currentIndex].answer;
    
    if (isCorrect) {
      setScore(s => s + 1);
      storageService.removeMistake(questions[currentIndex].id);
    } else {
      storageService.saveMistake(questions[currentIndex].id);
    }
    
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setFinished(true);
    }
  };

  if (questions.length === 0) return <div className="p-4 text-center">No questions for this level.</div>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex gap-2 justify-center mb-8">
        {Object.values(Level).map(lvl => (
          <button
            key={lvl}
            onClick={() => setLevel(lvl)}
            disabled={finished && lvl === level}
            className={clsx(
              "px-4 py-2 rounded-full text-sm font-bold transition-all",
              level === lvl 
                ? 'bg-[#002654] text-white shadow-md' 
                : 'bg-white text-gray-500 border border-gray-200 hover:border-[#002654]'
            )}
          >
            {lvl}
          </button>
        ))}
      </div>

      {finished ? (
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center border border-gray-100">
          <h2 className="text-2xl font-bold mb-4 text-[#002654]">测试完成!</h2>
          <div className="text-5xl font-black text-[#CE1126] mb-2">{score} / {questions.length}</div>
          <p className="text-gray-500 mb-8">准确率: {Math.round((score / questions.length) * 100)}%</p>
          <button 
            onClick={resetQuiz}
            className="flex items-center gap-2 mx-auto bg-[#002654] text-white px-8 py-3 rounded-full hover:bg-blue-900 transition-colors font-medium shadow-md"
          >
            <RefreshCw size={18} /> 再测一次
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="flex justify-between text-sm text-gray-400 mb-6 font-mono">
            <span>Question {currentIndex + 1}/{questions.length}</span>
            <span>Score: {score}</span>
          </div>

          <h3 className="text-xl font-bold mb-8 text-[#1A202C] leading-snug">{questions[currentIndex].question}</h3>

          <div className="space-y-3">
            {questions[currentIndex].options.map((opt, idx) => {
              let btnClass = "w-full p-4 text-left rounded-xl border-2 transition-all font-medium ";
              if (showResult) {
                if (idx === questions[currentIndex].answer) btnClass += "bg-green-50 border-green-500 text-green-800";
                else if (idx === selectedOption) btnClass += "bg-red-50 border-red-500 text-red-800";
                else btnClass += "bg-gray-50 border-transparent opacity-50";
              } else {
                if (idx === selectedOption) btnClass += "bg-blue-50 border-[#002654] text-[#002654]";
                else btnClass += "hover:bg-gray-50 border-gray-100 text-gray-600";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  className={btnClass}
                  disabled={showResult}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {showResult && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100 animate-fade-in">
              <div className="flex items-center gap-2 font-bold mb-1">
                {selectedOption === questions[currentIndex].answer ? (
                  <span className="text-green-600 flex items-center gap-1"><CheckCircle size={18}/> 正确</span>
                ) : (
                  <span className="text-[#CE1126] flex items-center gap-1"><XCircle size={18}/> 错误</span>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-2">{questions[currentIndex].explanation}</p>
            </div>
          )}

          <div className="mt-8">
            {!showResult ? (
              <button 
                onClick={handleSubmit} 
                disabled={selectedOption === null}
                className="w-full bg-[#002654] text-white py-4 rounded-xl font-bold disabled:opacity-50 hover:bg-blue-900 transition-colors shadow-md"
              >
                提交
              </button>
            ) : (
              <button 
                onClick={handleNext}
                className="w-full bg-[#CE1126] text-white py-4 rounded-xl font-bold hover:bg-red-700 transition-colors shadow-md"
              >
                {currentIndex === questions.length - 1 ? '查看结果' : '下一题'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};