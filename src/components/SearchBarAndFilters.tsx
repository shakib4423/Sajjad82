import React from 'react';
import { Search, X, Sparkles, Heart, Clock, Globe, Layers } from 'lucide-react';
import { SortFilter, GameCategory, ServerRegion } from '../types';

interface SearchBarAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeSort: SortFilter;
  onSortChange: (sort: SortFilter) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedServer: string;
  onServerChange: (server: string) => void;
  totalMapsCount: number;
  filteredCount: number;
}

const CATEGORIES: (string)[] = [
  'All',
  '1v1 Clash',
  'Parkour / Only Up',
  'Zombie Survival',
  'Hide & Seek',
  'Unlimited Gloo',
  'Sniper Arena',
];

const SERVER_OPTIONS: { label: string; value: string; flag: string }[] = [
  { label: 'All Servers', value: 'ALL', flag: '🌐' },
  { label: 'Bangladesh', value: 'BD', flag: '🇧🇩' },
  { label: 'India', value: 'IND', flag: '🇮🇳' },
  { label: 'Indonesia', value: 'ID', flag: '🇮🇩' },
  { label: 'Pakistan', value: 'PK', flag: '🇵🇰' },
  { label: 'Global', value: 'GLOBAL', flag: '🌍' },
];

export const SearchBarAndFilters: React.FC<SearchBarAndFiltersProps> = ({
  searchQuery,
  onSearchChange,
  activeSort,
  onSortChange,
  selectedCategory,
  onCategoryChange,
  selectedServer,
  onServerChange,
  totalMapsCount,
  filteredCount,
}) => {
  return (
    <div className="w-full bg-slate-900/70 border border-slate-800 rounded-2xl p-4 sm:p-6 backdrop-blur-md shadow-xl mb-8 space-y-4">
      {/* Top row: Search Bar and Primary Filter Buttons ('Latest', 'Most Liked', 'Oldest') */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search map codes, titles, tags, or game modes..."
            className="w-full pl-10 pr-9 py-2.5 bg-slate-950/80 border border-slate-800 focus:border-amber-500 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Buttons: 'Latest', 'Most Liked', and 'Oldest' */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950/90 border border-slate-800 rounded-xl self-start lg:self-center overflow-x-auto max-w-full">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 px-2 hidden sm:inline whitespace-nowrap">
            Sort:
          </span>
          <button
            onClick={() => onSortChange('Latest')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeSort === 'Latest'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Latest
          </button>
          <button
            onClick={() => onSortChange('Most Liked')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeSort === 'Most Liked'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            Most Liked
          </button>
          <button
            onClick={() => onSortChange('Oldest')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeSort === 'Oldest'
                ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            Oldest
          </button>
        </div>
      </div>

      {/* Secondary Row: Server region quick-filter and category pills */}
      <div className="pt-2 border-t border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        {/* Country / Server Quick Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-slate-400 font-medium flex items-center gap-1 shrink-0 mr-1">
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            Server:
          </span>
          {SERVER_OPTIONS.map((srv) => (
            <button
              key={srv.value}
              onClick={() => onServerChange(srv.value)}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer shrink-0 font-medium whitespace-nowrap ${
                selectedServer === srv.value
                  ? 'bg-slate-100 text-slate-900 font-bold shadow-sm'
                  : 'bg-slate-950/70 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800/80'
              }`}
            >
              <span className="mr-1">{srv.flag}</span>
              {srv.label}
            </button>
          ))}
        </div>

        {/* Categories selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <span className="text-slate-400 font-medium flex items-center gap-1 shrink-0 mr-1">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            Mode:
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer shrink-0 font-medium whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Result feedback */}
      <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
        <span>
          Showing <strong className="text-slate-200">{filteredCount}</strong> of{' '}
          <span className="tabular-nums">{totalMapsCount}</span> Free Fire Craftland maps
        </span>
        {(searchQuery || selectedCategory !== 'All' || selectedServer !== 'ALL') && (
          <button
            onClick={() => {
              onSearchChange('');
              onCategoryChange('All');
              onServerChange('ALL');
            }}
            className="text-amber-400 hover:underline cursor-pointer"
          >
            Reset all filters
          </button>
        )}
      </div>
    </div>
  );
};
