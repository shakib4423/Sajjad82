import React from 'react';
import { Flame, Shield, ArrowDown, Award, Globe, Zap, Smartphone } from 'lucide-react';

interface HeroSectionProps {
  onScrollToMaps: () => void;
  onOpenHowToUse: () => void;
  onOpenInstallModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToMaps,
  onOpenHowToUse,
  onOpenInstallModal,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pb-16 border-b border-slate-900">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-amber-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline and Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Unboxed Kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-400">
              <Flame className="w-4 h-4 fill-amber-400/20 text-amber-400" />
              <span>Free Fire Craftland Hub</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400">Official Repository</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15] text-balance">
              Crafter Sajjad Custom <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">Craftland Map Codes</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Instant 1-click copy for high-speed 1v1 arenas, unlimited gloo wall scrims, 500m sky parkour, and cooperative zombie bunkers. All map codes verified and separated by regional servers for seamless gameplay.
            </p>

            {/* Regional Badges preview */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs text-slate-300">
              <span className="text-slate-500 font-semibold mr-1">Supported Servers:</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-200">🇧🇩 Bangladesh</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-200">🇮🇳 India</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-200">🇮🇩 Indonesia</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-200">🇵🇰 Pakistan</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-200">🌍 Global</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onScrollToMaps}
                className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 flex items-center gap-2 cursor-pointer"
              >
                <span>Browse All Map Posts</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenHowToUse}
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 font-semibold text-sm transition-colors cursor-pointer"
              >
                How to Enter Code
              </button>

              {onOpenInstallModal && (
                <button
                  onClick={onOpenInstallModal}
                  className="px-4 py-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold text-sm transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span>Android App / APK</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Hero Visual Asset Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900/60 p-2 group">
              <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-slate-950">
                <img
                  src="/src/assets/images/hero_craftland_arena_1793334371324.jpg"
                  alt="Crafter Sajjad Craftland Arena Preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200 bg-slate-950/80 backdrop-blur-md p-2.5 rounded-lg border border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="font-bold">Featured Arena</span>
                  </div>
                  <span className="text-amber-400 font-mono text-[11px]">Free Fire OB50 Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column KPI Stats Strip */}
        <div className="mt-12 pt-8 border-t border-slate-900 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-900">
            <div className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums">
              100%
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Tested & Working Codes</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-900">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 tabular-nums">
              80K+
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Free Fire Player Copies</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-900">
            <div className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums">
              5+
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Regional Server Support</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-900">
            <div className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums">
              0 Lag
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Optimized Memory & FPS</div>
          </div>
        </div>
      </div>
    </section>
  );
};
