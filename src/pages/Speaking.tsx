import React, { useState, useMemo } from 'react';
import { SPEAKING_DATA } from '../data/speaking';
import { AudioButton } from '../components/AudioButton';

export const Speaking: React.FC = () => {
  const [filter, setFilter] = useState('All');
  
  // Use useMemo for performance with large lists (600 items)
  const categories = useMemo(() => ['All', ...Array.from(new Set(SPEAKING_DATA.map(s => s.category)))], []);
  
  const filteredData = useMemo(() => 
    filter === 'All' ? SPEAKING_DATA : SPEAKING_DATA.filter(s => s.category === filter),
    [filter]
  );

  return (
    <div className="p-4 flex flex-col h-full max-w-2xl mx-auto">
      <div className="mb-6 sticky top-0 bg-gray-50 pt-2 pb-4 z-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">常用口语 ({SPEAKING_DATA.length}句)</h2>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 text-sm rounded-full whitespace-nowrap transition-all border ${
                filter === cat 
                  ? 'bg-secondary text-white border-secondary shadow-md' 
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 pb-4">
        {filteredData.map(phrase => (
          <div key={phrase.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between group hover:border-primary/30 transition-all hover:shadow-md">
            <div className="pr-4">
              <p className="font-medium text-lg text-slate-800 mb-1">{phrase.fr}</p>
              <p className="text-gray-500 text-sm">{phrase.cn}</p>
            </div>
            <AudioButton text={phrase.fr} className="bg-blue-50 text-blue-600 group-hover:bg-primary group-hover:text-white shrink-0" size={20} />
          </div>
        ))}
        {filteredData.length === 0 && <div className="text-center text-gray-400 py-10">暂无内容</div>}
      </div>
    </div>
  );
};