import React, { useState, useEffect } from 'react';
import { Level, QuizQuestion } from '../types';
import { QUIZ_DATA } from '../data/quiz';
import { storageService } from '../services/storageService';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';

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
      // Remove from mistakes if it was there (optional logic, but good for UX)
      storageService.removeMistake(questions[currentIndex].id);
    } else {
      // Add to mistakes
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
      <div className="flex gap-2 justify-center mb-6">
        {Object.values(Level).map(lvl => (
          <button
            key={lvl}
            onClick={() => setLevel(lvl)}
            disabled={finished && lvl === level}
            className={`px-3 py-1 rounded text-sm ${level === lvl ? 'bg-primary text-white' : 'bg-gray-200'}`}
          >
            {lvl}
          </button>
        ))}
      </div>

      {finished ? (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">测试完成!</h2>
          <div className="text-4xl font-black text-primary mb-2">{score} / {questions.length}</div>
          <p className="text-gray-500 mb-6">准确率: {Math.round((score / questions.length) * 100)}%</p>
          <button 
            onClick={resetQuiz}
            className="flex items-center gap-2 mx-auto bg-primary text-white px-6 py-2 rounded-full hover:bg-blue-700"
          >
            <RefreshCw size={18} /> 再测一次
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between text-sm text-gray-400 mb-4">
            <span>Question {currentIndex + 1}/{questions.length}</span>
            <span>Score: {score}</span>
          </div>

          <h3 className="text-xl font-medium mb-6">{questions[currentIndex].question}</h3>

          <div className="space-y-3">
            {questions[currentIndex].options.map((opt, idx) => {
              let btnClass = "w-full p-4 text-left rounded-lg border transition-all ";
              if (showResult) {
                if (idx === questions[currentIndex].answer) btnClass += "bg-green-100 border-green-500 text-green-800";
                else if (idx === selectedOption) btnClass += "bg-red-100 border-red-500 text-red-800";
                else btnClass += "bg-gray-50 border-gray-200 opacity-50";
              } else {
                if (idx === selectedOption) btnClass += "bg-blue-50 border-blue-500 text-primary";
                else btnClass += "hover:bg-gray-50 border-gray-200";
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
                  <span className="text-green-600 flex items-center gap-1"><CheckCircle size={16}/> 正确</span>
                ) : (
                  <span className="text-red-500 flex items-center gap-1"><XCircle size={16}/> 错误</span>
                )}
              </div>
              <p className="text-sm text-gray-600">{questions[currentIndex].explanation}</p>
            </div>
          )}

          <div className="mt-8">
            {!showResult ? (
              <button 
                onClick={handleSubmit} 
                disabled={selectedOption === null}
                className="w-full bg-primary text-white py-3 rounded-lg font-bold disabled:opacity-50 hover:bg-blue-700"
              >
                提交
              </button>
            ) : (
              <button 
                onClick={handleNext}
                className="w-full bg-secondary text-white py-3 rounded-lg font-bold hover:bg-red-600"
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