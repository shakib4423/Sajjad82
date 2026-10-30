import React, { useState } from 'react';
import { Copy, Check, Heart, Users, Eye, Sparkles, Trophy, ChevronRight, Edit3, Trash2 } from 'lucide-react';
import { CraftlandMap, ServerCode } from '../types';
import { playCopySound, playLikeSound } from '../utils/audio';

interface MapCardProps {
  map: CraftlandMap;
  isLiked: boolean;
  onToggleLike: (mapId: string) => void;
  onCopyCode: (code: string, serverName: string) => void;
  onOpenDetails: (map: CraftlandMap) => void;
  isAdmin?: boolean;
  onEditMap?: (map: CraftlandMap) => void;
  onDeleteMap?: (mapId: string) => void;
}

export const MapCard: React.FC<MapCardProps> = ({
  map,
  isLiked,
  onToggleLike,
  onCopyCode,
  onOpenDetails,
  isAdmin,
  onEditMap,
  onDeleteMap,
}) => {
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const handleCopy = (serverCode: ServerCode, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(serverCode.code);
    playCopySound();
    setCopiedCodeId(serverCode.id);
    onCopyCode(serverCode.code, serverCode.serverName);

    setTimeout(() => {
      setCopiedCodeId(null);
    }, 2200);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    playLikeSound();
    onToggleLike(map.id);
  };

  const formattedDate = new Date(map.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article className="group bg-slate-900/80 border border-slate-800 hover:border-slate-700/80 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/5 relative">
      {/* Thumbnail Image Container */}
      <div
        onClick={() => onOpenDetails(map)}
        className="relative aspect-video w-full overflow-hidden bg-slate-950 cursor-pointer"
      >
        <img
          src={map.imageUrl}
          alt={map.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            // Elegant fallback if image path ever fails
            (e.currentTarget as HTMLImageElement).src =
              'https://placehold.co/800x450/1e293b/f8fafc?text=Craftland+Arena';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Category & Badge overlay */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-slate-950/80 text-amber-300 border border-amber-500/30 backdrop-blur-md">
            {map.category}
          </span>
          {map.featured && (
            <span className="px-2 py-0.5 text-[11px] font-bold rounded-md bg-amber-500 text-slate-950 flex items-center gap-1 shadow-md">
              <Sparkles className="w-3 h-3 fill-current" />
              HOT
            </span>
          )}
        </div>

        {/* Quick Admin Actions (if logged in) */}
        {isAdmin && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-slate-950/80 backdrop-blur-md p-1 rounded-lg border border-slate-700">
            {onEditMap && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEditMap(map);
                }}
                className="p-1.5 text-slate-300 hover:text-amber-400 hover:bg-slate-800 rounded transition-colors"
                title="Edit map"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            )}
            {onDeleteMap && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm(`Delete map "${map.title}"?`)) {
                    onDeleteMap(map.id);
                  }
                }}
                className="p-1.5 text-slate-300 hover:text-rose-400 hover:bg-slate-800 rounded transition-colors"
                title="Delete map"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

        {/* Players & Difficulty indicator */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-sm px-2.5 py-1 rounded-md border border-slate-800">
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-medium">{map.maxPlayers}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-sm px-2.5 py-1 rounded-md border border-slate-800">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-medium">{map.difficulty}</span>
          </div>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata: Creator & Date (Unboxed with · separator per design guidelines) */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <span className="font-semibold text-amber-400/90">{map.creator}</span>
            <span aria-hidden="true">·</span>
            <span>{formattedDate}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {map.views.toLocaleString()} views
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onOpenDetails(map)}
            className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1 cursor-pointer"
            title={map.title}
          >
            {map.title}
          </h3>

          {/* Tagline / Snippet */}
          <p className="mt-1.5 text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
            {map.tagline || map.description}
          </p>
        </div>

        {/* Server / Country Map Codes Container */}
        <div className="mt-4 pt-3.5 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Copy Server Codes:
            </span>
            <span className="text-[11px] text-slate-500">
              {map.serverCodes.length} {map.serverCodes.length === 1 ? 'Region' : 'Regions'}
            </span>
          </div>

          {/* List of server codes separated by country */}
          <div className="space-y-1.5">
            {map.serverCodes.map((sc) => {
              const isCopied = copiedCodeId === sc.id;
              return (
                <div
                  key={sc.id}
                  className="flex items-center justify-between gap-2 p-2 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-base select-none shrink-0" title={sc.serverName}>
                      {sc.flag}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-slate-200 truncate">
                          {sc.serverName}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          [{sc.serverCode}]
                        </span>
                      </div>
                      <code className="text-xs font-mono font-medium text-amber-300 block truncate">
                        {sc.code}
                      </code>
                    </div>
                  </div>

                  {/* Copy Button */}
                  <button
                    onClick={(e) => handleCopy(sc, e)}
                    className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isCopied
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'bg-amber-500/10 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/30 hover:border-amber-500'
                    }`}
                    title={`Copy ${sc.serverName} Map Code`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Actions: Like counter + View Details */}
        <div className="mt-4 pt-3 flex items-center justify-between border-t border-slate-800/80">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              isLiked
                ? 'text-rose-400 bg-rose-500/10 border border-rose-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
            title={isLiked ? 'Unlike map' : 'Like map'}
          >
            <Heart
              className={`w-4 h-4 transition-transform ${
                isLiked ? 'fill-rose-500 text-rose-500 scale-110' : ''
              }`}
            />
            <span className="tabular-nums font-mono">
              {(map.likes + (isLiked ? 1 : 0)).toLocaleString()}
            </span>
          </button>

          <button
            onClick={() => onOpenDetails(map)}
            className="flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors group/btn cursor-pointer"
          >
            <span>Full Details & Rules</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </article>
  );
};
