import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { BookOpen, Mic, Book } from 'lucide-react';
import { clsx } from 'clsx';

const NavItem = ({ to, label, icon: Icon }: { to: string, label: string, icon: any }) => (
  <NavLink 
    to={to} 
    className={({ isActive }) => clsx(
      "flex items-center gap-2 px-4 py-4 text-sm font-medium transition-all border-b-2",
      isActive 
        ? "border-[#EF4135] text-white bg-white/10" 
        : "border-transparent text-blue-100 hover:text-white hover:bg-white/5"
    )}
  >
    <Icon size={18} />
    <span>{label}</span>
  </NavLink>
);

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC]">
      {/* Top Navigation - French Blue */}
      <nav className="bg-[#0055A4] shadow-md sticky top-0 z-50">
        <div className="max-w-[1100px] mx-auto px-4 flex items-center justify-between h-16">
          <NavLink to="/" className="text-white font-bold text-xl tracking-tight flex items-center gap-2">
            <span className="bg-white text-[#0055A4] w-8 h-8 flex items-center justify-center rounded-md font-serif italic">F</span>
            French Master
          </NavLink>
          
          <div className="flex h-full">
            <NavItem to="/vocab" label="单词" icon={BookOpen} />
            <NavItem to="/speaking" label="口语" icon={Mic} />
            <NavItem to="/reading" label="阅读" icon={Book} />
          </div>
        </div>
      </nav>

      {/* Main Content Area - Centered & Spaced */}
      <main className="flex-1 w-full max-w-[1100px] mx-auto p-6 md:p-8 animate-fade-in">
        <Outlet />
      </main>
    </div>
  );
};