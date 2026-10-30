import React from 'react';
import { Flame, Shield, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onScrollToTop }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-10 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Wordmark with Custom Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-slate-700/80 shadow-md shrink-0">
              <img
                src="/assets/aistudio/channels4_profile_851e70b0.jpg"
                alt="Crafter Sajjad Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-bold text-slate-200">Crafter Sajjad</span>
            <span className="text-slate-600">·</span>
            <span>Free Fire Craftland Codes</span>
          </div>

          {/* Quiet Navigation Links */}
          <div className="flex items-center gap-6 text-slate-400">
            <a
              href="#maps-section"
              className="hover:text-amber-400 transition-colors"
            >
              Browse Maps
            </a>
            <a
              href="#how-to-use"
              className="hover:text-amber-400 transition-colors"
            >
              Tutorial
            </a>
            <a
              href="#server-guide"
              className="hover:text-amber-400 transition-colors"
            >
              Server Guide
            </a>
            <button
              onClick={onOpenAdmin}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Admin Login
            </button>
          </div>

          {/* Back to top button */}
          <button
            onClick={onScrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500">
          <p>© {new Date().getFullYear()} Crafter Sajjad. All Free Fire Craftland assets property of Garena Free Fire.</p>
          <p>Created for Free Fire enthusiasts across BD, IND, ID, PK and global servers.</p>
        </div>
      </div>
    </footer>
  );
};
