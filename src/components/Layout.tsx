import React from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, Mic, PenTool, Book, Brain, AlertCircle, Home, ChevronLeft } from 'lucide-react';
import { clsx } from 'clsx';

const NavItem = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => clsx(
        "flex flex-col items-center justify-center py-2 px-1 transition-all duration-200",
        isActive ? "text-primary scale-105" : "text-gray-400 hover:text-gray-600"
      )}
    >
      <Icon size={24} strokeWidth={2} className="mb-1" />
      <span className="text-[10px] font-medium">{label}</span>
    </NavLink>
  );
};

export const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'French Master';
      case '/vocab': return '单词学习';
      case '/grammar': return '基础语法';
      case '/speaking': return '常用口语';
      case '/reading': return '法语阅读';
      case '/quiz': return '阶段测试';
      case '/mistakes': return '错题本';
      default: return 'French Master';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 mx-auto max-w-md md:max-w-5xl md:shadow-2xl md:min-h-screen md:border-x border-gray-100">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md text-slate-800 p-4 sticky top-0 z-20 border-b border-gray-100 flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          {!isHome && (
            <button onClick={() => navigate(-1)} className="p-1 -ml-2 rounded-full hover:bg-gray-100 text-gray-500">
              <ChevronLeft size={24} />
            </button>
          )}
          <h1 className={clsx("font-bold text-lg tracking-tight", isHome ? "text-primary" : "text-slate-800")}>
            {getPageTitle()}
          </h1>
        </div>
        {/* Desktop Nav Links (Visible only on md+) */}
        <div className="hidden md:flex gap-6 text-sm font-medium text-gray-500">
           <NavLink to="/" className={({isActive}) => isActive ? "text-primary" : "hover:text-primary"}>首页</NavLink>
           <NavLink to="/vocab" className={({isActive}) => isActive ? "text-primary" : "hover:text-primary"}>单词</NavLink>
           <NavLink to="/grammar" className={({isActive}) => isActive ? "text-primary" : "hover:text-primary"}>语法</NavLink>
           <NavLink to="/speaking" className={({isActive}) => isActive ? "text-primary" : "hover:text-primary"}>口语</NavLink>
           <NavLink to="/reading" className={({isActive}) => isActive ? "text-primary" : "hover:text-primary"}>阅读</NavLink>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 pb-24 md:pb-8 animate-fade-in">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 pb-safe-area shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)] z-30">
        <div className="grid grid-cols-5 h-16 items-center max-w-md mx-auto">
          <NavItem to="/vocab" icon={BookOpen} label="单词" />
          <NavItem to="/grammar" icon={PenTool} label="语法" />
          <NavItem to="/" icon={Home} label="首页" />
          <NavItem to="/speaking" icon={Mic} label="口语" />
          <NavItem to="/quiz" icon={Brain} label="测试" />
        </div>
      </nav>
    </div>
  );
};