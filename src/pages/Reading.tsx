import React, { useState } from 'react';
import { READING_DATA } from '../data/reading';
import { AudioButton } from '../components/AudioButton';
import { Eye, EyeOff } from 'lucide-react';

export const Reading: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-12 pb-20">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">精选阅读</h1>
        <p className="text-gray-500">5 篇短文 · 沉浸式阅读体验</p>
      </div>

      {READING_DATA.map((article, index) => (
        <ReadingCard key={article.id} article={article} index={index} />
      ))}
    </div>
  );
};

const ReadingCard = ({ article, index }: { article: any, index: number }) => {
  const [showTrans, setShowTrans] = useState(false);

  return (
    <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-[#0055A4] p-6 text-white flex justify-between items-start">
        <div>
          <span className="opacity-50 text-xs font-bold uppercase tracking-wider block mb-2">Article 0{index + 1}</span>
          <h2 className="text-2xl font-bold">{article.title}</h2>
        </div>
        <AudioButton 
          text={article.content} 
          className="bg-white/20 text-white hover:bg-white hover:text-[#0055A4] p-3 rounded-full backdrop-blur-sm"
          size={20}
        />
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed font-serif">
          {article.content}
        </div>

        {/* Action Bar */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
          <div className="flex gap-2">
            {article.keywords.slice(0, 3).map((k: string) => (
              <span key={k} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {k}
              </span>
            ))}
          </div>
          
          <button 
            onClick={() => setShowTrans(!showTrans)}
            className="flex items-center gap-2 text-sm font-medium text-[#EF4135] hover:opacity-80 transition-opacity"
          >
            {showTrans ? <><EyeOff size={16}/> 隐藏翻译</> : <><Eye size={16}/> 查看翻译</>}
          </button>
        </div>

        {/* Translation */}
        {showTrans && (
          <div className="mt-6 bg-[#F7F9FC] p-6 rounded-xl text-gray-600 text-sm leading-7 border border-gray-100 animate-fade-in">
            {article.translation}
          </div>
        )}
      </div>
    </article>
  );
};