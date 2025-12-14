import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mic, Book, PenTool, Brain } from 'lucide-react';

interface ModuleCardProps {
  title: string;
  sub: string;
  icon: any;
  to: string;
  color: string;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ title, sub, icon: Icon, to, color }) => (
  <Link to={to} className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center justify-between w-full h-full">
    <div className="flex items-center gap-5">
      <div className={`p-4 rounded-xl ${color} bg-opacity-10 text-gray-800`}>
        <Icon size={28} className="text-[#002654]" />
      </div>
      <div className="text-left">
        <h3 className="text-lg font-bold text-gray-900 mb-0.5 group-hover:text-[#CE1126] transition-colors">{title}</h3>
        <p className="text-gray-500 text-sm">{sub}</p>
      </div>
    </div>
  </Link>
);

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full max-w-4xl mx-auto py-10">
      
      <div className="text-center space-y-3 mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#002654]">
          French Master
        </h1>
        <p className="text-gray-500 font-medium">您的法语学习助手</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full px-4 animate-slide-up">
        {/* 1. Core Vocabulary */}
        <ModuleCard 
          title="核心单词" 
          sub="A1 - C1 分级词汇与卡片" 
          icon={BookOpen} 
          to="/vocab" 
          color="bg-blue-100"
        />
        
        {/* 2. Speaking */}
        <ModuleCard 
          title="日常口语" 
          sub="200+ 句高频生活表达" 
          icon={Mic} 
          to="/speaking" 
          color="bg-red-100"
        />
        
        {/* 3. Reading */}
        <ModuleCard 
          title="精选阅读" 
          sub="15 篇法语短文沉浸阅读" 
          icon={Book} 
          to="/reading" 
          color="bg-green-100"
        />
        
        {/* 4. Grammar */}
        <ModuleCard 
          title="基础语法" 
          sub="关键语法点与结构解析" 
          icon={PenTool} 
          to="/grammar" 
          color="bg-purple-100"
        />
        
        {/* 5. Test */}
        <ModuleCard 
          title="阶段测试" 
          sub="A1 - C1 等级自测" 
          icon={Brain} 
          to="/quiz" 
          color="bg-orange-100"
        />
      </div>
    </div>
  );
};