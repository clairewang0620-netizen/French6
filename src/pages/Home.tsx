import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, PenTool, MessageCircle, Book, Brain, AlertCircle, ArrowRight } from 'lucide-react';

const ModuleCard = ({ title, desc, icon: Icon, color, to }: { title: string, desc: string, icon: any, color: string, to: string }) => (
  <Link to={to} className={`group relative overflow-hidden p-6 rounded-2xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl ${color}`}>
    <div className="relative z-10 flex flex-col h-full justify-between">
      <div>
        <div className="bg-white/20 w-fit p-3 rounded-xl mb-4 backdrop-blur-sm">
          <Icon className="text-white" size={28} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
        <p className="text-white/90 text-sm font-medium">{desc}</p>
      </div>
      <div className="mt-4 flex items-center text-white/80 group-hover:text-white font-semibold text-sm">
        开始学习 <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
    {/* Decorative Circle */}
    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"></div>
  </Link>
);

export const Home: React.FC = () => {
  return (
    <div className="p-6 space-y-8 max-w-5xl mx-auto">
      <div className="text-center py-8">
        <h1 className="text-4xl font-extrabold text-slate-800 mb-3 tracking-tight">
          Bienvenue ! <span className="text-primary">French Master</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-lg mx-auto">
          专为中国学习者打造的沉浸式法语学习助手。
          <br />
          <span className="text-sm text-slate-400">从单词到口语，全方位掌握法语。</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <ModuleCard 
          title="单词学习" 
          desc="A1 - C1 分级词汇，60词/级，支持翻卡记忆" 
          icon={BookOpen} 
          color="bg-gradient-to-br from-blue-500 to-blue-600" 
          to="/vocab" 
        />
        <ModuleCard 
          title="基础语法" 
          desc="核心语法规则解析，搭配发音例句" 
          icon={PenTool} 
          color="bg-gradient-to-br from-emerald-500 to-emerald-600" 
          to="/grammar" 
        />
        <ModuleCard 
          title="常用口语" 
          desc="600句生活高频表达，点击即播" 
          icon={MessageCircle} 
          color="bg-gradient-to-br from-purple-500 to-purple-600" 
          to="/speaking" 
        />
        <ModuleCard 
          title="法语阅读" 
          desc="20篇精选短文，支持整段朗读与翻译" 
          icon={Book} 
          color="bg-gradient-to-br from-amber-500 to-amber-600" 
          to="/reading" 
        />
        <ModuleCard 
          title="阶段测试" 
          desc="A1-C1 分级测试，实时检测学习成果" 
          icon={Brain} 
          color="bg-gradient-to-br from-rose-500 to-rose-600" 
          to="/quiz" 
        />
        <ModuleCard 
          title="错题本" 
          desc="自动记录答错题目，针对性复习" 
          icon={AlertCircle} 
          color="bg-gradient-to-br from-slate-600 to-slate-700" 
          to="/mistakes" 
        />
      </div>
    </div>
  );
};