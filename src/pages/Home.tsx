import React from 'react';
import { Link } from '../components/Layout';
import { BookOpen, Mic, Book, PenTool, Brain, ArrowRight, Sparkles, Headphones, AlertTriangle } from 'lucide-react';
import { audioService } from '../services/audioService';
import { clsx } from 'clsx';

interface ModuleCardProps {
  title: string;
  sub: string;
  icon: any;
  to: string;
  theme: 'blue' | 'red' | 'green' | 'purple' | 'orange' | 'cyan';
}

const ModuleCard: React.FC<ModuleCardProps> = ({ title, sub, icon: Icon, to, theme }) => {
  const themeStyles = {
    blue:   { bar: 'bg-blue-600',   iconBg: 'bg-blue-50',   iconText: 'text-blue-600',   hoverBorder: 'hover:border-blue-300' },
    red:    { bar: 'bg-red-600',    iconBg: 'bg-red-50',    iconText: 'text-red-600',    hoverBorder: 'hover:border-red-300' },
    green:  { bar: 'bg-emerald-600', iconBg: 'bg-emerald-50', iconText: 'text-emerald-600', hoverBorder: 'hover:border-emerald-300' },
    purple: { bar: 'bg-violet-600', iconBg: 'bg-violet-50', iconText: 'text-violet-600', hoverBorder: 'hover:border-violet-300' },
    orange: { bar: 'bg-amber-50',  iconBg: 'bg-amber-50',  iconText: 'text-amber-600',  hoverBorder: 'hover:border-amber-300' },
    cyan:   { bar: 'bg-cyan-600',  iconBg: 'bg-cyan-50',  iconText: 'text-cyan-600',  hoverBorder: 'hover:border-cyan-300' },
  };

  const s = themeStyles[theme];

  return (
    <Link 
      to={to} 
      className={clsx(
        "group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] flex flex-col h-full border border-white overflow-visible",
        s.hoverBorder
      )}
    >
      <div className={clsx("h-1.5 w-full rounded-t-2xl", s.bar)}></div>
      <div className="p-6 flex-1 flex flex-col items-start">
        <div className={clsx("p-4 rounded-2xl mb-4 transition-colors group-hover:scale-110 duration-300", s.iconBg, s.iconText)}>
          <Icon size={32} strokeWidth={2} />
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-[#1A202C] mb-2 group-hover:text-[#002654] transition-colors">
          {title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          {sub}
        </p>
        <div className={clsx(
          "mt-auto flex items-center text-sm font-bold bg-gray-50 px-4 py-2 rounded-full transition-all group-hover:bg-[#002654] group-hover:text-white",
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
      
      {/* Emergency Audio Test (临时) */}
      <div className="mb-8 w-full max-w-lg px-4">
        <button 
          onClick={() => audioService.test()}
          className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-all active:scale-95"
        >
          <AlertTriangle size={24} />
          🔊 最终音频存活测试 (TEST.MP3)
        </button>
        <p className="text-center text-[10px] text-gray-400 mt-2">
          如果此按钮点击无声，控制台报错 404，请确认您的 GitHub 仓库中根目录下存在 public/audio/test.mp3
        </p>
      </div>

      {/* Hero Section */}
      <div className="text-center space-y-4 mb-12 animate-fade-in max-w-2xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#002654] text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles size={12} /> v2.1 路径紧急修复版
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[#002654] drop-shadow-sm">
          French Master
        </h1>
        <p className="text-gray-500 font-medium text-lg md:text-xl">
          沉浸式法语学习助手
        </p>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full animate-slide-up px-2 md:px-0 max-w-6xl">
        <ModuleCard title="核心单词" sub="A1-C1分级词汇，配备 IPA 与发音。" icon={BookOpen} to="/vocab" theme="blue" />
        <ModuleCard title="日常口语" sub="200+ 句高频表达，真实场景模拟。" icon={Mic} to="/speaking" theme="red" />
        <ModuleCard title="精选阅读" sub="15 篇短文，关键词深度解析。" icon={Book} to="/reading" theme="green" />
        <ModuleCard title="基础语法" sub="系统梳理核心规则与时态变位。" icon={PenTool} to="/grammar" theme="purple" />
        <ModuleCard title="单词听写" sub="磨耳朵神器，强化拼写记忆。" icon={Headphones} to="/dictation" theme="cyan" />
        <ModuleCard title="阶段测试" sub="全等级自测题库，智能巩固进步。" icon={Brain} to="/quiz" theme="orange" />
      </div>

      <footer className="mt-16 text-center text-gray-400 text-xs">
        <p>© French Master. Restore Audio Mode Active.</p>
      </footer>
    </div>
  );
};