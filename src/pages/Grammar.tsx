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
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">基础语法</h2>
      
      {grouped.map(group => (
        <div key={group.level} className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded">{group.level}</span>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>
          
          {group.rules.map(rule => (
            <div key={rule.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <button 
                onClick={() => toggleExpand(rule.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
              >
                <span className="font-semibold text-gray-800">{rule.topic}</span>
                {expandedId === rule.id ? <ChevronDown size={20} className="text-gray-400"/> : <ChevronRight size={20} className="text-gray-400"/>}
              </button>

              {expandedId === rule.id && (
                <div className="p-4 pt-0 border-t bg-slate-50">
                  <div className="mt-3 text-sm text-gray-600 mb-3">{rule.description}</div>
                  
                  {rule.structure && (
                    <div className="bg-yellow-50 p-3 rounded-md border border-yellow-100 mb-4">
                      <span className="text-xs font-bold text-yellow-700 uppercase tracking-wide">结构</span>
                      <p className="font-mono text-sm text-yellow-900 mt-1">{rule.structure}</p>
                    </div>
                  )}

                  <div className="space-y-3">
                    {rule.examples.map((ex, idx) => (
                      <div key={idx} className="flex items-start justify-between bg-white p-3 rounded border">
                        <div>
                          <p className="text-primary font-medium">{ex.fr}</p>
                          <p className="text-gray-500 text-sm">{ex.cn}</p>
                        </div>
                        <AudioButton text={ex.fr} size={18} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};