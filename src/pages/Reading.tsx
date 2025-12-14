import React from 'react';
import { READING_DATA } from '../data/reading';
import { AudioButton } from '../components/AudioButton';

export const Reading: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold">法语阅读精选</h2>
      
      <div className="grid gap-6">
        {READING_DATA.map(article => (
          <article key={article.id} className="bg-white rounded-xl shadow-md overflow-hidden border">
            <div className="bg-primary/5 p-4 border-b border-primary/10 flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-primary">{article.title}</h3>
                <div className="flex gap-2 mt-2">
                  {article.keywords.map(kw => (
                    <span key={kw} className="text-xs bg-white text-gray-600 px-2 py-1 rounded border">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
              <AudioButton text={article.content} className="bg-white shadow-sm" />
            </div>
            
            <div className="p-4 space-y-4">
              <div className="prose prose-sm max-w-none text-gray-800 leading-relaxed">
                <p>{article.content}</p>
              </div>
              <details className="group">
                <summary className="cursor-pointer text-sm text-gray-400 hover:text-primary transition-colors list-none flex items-center gap-1">
                  <span className="group-open:hidden">查看中文翻译</span>
                  <span className="hidden group-open:inline">收起翻译</span>
                </summary>
                <p className="mt-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
                  {article.translation}
                </p>
              </details>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};