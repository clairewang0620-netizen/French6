import React, { useState } from 'react';
import { SPEAKING_DATA } from '../data/speaking';
import { AudioButton } from '../components/AudioButton';
import { clsx } from 'clsx';

export const Speaking: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', '打招呼', '出行', '购物', '点餐', '工作'];

  const filtered = activeCategory === 'All' 
    ? SPEAKING_DATA 
    : SPEAKING_DATA.filter(s => s.category === activeCategory);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-[#1A202C] mb-2">日常口语</h1>
        <p className="text-gray-500">100 句高频生活表达，点击红色按钮跟读</p>
      </div>

      {/* Categories */}
      <div className="flex justify-center flex-wrap gap-2 mb-8">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={clsx(
              "px-4 py-2 rounded-full text-sm font-medium transition-all",
              activeCategory === cat
                ? "bg-[#0055A4] text-white shadow-md"
                : "bg-white text-gray-600 border border-gray-200 hover:border-[#0055A4]"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Vertical Cards */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <div key={item.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all flex items-center justify-between group">
            <div>
              <div className="text-xs text-[#0055A4] font-bold mb-1 opacity-60">{item.category}</div>
              <h3 className="text-xl font-medium text-gray-800 mb-1">{item.fr}</h3>
              <p className="text-gray-500 font-light">{item.cn}</p>
            </div>
            <div className="pl-4">
              <AudioButton 
                text={item.fr} 
                className="bg-red-50 text-[#EF4135] p-3 rounded-full hover:bg-[#EF4135] hover:text-white transition-colors"
                size={22}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};