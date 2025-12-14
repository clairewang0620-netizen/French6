import React from 'react';
import { SPEAKING_DATA } from '../data/speaking';
import { AudioButton } from '../components/AudioButton';

export const Speaking: React.FC = () => {
  return (
    <div className="page-container">
      <div className="text-center mb-10 space-y-2">
        <h1 className="text-3xl font-bold text-[#002654]">日常口语</h1>
        <p className="text-gray-500">200+ 高频生活表达 · 点击红色按钮跟读</p>
      </div>

      <div className="grid gap-4">
        {SPEAKING_DATA.map((phrase, index) => (
          <div 
            key={phrase.id} 
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:border-blue-100 transition-colors group"
          >
            <div className="flex items-start gap-4 flex-1">
              <span className="text-xs font-bold text-gray-300 mt-1.5 w-6">{index + 1}</span>
              <div>
                <h3 className="text-xl font-semibold text-[#002654] mb-1 leading-snug">{phrase.french}</h3>
                <p className="text-gray-500 text-sm">{phrase.chinese}</p>
              </div>
            </div>
            
            <div className="shrink-0 ml-4">
              <AudioButton 
                text={phrase.french} 
                className="bg-[#CE1126] text-white w-12 h-12 flex items-center justify-center rounded-full shadow-md hover:bg-red-700 hover:scale-105 active:scale-95 transition-all" 
                size={22}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};