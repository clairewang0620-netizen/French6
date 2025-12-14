import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mic, Book, PenTool, Brain, ArrowRight, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';

interface ModuleCardProps {
  title: string;
  sub: string;
  icon: any;
  to: string;
  theme: 'blue' | 'red' | 'green' | 'purple' | 'orange';
}

const ModuleCard: React.FC<ModuleCardProps> = ({ title, sub, icon: Icon, to, theme }) => {
  const themeStyles = {
    blue:   { bar: 'bg-blue-600',   iconBg: 'bg-blue-50',   iconText: 'text-blue-600',   hoverBorder: 'hover:border-blue-300' },
    red:    { bar: 'bg-red-600',    iconBg: 'bg-red-50',    iconText: 'text-red-600',    hoverBorder: 'hover:border-red-300' },
    green:  { bar: 'bg-emerald-600', iconBg: 'bg-emerald-50', iconText: 'text-emerald-600', hoverBorder: 'hover:border-emerald-300' },
    purple: { bar: 'bg-violet-600', iconBg: 'bg-violet-50', iconText: 'text-violet-600', hoverBorder: 'hover:border-violet-300' },
    orange: { bar: 'bg-amber-50',  iconBg: 'bg-amber-50',  iconText: 'text-amber-600',  hoverBorder: 'hover:border-amber-300' },
  };

  const s = themeStyles[theme];

  return (
    <Link 
      to={to} 
      className={clsx(
        "group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] overflow-hidden flex flex-col h-full border border-white",
        s.hoverBorder
      )}
    >
      {/* Top Color Bar */}
      <div className={clsx("h-1.5 w-full", s.bar)}></div>
      
      <div className="p-6 md:p-8 flex-1 flex flex-col items-start">
        <div className={clsx("p-4 rounded-2xl mb-6 transition-colors group-hover:scale-110 duration-300", s.iconBg, s.iconText)}>
          <Icon size={32} strokeWidth={2} />
        </div>
        
        <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-[#002654] transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-1">
          {sub}
        </p>
        
        <div className={clsx(
          "flex items-center text-sm font-bold bg-gray-50 px-4 py-2 rounded-full transition-all group-hover:bg-[#002654] group-hover:text-white",
          s.iconText
        )}>
          进入模块 <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full py-8 md:py-12">
      
      {/* Hero Section */}
      <div className="text-center space-y-4 mb-16 animate-fade-in max-w-2xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#002654] text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles size={12} /> v2.0 全新升级
        </div>
        <h1 className="text-5xl md:text-6xl font-black tracking-tight text-[#002654] drop-shadow-sm">
          French Master
        </h1>
        <p className="text-gray-500 font-medium text-lg md:text-xl">
          专为中国学习者打造的沉浸式法语学习助手
        </p>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full animate-slide-up px-2 md:px-0">
        {/* 1. Core Vocabulary */}
        <ModuleCard 
          title="核心单词" 
          sub="从 A1 到 C1 的分级词汇库，配备专业发音与智能卡片记忆系统。" 
          icon={BookOpen} 
          to="/vocab" 
          theme="blue"
        />
        
        {/* 2. Speaking */}
        <ModuleCard 
          title="日常口语" 
          sub="精选 200+ 句高频生活表达，覆盖旅行、社交、购物等真实场景。" 
          icon={Mic} 
          to="/speaking" 
          theme="red"
        />
        
        {/* 3. Reading */}
        <ModuleCard 
          title="精选阅读" 
          sub="15 篇法语短文沉浸式阅读，提供关键词解析与全文朗读功能。" 
          icon={Book} 
          to="/reading" 
          theme="green"
        />
        
        {/* 4. Grammar */}
        <ModuleCard 
          title="基础语法" 
          sub="系统化梳理关键语法点，从时态变位到复杂句式结构全解析。" 
          icon={PenTool} 
          to="/grammar" 
          theme="purple"
        />
        
        {/* 5. Test */}
        <ModuleCard 
          title="阶段测试" 
          sub="全等级自测题库，智能记录错题，助你查漏补缺，巩固所学。" 
          icon={Brain} 
          to="/quiz" 
          theme="orange"
        />

        {/* Placeholder / Future Module or Info Card */}
        <div className="hidden lg:flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 text-center hover:border-blue-200 hover:bg-blue-50/50 transition-colors cursor-default">
           <p className="font-medium text-sm">更多功能敬请期待...</p>
           <p className="text-xs mt-1">More features coming soon</p>
        </div>
      </div>

      {/* Footer Info */}
      <footer className="mt-20 text-center text-gray-400 text-xs">
        <p>© French Master. Designed for Learners.</p>
      </footer>
    </div>
  );
};