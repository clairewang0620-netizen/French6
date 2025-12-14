import React from 'react';
import { SPEAKING_DATA } from '../data/speaking';
import { AudioButton } from '../components/AudioButton';

export const Speaking: React.FC = () => {
  return (
    <div className="w-full max-w-3xl mx-auto pb-12">
      <div className="text-center mb-10 space-y-2">
        <h1 className="text-3xl font-bold text-[#1A202C]">常用口语 110 句</h1>
        <p className="text-gray-500">高频生活表达 · 点击红色按钮跟读</p>
      </div>

      <div className="grid gap-4">
        {SPEAKING_DATA.map((phrase) => (
          <div 
            key={phrase.id} 
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:border-blue-100 transition-colors group"
          >
            <div className="flex-1 pr-4">
              <h3 className="text-xl font-semibold text-[#002654] mb-1">{phrase.french}</h3>
              <p className="text-gray-500 text-sm">{phrase.chinese}</p>
            </div>
            
            <div className="shrink-0">
              <AudioButton 
                text={phrase.french} 
                className="bg-[#CE1126] text-white w-10 h-10 flex items-center justify-center rounded-full shadow-md hover:bg-red-700 hover:scale-105 active:scale-95 transition-all" 
                size={20}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};