import React, { useState, useEffect } from 'react';
import { Search, Loader2, Sparkles } from 'lucide-react';

export const AISearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<null | { word: string; mean: string; ex: string }>(null);
  const [loading, setLoading] = useState(false);

  // Debounced Search Effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        performSearch(query);
      } else {
        setResult(null);
      }
    }, 600); // 600ms debounce

    return () => clearTimeout(timer);
  }, [query]);

  const performSearch = (searchTerm: string) => {
    setLoading(true);
    // Simulate API delay and logic
    setTimeout(() => {
      setLoading(false);
      
      // Simple mock logic for demonstration
      const isFrench = /[a-zA-Z]/.test(searchTerm);
      
      setResult({
        word: searchTerm,
        mean: isFrench 
          ? "【模拟翻译】这里将显示该法语单词或句子的中文释义。智能引擎会自动识别语境。" 
          : "【模拟翻译】这里将显示该中文内容的法语表达。适用于单词或短语查询。",
        ex: isFrench
          ? `Exemple avec "${searchTerm}" : C'est une phrase générée par l'IA.`
          : `Exemple : Voici comment on pourrait dire "${searchTerm}" en français.`
      });
    }, 800);
  };

  return (
    <div className="page-container max-w-2xl mx-auto min-h-[70vh] flex flex-col items-center">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-[#002654] mb-2 flex items-center justify-center gap-2">
           <Sparkles className="text-yellow-500" /> AI 智能查询
        </h1>
        <p className="text-gray-500">输入中/法单词或句子，自动识别并翻译</p>
      </div>

      <div className="w-full relative mb-12">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          {loading ? <Loader2 className="animate-spin text-[#002654]" /> : <Search className="text-gray-400" />}
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="输入内容 (例如: Bonjour 或 '你好')..."
          className="w-full p-5 pl-14 rounded-2xl border border-gray-200 focus:border-[#002654] focus:ring-2 focus:ring-blue-50 outline-none shadow-lg text-lg transition-all"
          autoFocus
        />
      </div>

      {result && (
        <div className="w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100 animate-slide-up text-left">
          <h2 className="text-3xl font-bold text-[#002654] mb-4 pb-4 border-b border-gray-50">{result.word}</h2>
          
          <div className="mb-6">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">智能释义</span>
            <p className="text-lg text-gray-800 leading-relaxed">{result.mean}</p>
          </div>

          <div className="bg-[#F7F9FC] p-5 rounded-xl border border-gray-100">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">AI 例句</span>
            <p className="text-[#002654] italic font-medium">{result.ex}</p>
          </div>
        </div>
      )}

      {!result && !loading && (
        <div className="text-center text-gray-300 mt-10">
            <Search size={48} className="mx-auto mb-4 opacity-20" />
            <p>等待输入...</p>
        </div>
      )}
    </div>
  );
};