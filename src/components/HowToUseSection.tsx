import React from 'react';
import { Smartphone, Search, Star, Play, CheckCircle2 } from 'lucide-react';

export const HowToUseSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Find & Copy Your Code',
      desc: 'Browse maps below, locate your country/server tag (e.g. Bangladesh 🇧🇩 or India 🇮🇳), and click the "Copy" button.',
      icon: CheckCircle2,
    },
    {
      num: '02',
      title: 'Open Free Fire Game',
      desc: 'Launch Garena Free Fire on your mobile device or emulator and open the main lobby menu.',
      icon: Smartphone,
    },
    {
      num: '03',
      title: 'Go to Craftland Mode',
      desc: 'Tap the Mode Selection button on the bottom right and select the dedicated "Craftland" tab.',
      icon: Search,
    },
    {
      num: '04',
      title: 'Search & Create Room',
      desc: 'Paste your copied code into the search bar, hit search, and tap "Star" (to favorite) or "Create Room" to play with friends!',
      icon: Play,
    },
  ];

  return (
    <section id="how-to-use" className="py-12 border-b border-slate-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Player Tutorial
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            How to Use Craftland Map Codes
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Follow these 4 simple steps to enter any custom map code directly into Garena Free Fire.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.num}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-amber-400 font-mono">
                      {step.num}
                    </span>
                    <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-amber-400">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
