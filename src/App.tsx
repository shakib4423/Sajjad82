/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SearchBarAndFilters } from './components/SearchBarAndFilters';
import { MapCard } from './components/MapCard';
import { MapDetailModal } from './components/MapDetailModal';
import { AdminModal } from './components/AdminModal';
import { HowToUseSection } from './components/HowToUseSection';
import { ServerGuideSection } from './components/ServerGuideSection';
import { CreatorSection } from './components/CreatorSection';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { InstallAppModal } from './components/InstallAppModal';
import { INITIAL_MAPS } from './data/initialMaps';
import { CraftlandMap, SortFilter } from './types';
import { playCopySound, playLikeSound } from './utils/audio';

const STORAGE_KEY_MAPS = 'crafter_sajjad_maps_v1';
const STORAGE_KEY_LIKED = 'crafter_sajjad_liked_ids_v1';
const STORAGE_KEY_PASSWORD = 'crafter_sajjad_admin_pw_v2';
const STORAGE_KEY_ADMIN_LOGGED = 'crafter_sajjad_admin_logged_v2';
const REQUIRED_ADMIN_PASSWORD = 'Sajjad@99#AdminPanel';

export default function App() {
  // Database State
  const [maps, setMaps] = useState<CraftlandMap[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_MAPS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse stored maps, falling back to initial', e);
    }
    return INITIAL_MAPS;
  });

  // User Liked Maps State
  const [likedMapIds, setLikedMapIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_LIKED);
      if (stored) return JSON.parse(stored);
    } catch {}
    return [];
  });

  // Admin Auth State - strictly set to 'Sajjad@99#AdminPanel'
  const [adminPassword, setAdminPassword] = useState<string>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PASSWORD);
      if (stored && stored.length > 0) return stored;
    } catch {}
    return REQUIRED_ADMIN_PASSWORD;
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY_ADMIN_LOGGED) === 'true';
    } catch {
      return false;
    }
  });

  // UI Control State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSort, setActiveSort] = useState<SortFilter>('Latest');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedServer, setSelectedServer] = useState<string>('ALL');

  // Modals & Drawers
  const [selectedMapForDetail, setSelectedMapForDetail] = useState<CraftlandMap | null>(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [editingMap, setEditingMap] = useState<CraftlandMap | null>(null);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastSubMessage, setToastSubMessage] = useState<string | null>(null);
  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Persist Maps
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_MAPS, JSON.stringify(maps));
    } catch (e) {
      console.error('Error saving maps to localStorage', e);
    }
  }, [maps]);

  // Persist Likes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LIKED, JSON.stringify(likedMapIds));
    } catch {}
  }, [likedMapIds]);

  // Persist Admin Session (session-based)
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY_ADMIN_LOGGED, isAdmin ? 'true' : 'false');
    } catch {}
  }, [isAdmin]);

  // Toast Helper
  const showToast = (message: string, subMessage?: string) => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setToastMessage(message);
    setToastSubMessage(subMessage || null);
    toastTimerRef.current = setTimeout(() => {
      setToastMessage(null);
      setToastSubMessage(null);
    }, 3200);
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedMapForDetail(null);
        setIsAdminModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Admin Login Handler
  const handleAdminLogin = (password: string): boolean => {
    if (password === adminPassword) {
      setIsAdmin(true);
      showToast('Admin access granted', 'Welcome back, Crafter Sajjad');
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    showToast('Logged out of Admin Panel');
  };

  const handleChangeAdminPassword = (newPass: string) => {
    setAdminPassword(newPass);
    try {
      localStorage.setItem(STORAGE_KEY_PASSWORD, newPass);
    } catch {}
    showToast('Admin password updated successfully');
  };

  // Map Post CRUD Handlers
  const handleAddMap = (
    newMapData: Omit<CraftlandMap, 'id' | 'createdAt' | 'likes' | 'views' | 'copies'>
  ) => {
    const newMap: CraftlandMap = {
      ...newMapData,
      id: 'map-' + Date.now(),
      createdAt: new Date().toISOString(),
      likes: 1,
      views: 120,
      copies: 0,
      comments: [],
    };
    setMaps((prev) => [newMap, ...prev]);
    showToast(`Published "${newMap.title}"`, 'Map is now live on the website');
  };

  const handleUpdateMap = (updatedMap: CraftlandMap) => {
    setMaps((prev) => prev.map((m) => (m.id === updatedMap.id ? updatedMap : m)));
    showToast(`Updated "${updatedMap.title}"`);
    if (selectedMapForDetail?.id === updatedMap.id) {
      setSelectedMapForDetail(updatedMap);
    }
  };

  const handleDeleteMap = (mapId: string) => {
    const target = maps.find((m) => m.id === mapId);
    setMaps((prev) => prev.filter((m) => m.id !== mapId));
    if (target) {
      showToast(`Deleted "${target.title}"`);
    }
    if (selectedMapForDetail?.id === mapId) {
      setSelectedMapForDetail(null);
    }
  };

  const handleResetToDefault = () => {
    setMaps(INITIAL_MAPS);
    try {
      localStorage.setItem(STORAGE_KEY_MAPS, JSON.stringify(INITIAL_MAPS));
    } catch {}
    showToast('Restored initial default maps');
  };

  // Like / Unlike Map
  const handleToggleLike = (mapId: string) => {
    const alreadyLiked = likedMapIds.includes(mapId);
    if (alreadyLiked) {
      setLikedMapIds((prev) => prev.filter((id) => id !== mapId));
      setMaps((prev) =>
        prev.map((m) => (m.id === mapId ? { ...m, likes: Math.max(0, m.likes - 1) } : m))
      );
    } else {
      setLikedMapIds((prev) => [...prev, mapId]);
      setMaps((prev) =>
        prev.map((m) => (m.id === mapId ? { ...m, likes: m.likes + 1 } : m))
      );
      showToast('Added to your favorite maps ❤️');
    }
  };

  // Code Copy Action
  const handleCopyCode = (code: string, serverName: string) => {
    showToast(`Copied ${serverName} Server Code!`, code);
    // Increment copies metric
    setMaps((prev) =>
      prev.map((m) => {
        const hasCode = m.serverCodes.some((sc) => sc.code === code);
        return hasCode ? { ...m, copies: m.copies + 1 } : m;
      })
    );
  };

  // Add Comment / Review
  const handleAddComment = (
    mapId: string,
    commentData: { author: string; text: string; rating: number; server: string }
  ) => {
    const newComment = {
      id: 'comm-' + Date.now(),
      author: commentData.author,
      avatarSeed: commentData.author.toLowerCase(),
      rating: commentData.rating,
      text: commentData.text,
      createdAt: new Date().toISOString(),
      server: commentData.server,
    };

    setMaps((prev) =>
      prev.map((m) => {
        if (m.id === mapId) {
          const updatedComments = [newComment, ...(m.comments || [])];
          const updatedMap = { ...m, comments: updatedComments };
          if (selectedMapForDetail?.id === mapId) {
            setSelectedMapForDetail(updatedMap);
          }
          return updatedMap;
        }
        return m;
      })
    );

    showToast('Comment posted! Thanks for your review.');
  };

  // Navigation scroll helper
  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtered and Sorted Maps
  const filteredAndSortedMaps = useMemo(() => {
    let result = [...maps];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((m) => {
        const titleMatch = m.title.toLowerCase().includes(q);
        const descMatch = m.description.toLowerCase().includes(q);
        const tagMatch = m.tags.some((t) => t.toLowerCase().includes(q));
        const categoryMatch = m.category.toLowerCase().includes(q);
        const codeMatch = m.serverCodes.some(
          (sc) =>
            sc.code.toLowerCase().includes(q) ||
            sc.serverName.toLowerCase().includes(q) ||
            sc.serverCode.toLowerCase().includes(q)
        );
        return titleMatch || descMatch || tagMatch || categoryMatch || codeMatch;
      });
    }

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter((m) => m.category === selectedCategory);
    }

    // Server region filter
    if (selectedServer !== 'ALL') {
      result = result.filter((m) =>
        m.serverCodes.some((sc) => sc.serverCode === selectedServer)
      );
    }

    // Sorting: 'Latest' | 'Most Liked' | 'Oldest'
    if (activeSort === 'Latest') {
      result.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (activeSort === 'Most Liked') {
      result.sort((a, b) => b.likes - a.likes);
    } else if (activeSort === 'Oldest') {
      result.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }

    return result;
  }, [maps, searchQuery, selectedCategory, selectedServer, activeSort]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Sticky Header with Crafter Sajjad wordmark */}
      <Header
        isAdmin={isAdmin}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        onNavigateToSection={handleNavigate}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onScrollToMaps={() => handleNavigate('maps-section')}
          onOpenHowToUse={() => handleNavigate('how-to-use')}
          onOpenInstallModal={() => setIsInstallModalOpen(true)}
        />

        {/* Maps Browser Section */}
        <section id="maps-section" className="py-12 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Search Bar & Filter Buttons ('Latest', 'Most Liked', 'Oldest') */}
            <SearchBarAndFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              activeSort={activeSort}
              onSortChange={setActiveSort}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedServer={selectedServer}
              onServerChange={setSelectedServer}
              totalMapsCount={maps.length}
              filteredCount={filteredAndSortedMaps.length}
            />

            {/* Maps Grid Container - Min height ensures smooth scrolling even with 1-2 items */}
            <div className="min-h-[420px]">
              {filteredAndSortedMaps.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300">
                  {filteredAndSortedMaps.map((map) => (
                    <MapCard
                      key={map.id}
                      map={map}
                      isLiked={likedMapIds.includes(map.id)}
                      onToggleLike={handleToggleLike}
                      onCopyCode={handleCopyCode}
                      onOpenDetails={(m) => setSelectedMapForDetail(m)}
                      isAdmin={isAdmin}
                      onEditMap={(m) => {
                        setEditingMap(m);
                        setIsAdminModalOpen(true);
                      }}
                      onDeleteMap={handleDeleteMap}
                    />
                  ))}
                </div>
              ) : (
                /* Empty State */
                <div className="p-12 text-center bg-slate-900/40 rounded-3xl border border-slate-800/80 my-8">
                  <div className="text-3xl mb-3">🔍</div>
                  <h3 className="text-lg font-bold text-white">No Craftland Maps Found</h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-md mx-auto">
                    We couldn&apos;t find any maps matching &quot;{searchQuery}&quot; with the active filters.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                      setSelectedServer('ALL');
                    }}
                    className="mt-4 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                  >
                    Clear Filters & Show All
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Tutorial Section: How to use codes */}
        <HowToUseSection />

        {/* Server Guide: Why codes are separated by country/server */}
        <ServerGuideSection />

        {/* Creator Section: About Crafter Sajjad & Request Map */}
        <CreatorSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />

      {/* Map Full Detail Modal */}
      {selectedMapForDetail && (
        <MapDetailModal
          map={selectedMapForDetail}
          onClose={() => setSelectedMapForDetail(null)}
          isLiked={likedMapIds.includes(selectedMapForDetail.id)}
          onToggleLike={handleToggleLike}
          onCopyCode={handleCopyCode}
          onAddComment={handleAddComment}
        />
      )}

      {/* Admin Panel Modal (Password Protected) */}
      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        isAdmin={isAdmin}
        onLogin={handleAdminLogin}
        onLogout={handleAdminLogout}
        maps={maps}
        onAddMap={handleAddMap}
        onUpdateMap={handleUpdateMap}
        onDeleteMap={handleDeleteMap}
        onResetToDefault={handleResetToDefault}
        adminPasswordCurrent={adminPassword}
        onChangePassword={handleChangeAdminPassword}
        editingMap={editingMap}
        setEditingMap={setEditingMap}
      />

      {/* Install Android App / APK Modal */}
      <InstallAppModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />

      {/* Toast Notification */}
      <Toast message={toastMessage} subMessage={toastSubMessage} />
    </div>
  );
}
