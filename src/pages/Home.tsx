import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mic, Book, ArrowRight } from 'lucide-react';

const FeatureCard = ({ title, sub, icon: Icon, to, color }: any) => (
  <Link to={to} className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center">
    <div className={`p-4 rounded-2xl mb-6 ${color} bg-opacity-10 text-${color.split('-')[1]}-600`}>
      <Icon size={32} className={color.replace('bg-', 'text-')} />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-500 text-sm mb-6">{sub}</p>
    <div className="mt-auto flex items-center text-[#0055A4] font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
      开始学习 <ArrowRight size={16} className="ml-1" />
    </div>
  </Link>
);

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-4xl mx-auto space-y-16">
      
      <div className="text-center space-y-4 animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#1A202C]">
          <span className="text-[#0055A4]">French</span> Master
        </h1>
        <p className="text-xl text-gray-500 max-w-lg mx-auto font-light">
          极简主义法语学习工具。专注单词、口语与阅读。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full px-4">
        <FeatureCard 
          title="核心单词" 
          sub="A1 - C1 分级词汇卡片" 
          icon={BookOpen} 
          to="/vocab" 
          color="bg-blue-500"
        />
        <FeatureCard 
          title="日常口语" 
          sub="100 句高频生活表达" 
          icon={Mic} 
          to="/speaking" 
          color="bg-red-500"
        />
        <FeatureCard 
          title="精选阅读" 
          sub="5 篇短文沉浸阅读" 
          icon={Book} 
          to="/reading" 
          color="bg-emerald-500"
        />
      </div>
      
      <div className="text-xs text-gray-300 font-mono">
        v1.0.0 · Static Build
      </div>
    </div>
  );
};