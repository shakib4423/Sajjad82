import React from 'react';
import { Globe, AlertCircle, CheckCircle, HelpCircle } from 'lucide-react';

export const ServerGuideSection: React.FC = () => {
  return (
    <section id="server-guide" className="py-12 border-b border-slate-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 mb-2">
              <Globe className="w-4 h-4" />
              <span>Regional Server Breakdown</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Why Are Map Codes Separated by Country or Server?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              Garena Free Fire operates independent server clusters across regions to ensure ultra-low latency and smooth hit-registration. Because map generation assets are synchronized per server cluster, Crafter Sajjad builds and publishes separate verified codes for each region.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <span>🇧🇩 Bangladesh (BD)</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dedicated server for Bangladeshi players. Ensures minimum ping (&lt;25ms) and instant gloo wall deployment.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <span>🇮🇳 India (IND)</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Optimized for the Indian region with high-concurrency custom tournament room stability.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <span>🇮🇩 & 🇵🇰 ID / PK / Global</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Includes Indonesia, Pakistan, MENA, and European regional codes for international scrims.
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3 text-xs text-amber-300">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
            <div>
              <span className="font-bold">Pro Tip:</span> Always check that you copy the code matching your in-game account region. If a code fails with &quot;Map Not Found&quot;, try the Global code or ask in the comments!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
