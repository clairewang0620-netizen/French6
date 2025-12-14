import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, PenTool, MessageCircle, Book, Brain, AlertCircle, ArrowRight, Star } from 'lucide-react';

const ModuleCard = ({ title, desc, icon: Icon, color, to }: { title: string, desc: string, icon: any, color: string, to: string }) => (
  <Link to={to} className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-100 transition-all duration-300">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color} bg-opacity-10`}>
      <Icon className={color.replace('bg-', 'text-')} size={24} />
    </div>
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
      </div>
      <ArrowRight className="text-gray-300 group-hover:text-primary transform group-hover:translate-x-1 transition-all" size={20} />
    </div>
  </Link>
);

export const Home: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="bg-primary rounded-3xl p-8 text-white shadow-xl shadow-blue-200 relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-medium mb-4 backdrop-blur-sm border border-white/20">
            <Star size={12} fill="currentColor" />
            <span>为中国学习者定制</span>
          </div>
          <h1 className="text-3xl font-extrabold mb-2 tracking-tight">Bonjour, 学习者!</h1>
          <p className="text-blue-100 max-w-md text-sm leading-relaxed">
            欢迎来到 French Master。从基础发音到流利阅读，开启你的法语进阶之旅。
          </p>
        </div>
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ModuleCard 
          title="单词积累" 
          desc="A1-C1 分级词汇，60词/级，Flashcard 强化记忆" 
          icon={BookOpen} 
          color="bg-blue-500" 
          to="/vocab" 
        />
        <ModuleCard 
          title="基础语法" 
          desc="核心时态与规则，搭配原声例句解析" 
          icon={PenTool} 
          color="bg-emerald-500" 
          to="/grammar" 
        />
        <ModuleCard 
          title="常用口语" 
          desc="600句高频生活表达，点击即播" 
          icon={MessageCircle} 
          color="bg-purple-500" 
          to="/speaking" 
        />
        <ModuleCard 
          title="阅读训练" 
          desc="20篇精选短文，支持整段朗读与中法对照" 
          icon={Book} 
          color="bg-amber-500" 
          to="/reading" 
        />
        <ModuleCard 
          title="阶段测试" 
          desc="自测水平，实时反馈，精准查漏补缺" 
          icon={Brain} 
          color="bg-rose-500" 
          to="/quiz" 
        />
        <ModuleCard 
          title="错题本" 
          desc="自动记录错题，重复练习直到掌握" 
          icon={AlertCircle} 
          color="bg-slate-600" 
          to="/mistakes" 
        />
      </div>
      
      <footer className="text-center text-gray-400 text-xs py-8">
        © 2024 French Master. Designed for Learners.
      </footer>
    </div>
  );
};