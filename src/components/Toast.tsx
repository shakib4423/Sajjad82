import React from 'react';
import { Check, Copy } from 'lucide-react';

interface ToastProps {
  message: string | null;
  subMessage?: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message, subMessage }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200">
      <div className="bg-slate-900 border border-amber-500/40 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-xl">
        <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
          <Check className="w-4 h-4 stroke-[3]" />
        </div>
        <div>
          <div className="text-xs sm:text-sm font-bold text-white">{message}</div>
          {subMessage && (
            <div className="text-[11px] font-mono text-amber-300 mt-0.5">{subMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
};
