import React, { useState } from 'react';
import { X, Copy, Check, Heart, Users, Trophy, Crosshair, Shield, Share2, MessageSquare, Send, Sparkles } from 'lucide-react';
import { CraftlandMap, ServerCode, MapComment } from '../types';
import { playCopySound, playLikeSound } from '../utils/audio';

interface MapDetailModalProps {
  map: CraftlandMap;
  onClose: () => void;
  isLiked: boolean;
  onToggleLike: (mapId: string) => void;
  onCopyCode: (code: string, serverName: string) => void;
  onAddComment: (mapId: string, comment: { author: string; text: string; rating: number; server: string }) => void;
}

export const MapDetailModal: React.FC<MapDetailModalProps> = ({
  map,
  onClose,
  isLiked,
  onToggleLike,
  onCopyCode,
  onAddComment,
}) => {
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentRating, setNewCommentRating] = useState(5);
  const [newCommentServer, setNewCommentServer] = useState('Bangladesh');
  const [shareFeedback, setShareFeedback] = useState(false);

  const handleCopy = (sc: ServerCode) => {
    navigator.clipboard.writeText(sc.code);
    playCopySound();
    setCopiedCodeId(sc.id);
    onCopyCode(sc.code, sc.serverName);

    setTimeout(() => {
      setCopiedCodeId(null);
    }, 2200);
  };

  const handleLike = () => {
    playLikeSound();
    onToggleLike(map.id);
  };

  const handleShare = () => {
    const textToShare = `${map.title} by Crafter Sajjad\nBD Code: ${
      map.serverCodes.find((s) => s.serverCode === 'BD')?.code || map.serverCodes[0]?.code
    }\nPlay now in Free Fire Craftland!`;
    navigator.clipboard.writeText(textToShare);
    playCopySound();
    setShareFeedback(true);
    setTimeout(() => setShareFeedback(false), 2000);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || !newCommentAuthor.trim()) return;

    onAddComment(map.id, {
      author: newCommentAuthor.trim(),
      text: newCommentText.trim(),
      rating: newCommentRating,
      server: newCommentServer,
    });

    setNewCommentText('');
    setNewCommentAuthor('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar with Close Button */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-slate-950/80 hover:bg-slate-900 text-slate-300 hover:text-amber-400 border border-slate-700 backdrop-blur-md transition-colors cursor-pointer"
            title="Share map details"
          >
            {shareFeedback ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-950/80 hover:bg-slate-900 text-slate-300 hover:text-white border border-slate-700 backdrop-blur-md transition-colors cursor-pointer"
            title="Close modal (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Container */}
        <div className="overflow-y-auto p-4 sm:p-8 space-y-6">
          {/* Hero Banner in Modal */}
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] bg-slate-950 border border-slate-800">
            <img
              src={map.imageUrl}
              alt={map.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <span className="px-3 py-1 text-xs font-bold rounded-lg bg-amber-500 text-slate-950 shadow-md inline-block mb-2">
                  {map.category}
                </span>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-tight">
                  {map.title}
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Crafted with passion by <span className="font-semibold text-amber-400">{map.creator}</span>
                </p>
              </div>

              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer backdrop-blur-md shadow-lg ${
                  isLiked
                    ? 'bg-rose-500 text-white shadow-rose-500/20'
                    : 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700'
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
                <span className="tabular-nums">{(map.likes + (isLiked ? 1 : 0)).toLocaleString()} Likes</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-slate-400 text-xs flex items-center gap-1.5 mb-1">
                <Users className="w-3.5 h-3.5 text-amber-400" /> Max Players
              </span>
              <span className="font-bold text-slate-200">{map.maxPlayers}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-slate-400 text-xs flex items-center gap-1.5 mb-1">
                <Trophy className="w-3.5 h-3.5 text-amber-400" /> Difficulty
              </span>
              <span className="font-bold text-slate-200">{map.difficulty}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-slate-400 text-xs flex items-center gap-1.5 mb-1">
                <Crosshair className="w-3.5 h-3.5 text-amber-400" /> Recommended Gear
              </span>
              <span className="font-bold text-slate-200 truncate block">{map.recommendedWeapon}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-slate-400 text-xs flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Total Copies
              </span>
              <span className="font-bold text-amber-400 tabular-nums">{map.copies.toLocaleString()}</span>
            </div>
          </div>

          {/* Map Description & Key Features */}
          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">
                About this Map
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">{map.description}</p>
            </div>

            {map.features && map.features.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Map Features & Mechanisms
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-300">
                  {map.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {map.rules && map.rules.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Custom Game Rules
                </h3>
                <ul className="space-y-1 text-xs text-slate-300">
                  {map.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold shrink-0">{idx + 1}.</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Regional Server Codes (Major Requirement) */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-amber-500/30 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="text-amber-400">⚡</span> Country & Server Map Codes
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Select your country server below and click copy to get the direct Craftland code.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-2">
              {map.serverCodes.map((sc) => {
                const isCopied = copiedCodeId === sc.id;
                return (
                  <div
                    key={sc.id}
                    className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between gap-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl" title={sc.serverName}>
                          {sc.flag}
                        </span>
                        <div>
                          <span className="text-xs font-bold text-slate-200">
                            {sc.serverName} Server
                          </span>
                          {sc.notes && (
                            <span className="text-[11px] text-slate-400 block">{sc.notes}</span>
                          )}
                        </div>
                      </div>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-amber-300">
                        {sc.serverCode}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
                      <code className="text-xs font-mono font-bold text-amber-300 truncate">
                        {sc.code}
                      </code>
                      <button
                        onClick={() => handleCopy(sc)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
                          isCopied
                            ? 'bg-emerald-500 text-slate-950'
                            : 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-md shadow-amber-500/10'
                        }`}
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* How to paste inside Free Fire Guide */}
          <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800 text-xs space-y-2">
            <h3 className="font-bold text-slate-200 flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-400" />
              How to play this map in Free Fire:
            </h3>
            <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-slate-300 pt-1">
              <li className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60">
                <span className="text-amber-400 font-bold block mb-1">Step 1</span>
                Copy your server code above.
              </li>
              <li className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60">
                <span className="text-amber-400 font-bold block mb-1">Step 2</span>
                Launch Free Fire and tap <strong>Modes</strong>.
              </li>
              <li className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60">
                <span className="text-amber-400 font-bold block mb-1">Step 3</span>
                Select <strong>Craftland</strong> & tap the Search icon.
              </li>
              <li className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60">
                <span className="text-amber-400 font-bold block mb-1">Step 4</span>
                Paste code & tap <strong>Create Room</strong> or <strong>Star</strong>!
              </li>
            </ol>
          </div>

          {/* Community Reviews & Comments */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-amber-400" />
                Player Comments & Ratings ({map.comments?.length || 0})
              </h3>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">Your In-Game Name</label>
                  <input
                    type="text"
                    required
                    value={newCommentAuthor}
                    onChange={(e) => setNewCommentAuthor(e.target.value)}
                    placeholder="e.g. Sajjad_Fan_99"
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">Your Server</label>
                  <select
                    value={newCommentServer}
                    onChange={(e) => setNewCommentServer(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="Bangladesh">🇧🇩 Bangladesh</option>
                    <option value="India">🇮🇳 India</option>
                    <option value="Indonesia">🇮🇩 Indonesia</option>
                    <option value="Pakistan">🇵🇰 Pakistan</option>
                    <option value="Global">🌍 Global</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">Rating</label>
                  <select
                    value={newCommentRating}
                    onChange={(e) => setNewCommentRating(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                    <option value={4}>⭐⭐⭐⭐ (4/5)</option>
                    <option value={3}>⭐⭐⭐ (3/5)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">Feedback / Strategy Tip</label>
                <textarea
                  required
                  rows={2}
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Share how you performed on this map or suggestions for Sajjad..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Post Comment
                </button>
              </div>
            </form>

            {/* Comment List */}
            <div className="space-y-2.5">
              {map.comments && map.comments.length > 0 ? (
                map.comments.map((c) => (
                  <div key={c.id} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-200">{c.author}</span>
                        {c.server && (
                          <span className="text-[10px] text-amber-400/90 font-mono">[{c.server}]</span>
                        )}
                      </div>
                      <span className="text-amber-400">{'★'.repeat(c.rating)}</span>
                    </div>
                    <p className="text-slate-300 leading-normal">{c.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 italic text-center py-3">
                  No comments yet. Be the first player to review this map!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
