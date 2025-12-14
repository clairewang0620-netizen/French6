import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

export const AISearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<null | { word: string; mean: string; ex: string }>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResult(null);

    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      setResult({
        word: query,
        mean: "这是一个模拟的查询结果。在真实应用中，这里会显示 AI 解析的详细释义。",
        ex: "Ceci est un exemple généré par l'IA."
      });
    }, 1000);
  };

  return (
    <div className="page-container max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-[#002654] mb-2">AI 智能查词</h1>
        <p className="text-gray-500">输入法语单词，获取智能解析</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2 mb-10">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="输入单词 (例如: Bonjour)..."
          className="flex-1 p-4 rounded-xl border border-gray-200 focus:border-[#002654] focus:ring-1 focus:ring-[#002654] outline-none shadow-sm"
        />
        <button 
          type="submit" 
          disabled={loading || !query.trim()}
          className="bg-[#002654] text-white px-6 py-4 rounded-xl font-bold hover:bg-blue-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Search />}
          查询
        </button>
      </form>

      {result && (
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 animate-fade-in text-left">
          <h2 className="text-3xl font-bold text-[#002654] mb-4">{result.word}</h2>
          
          <div className="mb-6">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">释义</span>
            <p className="text-lg text-gray-800">{result.mean}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">例句</span>
            <p className="text-[#002654] italic font-medium">{result.ex}</p>
          </div>
        </div>
      )}

      {!result && !loading && (
        <div className="text-center text-gray-400 py-10">
          <p>试着搜索 "Amour" 或 "Voyage"</p>
        </div>
      )}
    </div>
  );
};