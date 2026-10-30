import React, { useState } from 'react';
import { Flame, Send, CheckCircle2, Shield, Heart, Award } from 'lucide-react';
import { playCopySound } from '../utils/audio';

export const CreatorSection: React.FC = () => {
  const [senderName, setSenderName] = useState('');
  const [mapIdea, setMapIdea] = useState('');
  const [targetServer, setTargetServer] = useState('Bangladesh');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !mapIdea.trim()) return;

    playCopySound();
    setSubmitted(true);
    setSenderName('');
    setMapIdea('');

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section id="creator-info" className="py-12 border-b border-slate-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Creator Bio with Custom Logo Avatar */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-xl shadow-rose-500/20 shrink-0">
                <img
                  src="/assets/aistudio/channels4_profile_851e70b0.jpg"
                  alt="Crafter Sajjad"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400">
                  <Award className="w-3.5 h-3.5" />
                  <span>Verified Map Architect</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                  About Crafter Sajjad
                </h2>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Crafter Sajjad is a premier Free Fire Craftland creator known for meticulously engineered custom competitive maps. Specializing in tournament-grade 1v1 arenas with infinite fast gloo walls, balanced 4v4 Clash Squad layouts, high-verticality sky parkour, and immersive co-op zombie bunkers.
            </p>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Every map undergoes strict testing across Bangladesh, India, Indonesia, and Pakistan servers before release to ensure zero object glitching, stable frame rates on all mobile chipsets, and optimal spawn balance.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs">
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero Lag Geometry</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Fast Gloo Scripting</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>OB50 Tested</span>
              </div>
            </div>
          </div>

          {/* Right Column: Request a Map Form */}
          <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400" />
              Request a Custom Craftland Map
            </h3>
            <p className="text-xs text-slate-400 mt-1 mb-4">
              Have an idea for a custom duel arena, parkour layout, or sniper course? Send your concept directly to Sajjad!
            </p>

            {submitted ? (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>
                  Thank you! Your map idea has been submitted to Crafter Sajjad. Watch for upcoming map releases!
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Your Gamer Tag / Name</label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. FreeFire_Warrior_BD"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Your Free Fire Server</label>
                  <select
                    value={targetServer}
                    onChange={(e) => setTargetServer(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="Bangladesh">🇧🇩 Bangladesh</option>
                    <option value="India">🇮🇳 India</option>
                    <option value="Indonesia">🇮🇩 Indonesia</option>
                    <option value="Pakistan">🇵🇰 Pakistan</option>
                    <option value="Global">🌍 Global / Other</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Map Idea & Features</label>
                  <textarea
                    required
                    rows={3}
                    value={mapIdea}
                    onChange={(e) => setMapIdea(e.target.value)}
                    placeholder="Describe what kind of arena or mechanics you want (e.g. 1v1 M1887 only, speed pads, red light green light)..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Submit Map Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
