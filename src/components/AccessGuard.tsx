import React, { useState, useEffect } from 'react';
import { Lock, ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react';

// ==========================================
// 🔐 配置区域
// ==========================================
const VALID_ACCESS_CODES = [
  // 原有访问码
  "FM-2025-A8K2",
  "FM-2025-Q7L9",
  "FM-2025-XHS-91K3",
  "FM-2025-K9M4",
  "FM-2025-P8R2",

  // 新增访问码 Batch 1
  "FM-XHS-2025-A1K9",
  "FM-XHS-2025-B7M3",
  "FM-XHS-2025-C4Q8",
  "FM-XHS-2025-D9L2",
  "FM-XHS-2025-E5R7",
  "FM-XHS-2025-F8N4",
  "FM-XHS-2025-G6P1",
  "FM-XHS-2025-H2T9",
  "FM-XHS-2025-J7A5",
  "FM-XHS-2025-K3S8",

  // 新增访问码 Batch 2
  "FM-XHS-2025-L9D4",
  "FM-XHS-2025-M1F7",
  "FM-XHS-2025-N6H2",
  "FM-XHS-2025-P8J5",
  "FM-XHS-2025-Q4K9",
  "FM-XHS-2025-R7L3",
  "FM-XHS-2025-S2M8",
  "FM-XHS-2025-T5N4",
  "FM-XHS-2025-U9P6",
  "FM-XHS-2025-V3Q1",

  // 新增访问码 Batch 3
  "FM-XHS-2025-W8R5",
  "FM-XHS-2025-X6S9",
  "FM-XHS-2025-Y4T2",
  "FM-XHS-2025-Z1U7",
  "FM-XHS-2025-A9V3",
  "FM-XHS-2025-B5W8",
  "FM-XHS-2025-C2X4",
  "FM-XHS-2025-D7Y9",
  "FM-XHS-2025-E3Z6",
  "FM-XHS-2025-F1A8",

  // 新增访问码 Batch 4
  "FM-XHS-2025-G9B4",
  "FM-XHS-2025-H6C2",
  "FM-XHS-2025-J3D7",
  "FM-XHS-2025-K8E1",
  "FM-XHS-2025-L4F9",
  "FM-XHS-2025-M2G5",
  "FM-XHS-2025-N7H8",
  "FM-XHS-2025-P3J6",
  "FM-XHS-2025-Q9K2",
  "FM-XHS-2025-R5L8",
];

const STORAGE_KEY = "french_master_access";

export const AccessGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  // 初始化检查
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "granted") {
      setIsAuthorized(true);
    }
    setIsLoading(false);
  }, []);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // 简单去除首尾空格
    const input = code.trim();

    if (VALID_ACCESS_CODES.includes(input)) {
      localStorage.setItem(STORAGE_KEY, "granted");
      // 音频解锁逻辑已移除，改用点击时即时播放
      setIsAuthorized(true);
    } else {
      setError("访问码无效，请核对后重试");
    }
  };

  // 加载中状态（防止闪烁）
  if (isLoading) return null;

  // 校验通过，渲染原有APP内容
  if (isAuthorized) {
    return <>{children}</>;
  }

  // 校验未通过，显示锁屏界面
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in">
        
        {/* Header Area */}
        <div className="bg-[#002654] p-8 text-center relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <div className="mx-auto w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-4 shadow-lg text-[#002654]">
               <ShieldCheck size={32} strokeWidth={2} />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">French Master Pro</h1>
            <p className="text-blue-200 text-sm mt-2 font-medium">沉浸式法语学习助手</p>
          </div>
        </div>
        
        {/* Input Area */}
        <div className="p-8 pt-10">
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="access-code" className="block text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">
                请输入访问码
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#002654] transition-colors" />
                </div>
                <input
                  id="access-code"
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    if(error) setError(""); // 输入时清除错误
                  }}
                  className="block w-full pl-10 pr-3 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#002654]/20 focus:border-[#002654] transition-all outline-none bg-gray-50 focus:bg-white text-lg font-medium tracking-wide placeholder:font-normal placeholder:tracking-normal"
                  placeholder="例如：FM-2025-XXXX"
                  autoComplete="off"
                  autoFocus
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-[#CE1126] text-sm bg-red-50 p-3 rounded-lg animate-fade-in border border-red-100">
                <AlertCircle size={16} className="shrink-0" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={!code}
              className="w-full bg-[#002654] text-white py-3.5 rounded-xl font-bold hover:bg-blue-900 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              验证并进入 <ArrowRight size={18} />
            </button>
          </form>
          
          <div className="mt-8 text-center border-t border-gray-50 pt-6">
            <p className="text-xs text-gray-400 font-medium">
              © French Master. Access Restricted.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};