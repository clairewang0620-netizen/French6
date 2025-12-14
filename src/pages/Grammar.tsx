import React, { useState } from 'react';
import { Level } from '../types';
import { GRAMMAR_DATA } from '../data/grammar';
import { AudioButton } from '../components/AudioButton';
import { ChevronDown, ChevronRight } from 'lucide-react';

export const Grammar: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const grouped = Object.values(Level).map(level => ({
    level,
    rules: GRAMMAR_DATA.filter(r => r.level === level)
  })).filter(g => g.rules.length > 0);

  return (
    <div className="page-container">
      <div className="max-w-2xl mx-auto space-y-8 pb-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#002654]">基础语法</h1>
          <p className="text-gray-500">核心时态与规则解析</p>
        </div>
        
        {grouped.map(group => (
          <div key={group.level} className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-[#002654] text-white text-sm font-bold px-3 py-1 rounded shadow-sm">{group.level}</span>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>
            
            <div className="space-y-3">
              {group.rules.map(rule => (
                  <div key={rule.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:border-blue-200">
                  <button 
                      onClick={() => toggleExpand(rule.id)}
                      className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors"
                  >
                      <span className="font-bold text-[#1A202C] text-lg">{rule.topic}</span>
                      {expandedId === rule.id ? <ChevronDown size={20} className="text-[#CE1126]"/> : <ChevronRight size={20} className="text-gray-400"/>}
                  </button>

                  {expandedId === rule.id && (
                      <div className="p-5 pt-0 bg-white">
                          <div className="text-gray-600 mb-4 leading-relaxed">{rule.description}</div>
                          
                          {rule.structure && (
                              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-5">
                              <span className="text-xs font-bold text-blue-800 uppercase tracking-wide block mb-1">结构</span>
                              <p className="font-mono text-sm text-blue-900 font-medium">{rule.structure}</p>
                              </div>
                          )}

                          <div className="space-y-3">
                              {rule.examples.map((ex, idx) => (
                              <div key={idx} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-100">
                                  <div>
                                  <p className="text-[#002654] font-medium mb-0.5">{ex.fr}</p>
                                  <p className="text-gray-500 text-xs">{ex.cn}</p>
                                  </div>
                                  <AudioButton text={ex.fr} size={18} className="text-[#CE1126] bg-white shadow-sm p-1.5" />
                              </div>
                              ))}
                          </div>
                      </div>
                  )}
                  </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};