import React from 'react';
import { Flame, ShieldCheck, Lock, Smartphone } from 'lucide-react';

interface HeaderProps {
  isAdmin: boolean;
  onOpenAdmin: () => void;
  onNavigateToSection: (sectionId: string) => void;
  onOpenInstallModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isAdmin,
  onOpenAdmin,
  onNavigateToSection,
  onOpenInstallModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark with custom logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigateToSection('top')}
            className="flex items-center gap-3 group cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-amber-500 via-rose-500 to-cyan-400 shadow-lg shadow-rose-500/20 group-hover:shadow-rose-500/40 transition-all duration-300">
              <img
                src="/assets/aistudio/channels4_profile_851e70b0.jpg"
                alt="Crafter Sajjad Logo"
                className="w-full h-full object-cover rounded-[10px]"
              />
            </div>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors whitespace-nowrap">
              Crafter Sajjad
            </span>
          </button>
        </div>

        {/* Zone 2: Concise single-line navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => onNavigateToSection('maps-section')}
            className="hover:text-amber-400 transition-colors whitespace-nowrap cursor-pointer"
          >
            Explore Maps
          </button>
          <button
            onClick={() => onNavigateToSection('how-to-use')}
            className="hover:text-amber-400 transition-colors whitespace-nowrap cursor-pointer"
          >
            How to Use Codes
          </button>
          <button
            onClick={() => onNavigateToSection('server-guide')}
            className="hover:text-amber-400 transition-colors whitespace-nowrap cursor-pointer"
          >
            Server Info
          </button>
          <button
            onClick={() => onNavigateToSection('creator-info')}
            className="hover:text-amber-400 transition-colors whitespace-nowrap cursor-pointer"
          >
            About Sajjad
          </button>
        </nav>

        {/* Zone 3: Primary Action + Android App button */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenInstallModal}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-all cursor-pointer whitespace-nowrap"
            title="Install Android App / Download APK"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Android App</span>
          </button>

          <button
            onClick={onOpenAdmin}
            className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap ${
              isAdmin
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600'
            }`}
          >
            {isAdmin ? (
              <>
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Admin Dashboard</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 text-slate-400" />
                <span>Admin Panel</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
