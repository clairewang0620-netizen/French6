import React, { useState } from 'react';
import { READING_DATA } from '../data/reading';
import { AudioButton } from '../components/AudioButton';
import { Eye, EyeOff, BookOpen } from 'lucide-react';

export const Reading: React.FC = () => {
  return (
    <div className="page-container">
      <div className="max-w-2xl mx-auto space-y-12 pb-20">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-[#002654]">精选阅读</h1>
          <p className="text-gray-500">15 篇短文 · 关键词解析 · 沉浸式阅读</p>
        </div>

        {READING_DATA.map((article, index) => (
          <ReadingCard key={article.id} article={article} index={index} />
        ))}
      </div>
    </div>
  );
};

const ReadingCard = ({ article, index }: { article: any, index: number }) => {
  const [showTrans, setShowTrans] = useState(false);

  return (
    <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="bg-[#002654] p-6 text-white flex justify-between items-start">
        <div>
          <span className="opacity-70 text-xs font-bold uppercase tracking-wider block mb-2 text-blue-200">
            Article 0{index + 1}
          </span>
          <h2 className="text-2xl font-bold tracking-tight">{article.title}</h2>
        </div>
        <div className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
            <AudioButton 
            text={article.content} 
            className="text-white"
            size={24}
            />
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="prose prose-lg max-w-none text-[#1A202C] leading-relaxed font-serif text-lg">
          {article.content}
        </div>

        {/* Keywords Section */}
        <div className="mt-8">
            <h4 className="text-sm font-bold text-[#CE1126] uppercase tracking-wide mb-3 flex items-center gap-2">
                <BookOpen size={16}/> 核心词汇
            </h4>
            <div className="flex flex-wrap gap-3">
                {article.keywords.map((k: any, i: number) => (
                    <div key={i} className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 text-sm">
                        <span className="font-semibold text-[#002654]">{k.fr}</span>
                        <span className="text-gray-400 text-xs">|</span>
                        <span className="text-gray-600">{k.cn}</span>
                        <AudioButton text={k.fr} size={14} className="text-[#CE1126] -mr-1" />
                    </div>
                ))}
            </div>
        </div>

        {/* Action Bar */}
        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-end">
          <button 
            onClick={() => setShowTrans(!showTrans)}
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#002654] transition-colors"
          >
            {showTrans ? <><EyeOff size={16}/> 收起翻译</> : <><Eye size={16}/> 查看翻译</>}
          </button>
        </div>

        {/* Translation */}
        {showTrans && (
          <div className="mt-4 bg-[#F7F9FC] p-6 rounded-xl text-gray-700 text-sm leading-7 border border-gray-200 animate-fade-in">
            {article.translation}
          </div>
        )}
      </div>
    </article>
  );
};