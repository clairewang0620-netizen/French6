import React from 'react';
import { BookOpen, Mic, Book, PenTool, Brain } from 'lucide-react';
import { clsx } from 'clsx';

// Export Link for other components to use
export const Link: React.FC<{ to: string; className?: string; children: React.ReactNode }> = ({ to, className, children }) => {
  const href = to.startsWith('#') ? to : `#${to}`;
  return <a href={href} className={className}>{children}</a>;
};

const NavItem = ({ to, label, icon: Icon, currentPath }: { to: string, label: string, icon: any, currentPath: string }) => {
  const isActive = currentPath === to || (to !== '/' && currentPath.startsWith(to));
  return (
    <a 
      href={`#${to}`} 
      className={clsx(
        "flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-2 px-3 py-2 md:px-3 md:py-2 rounded-lg transition-all shrink-0 min-w-[60px] md:min-w-0",
        isActive 
          ? "bg-[#CE1126] text-white shadow-md" 
          : "text-blue-100 hover:bg-white/10 hover:text-white"
      )}
    >
      <Icon className="w-5 h-5 md:w-[18px] md:h-[18px]" />
      <span className="text-[10px] md:text-sm font-medium whitespace-nowrap">{label}</span>
    </a>
  );
};

export const Layout: React.FC<{ children: React.ReactNode; currentPath: string }> = ({ children, currentPath }) => {
  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      {/* Top Navigation - French Dark Blue */}
      <nav className="bg-[#002654] shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
        <div className="max-w-[1200px] mx-auto px-2 md:px-4 h-16 flex items-center justify-between">
          <a href="#/" className="text-white font-bold text-xl tracking-tight flex items-center gap-2 hover:opacity-90 transition-opacity shrink-0 mr-4">
            <span className="bg-white text-[#002654] w-8 h-8 flex items-center justify-center rounded text-lg font-serif italic shadow-sm">F</span>
            {/* Only show title on larger screens to make room for nav items on mobile */}
            <span className="hidden lg:inline">French Master</span>
          </a>
          
          <div className="flex gap-1 md:gap-2 overflow-x-auto no-scrollbar items-center flex-1 justify-start md:justify-end">
            <NavItem to="/vocab" label="单词" icon={BookOpen} currentPath={currentPath} />
            <NavItem to="/speaking" label="口语" icon={Mic} currentPath={currentPath} />
            <NavItem to="/grammar" label="语法" icon={PenTool} currentPath={currentPath} />
            <NavItem to="/reading" label="阅读" icon={Book} currentPath={currentPath} />
            <NavItem to="/quiz" label="测试" icon={Brain} currentPath={currentPath} />
          </div>
        </div>
      </nav>

      <main className="flex-1 w-full max-w-[1200px] mx-auto p-4 md:p-8">
        {children}
      </main>
    </div>
  );
};