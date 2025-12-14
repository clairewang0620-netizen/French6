import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { BookOpen, Mic, Book, PenTool, Brain, Search } from 'lucide-react';
import { clsx } from 'clsx';

const NavItem = ({ to, label, icon: Icon }: { to: string, label: string, icon: any }) => (
  <NavLink 
    to={to} 
    className={({ isActive }) => clsx(
      "flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm font-medium",
      isActive 
        ? "bg-[#CE1126] text-white shadow-md" 
        : "text-blue-100 hover:bg-white/10 hover:text-white"
    )}
  >
    <Icon size={18} />
    <span className="hidden md:inline">{label}</span>
  </NavLink>
);

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC]">
      {/* Top Navigation - French Dark Blue */}
      <nav className="bg-[#002654] shadow-lg sticky top-0 z-50">
        <div className="max-w-[1100px] mx-auto px-4 h-16 flex items-center justify-between">
          <NavLink to="/" className="text-white font-bold text-xl tracking-tight flex items-center gap-2">
            <span className="bg-white text-[#002654] w-8 h-8 flex items-center justify-center rounded text-lg font-serif italic">F</span>
            <span className="hidden sm:inline">French Master</span>
          </NavLink>
          
          <div className="flex gap-1 md:gap-2">
            <NavItem to="/vocab" label="单词" icon={BookOpen} />
            <NavItem to="/speaking" label="口语" icon={Mic} />
            <NavItem to="/grammar" label="语法" icon={PenTool} />
            <NavItem to="/reading" label="阅读" icon={Book} />
            <NavItem to="/quiz" label="测试" icon={Brain} />
            <NavItem to="/ai-search" label="查词" icon={Search} />
          </div>
        </div>
      </nav>

      <main className="flex-1 w-full max-w-[1100px] mx-auto p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};