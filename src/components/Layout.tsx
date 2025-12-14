import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Book, MessageCircle, PenTool, Brain, AlertCircle, Home } from 'lucide-react';
import { clsx } from 'clsx';

const NavItem = ({ to, icon: Icon, label }: { to: string, icon: any, label: string }) => {
  return (
    <NavLink 
      to={to} 
      className={({ isActive }) => clsx(
        "flex flex-col items-center justify-center p-2 text-xs md:text-sm transition-colors w-full",
        isActive ? "text-primary font-bold" : "text-gray-500 hover:text-gray-900"
      )}
    >
      <Icon size={24} className="mb-1" />
      <span>{label}</span>
    </NavLink>
  );
};

export const Layout: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-white shadow-2xl md:max-w-4xl md:border-x">
      {/* Header */}
      <header className="bg-primary text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold flex items-center gap-2">
            🇫🇷 French Master
          </h1>
          {!isHome && (
            <NavLink to="/" className="text-white hover:text-gray-200">
              <Home size={20} />
            </NavLink>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50 pb-24 md:pb-8">
        <Outlet />
      </main>

      {/* Mobile Bottom Nav / Desktop Sidebar style footer */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:sticky md:bottom-0 max-w-md md:max-w-4xl mx-auto">
        <div className="flex justify-around items-center">
          <NavItem to="/vocab" icon={Book} label="单词" />
          <NavItem to="/grammar" icon={PenTool} label="语法" />
          <NavItem to="/speaking" icon={MessageCircle} label="口语" />
          <NavItem to="/reading" icon={Book} label="阅读" />
          <NavItem to="/quiz" icon={Brain} label="测试" />
          <NavItem to="/mistakes" icon={AlertCircle} label="错题" />
        </div>
      </nav>
    </div>
  );
};