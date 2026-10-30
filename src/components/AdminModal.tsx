import React, { useState, useRef } from 'react';
import {
  X,
  Lock,
  Plus,
  Trash2,
  Edit2,
  Upload,
  Check,
  ShieldCheck,
  Globe,
  Download,
  RotateCcw,
  Sparkles,
  ImageIcon,
  FileUp,
} from 'lucide-react';
import { CraftlandMap, ServerCode, GameCategory, ServerRegion } from '../types';
import { PRESET_IMAGES, SERVER_PRESETS } from '../data/initialMaps';
import { playClickSound } from '../utils/audio';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean;
  onLogin: (password: string) => boolean;
  onLogout: () => void;
  maps: CraftlandMap[];
  onAddMap: (newMap: Omit<CraftlandMap, 'id' | 'createdAt' | 'likes' | 'views' | 'copies'>) => void;
  onUpdateMap: (updatedMap: CraftlandMap) => void;
  onDeleteMap: (mapId: string) => void;
  onResetToDefault: () => void;
  adminPasswordCurrent: string;
  onChangePassword: (newPass: string) => void;
  editingMap: CraftlandMap | null;
  setEditingMap: (map: CraftlandMap | null) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  isAdmin,
  onLogin,
  onLogout,
  maps,
  onAddMap,
  onUpdateMap,
  onDeleteMap,
  onResetToDefault,
  adminPasswordCurrent,
  onChangePassword,
  editingMap,
  setEditingMap,
}) => {
  // Login State
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'upload' | 'manage' | 'settings'>('upload');

  // Form State for Map Creation / Editing
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState<GameCategory>('1v1 Clash');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0].url);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [customUploadedImage, setCustomUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [maxPlayers, setMaxPlayers] = useState('1 vs 1');
  const [recommendedWeapon, setRecommendedWeapon] = useState('Desert Eagle & M1014');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard' | 'Extreme'>('Medium');
  const [tagsInput, setTagsInput] = useState('1v1, UnlimitedGloo, FastSwitch');
  const [featuresInput, setFeaturesInput] = useState('Infinite Gloo Walls & Ammo\nZero Fall Damage\nCustom Hitboxes');
  const [rulesInput, setRulesInput] = useState('Round timer: 120s\nNo rooftop camping');
  const [isFeatured, setIsFeatured] = useState(false);

  // Server Codes Builder
  const [serverCodes, setServerCodes] = useState<
    { id: string; serverName: string; serverCode: ServerRegion; flag: string; code: string; notes: string }[]
  >([
    {
      id: 'sc-bd',
      serverName: 'Bangladesh',
      serverCode: 'BD',
      flag: '🇧🇩',
      code: '#FREEFIREBD' + Math.floor(10000000 + Math.random() * 90000000),
      notes: 'Active Bangladesh Server Code',
    },
    {
      id: 'sc-ind',
      serverName: 'India',
      serverCode: 'IND',
      flag: '🇮🇳',
      code: '#FREEFIREIND' + Math.floor(10000000 + Math.random() * 90000000),
      notes: 'Active India Server Code',
    },
    {
      id: 'sc-id',
      serverName: 'Indonesia',
      serverCode: 'ID',
      flag: '🇮🇩',
      code: '#FREEFIREID' + Math.floor(10000000 + Math.random() * 90000000),
      notes: 'Active Indonesia Server Code',
    },
    {
      id: 'sc-gl',
      serverName: 'Global',
      serverCode: 'GLOBAL',
      flag: '🌍',
      code: '#FREEFIREGL' + Math.floor(10000000 + Math.random() * 90000000),
      notes: 'Global universal room code',
    },
  ]);

  // Settings State
  const [newPassword, setNewPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [formSuccessMessage, setFormSuccessMessage] = useState('');

  // Handle Editing Map Load
  React.useEffect(() => {
    if (editingMap) {
      setTitle(editingMap.title);
      setTagline(editingMap.tagline);
      setCategory(editingMap.category);
      setDescription(editingMap.description);
      setImageUrl(editingMap.imageUrl);
      if (editingMap.imageUrl.startsWith('data:image/')) {
        setCustomUploadedImage(editingMap.imageUrl);
        setCustomImageUrl('');
      } else if (!PRESET_IMAGES.some((p) => p.url === editingMap.imageUrl)) {
        setCustomImageUrl(editingMap.imageUrl);
        setCustomUploadedImage(null);
      } else {
        setCustomUploadedImage(null);
        setCustomImageUrl('');
      }
      setMaxPlayers(editingMap.maxPlayers);
      setRecommendedWeapon(editingMap.recommendedWeapon);
      setDifficulty(editingMap.difficulty);
      setTagsInput(editingMap.tags.join(', '));
      setFeaturesInput(editingMap.features.join('\n'));
      setRulesInput((editingMap.rules || []).join('\n'));
      setIsFeatured(editingMap.featured || false);
      setServerCodes(
        editingMap.serverCodes.map((s) => ({
          id: s.id,
          serverName: s.serverName,
          serverCode: s.serverCode,
          flag: s.flag,
          code: s.code,
          notes: s.notes || '',
        }))
      );
      setActiveTab('upload');
    }
  }, [editingMap]);

  // Handle local image file upload (PNG, JPG, WebP, GIF)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WebP, etc.).');
      return;
    }

    // Limit image size to 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert('Image file size must be less than 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setCustomUploadedImage(result);
        setImageUrl(result);
        setCustomImageUrl('');
      }
    };
    reader.readAsDataURL(file);
  };

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(passwordInput);
    if (success) {
      setPasswordInput('');
      setLoginError('');
      playClickSound();
    } else {
      setLoginError("Access Denied: Incorrect password. Only users who enter 'Sajjad@99#AdminPanel' can access the admin panel.");
    }
  };

  const handleAddServerRow = () => {
    const defaultPreset = SERVER_PRESETS[serverCodes.length % SERVER_PRESETS.length] || SERVER_PRESETS[0];
    setServerCodes([
      ...serverCodes,
      {
        id: 'sc-' + Date.now(),
        serverName: defaultPreset.name,
        serverCode: defaultPreset.code,
        flag: defaultPreset.flag,
        code: `#FREEFIRE${defaultPreset.code}${Math.floor(10000000 + Math.random() * 90000000)}`,
        notes: '',
      },
    ]);
  };

  const handleRemoveServerRow = (id: string) => {
    if (serverCodes.length <= 1) {
      alert('You must provide at least one country or server code for the map post.');
      return;
    }
    setServerCodes(serverCodes.filter((s) => s.id !== id));
  };

  const handleServerPresetSelect = (index: number, presetName: string) => {
    const found = SERVER_PRESETS.find((p) => p.name === presetName);
    if (!found) return;
    const updated = [...serverCodes];
    updated[index] = {
      ...updated[index],
      serverName: found.name,
      serverCode: found.code,
      flag: found.flag,
      code: updated[index].code.startsWith('#FREEFIRE')
        ? `#FREEFIRE${found.code}${Math.floor(10000000 + Math.random() * 90000000)}`
        : updated[index].code,
    };
    setServerCodes(updated);
  };

  const handleSaveMap = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Please provide a title and description.');
      return;
    }

    const finalImage = customUploadedImage
      ? customUploadedImage
      : customImageUrl.trim()
      ? customImageUrl.trim()
      : imageUrl;
    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    const features = featuresInput
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);
    const rules = rulesInput
      .split('\n')
      .map((r) => r.trim())
      .filter(Boolean);

    const formattedServerCodes: ServerCode[] = serverCodes.map((s) => ({
      id: s.id,
      serverName: s.serverName,
      serverCode: s.serverCode,
      flag: s.flag,
      code: s.code.trim(),
      notes: s.notes.trim() || undefined,
    }));

    if (editingMap) {
      onUpdateMap({
        ...editingMap,
        title: title.trim(),
        tagline: tagline.trim() || title.trim(),
        category,
        description: description.trim(),
        imageUrl: finalImage,
        maxPlayers,
        recommendedWeapon,
        difficulty,
        tags,
        features,
        rules,
        serverCodes: formattedServerCodes,
        featured: isFeatured,
      });
      setEditingMap(null);
      setFormSuccessMessage(`Map "${title}" updated successfully!`);
    } else {
      onAddMap({
        title: title.trim(),
        tagline: tagline.trim() || title.trim(),
        category,
        description: description.trim(),
        imageUrl: finalImage,
        creator: 'Crafter Sajjad',
        maxPlayers,
        recommendedWeapon,
        difficulty,
        tags,
        features,
        rules,
        serverCodes: formattedServerCodes,
        featured: isFeatured,
      });
      setFormSuccessMessage(`New Craftland map "${title}" published successfully!`);
    }

    // Reset fields if adding new
    if (!editingMap) {
      setTitle('');
      setTagline('');
      setDescription('');
      setCustomUploadedImage(null);
      setCustomImageUrl('');
      setImageUrl(PRESET_IMAGES[0].url);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }

    setTimeout(() => {
      setFormSuccessMessage('');
      setActiveTab('manage');
    }, 1500);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(maps, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `crafter_sajjad_maps_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="bg-slate-900 border border-slate-800 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Crafter Sajjad Admin Panel
              </h2>
              <p className="text-xs text-slate-400">
                {isAdmin ? 'Upload & manage Free Fire Craftland maps' : 'Authentication Required'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                onClick={onLogout}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              >
                Log Out
              </button>
            )}
            <button
              onClick={() => {
                setEditingMap(null);
                onClose();
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Section */}
        {!isAdmin ? (
          /* Password Login Screen */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center max-w-md mx-auto w-full text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-xl shadow-amber-500/10">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-white">Admin Panel Password Protection</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                This area is restricted. Please enter the admin password manually to access the panel and manage Craftland map codes.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="w-full space-y-3.5">
              <div className="relative">
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (loginError) setLoginError('');
                  }}
                  placeholder="••••••••••••••••••••"
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors font-mono tracking-widest"
                />
              </div>

              {loginError && (
                <div className="p-2.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 font-medium animate-in fade-in">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Verify Password & Access Admin</span>
              </button>
            </form>
          </div>
        ) : (
          /* Admin Dashboard */
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Tabs */}
            <div className="flex items-center gap-2 px-6 pt-4 border-b border-slate-800 bg-slate-950/30">
              <button
                onClick={() => {
                  setEditingMap(null);
                  setActiveTab('upload');
                }}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-t-xl border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'upload'
                    ? 'border-amber-500 text-amber-400 bg-slate-800/40'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Plus className="w-4 h-4" />
                {editingMap ? 'Edit Map Post' : 'Upload New Map'}
              </button>
              <button
                onClick={() => setActiveTab('manage')}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-t-xl border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'manage'
                    ? 'border-amber-500 text-amber-400 bg-slate-800/40'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Globe className="w-4 h-4" />
                Manage Maps ({maps.length})
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-t-xl border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'settings'
                    ? 'border-amber-500 text-amber-400 bg-slate-800/40'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Lock className="w-4 h-4" />
                Settings & Backup
              </button>
            </div>

            {/* Scrollable Form / Content Body */}
            <div className="overflow-y-auto p-6 flex-1 space-y-6">
              {formSuccessMessage && (
                <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 animate-in fade-in">
                  <Check className="w-4 h-4" />
                  {formSuccessMessage}
                </div>
              )}

              {/* TAB 1: UPLOAD OR EDIT MAP */}
              {activeTab === 'upload' && (
                <form onSubmit={handleSaveMap} className="space-y-6">
                  {editingMap && (
                    <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-between text-xs text-amber-300">
                      <span>Currently editing: <strong>{editingMap.title}</strong></span>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingMap(null);
                          setTitle('');
                          setDescription('');
                        }}
                        className="underline text-slate-400 hover:text-white cursor-pointer"
                      >
                        Cancel Edit & Upload New
                      </button>
                    </div>
                  )}

                  {/* Basic Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1.5">
                        Map Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. 1v1 Fast Gloo God Colosseum"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1.5">
                        Game Mode / Category *
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as GameCategory)}
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                      >
                        <option value="1v1 Clash">1v1 Clash</option>
                        <option value="Parkour / Only Up">Parkour / Only Up</option>
                        <option value="Zombie Survival">Zombie Survival</option>
                        <option value="Hide & Seek">Hide & Seek</option>
                        <option value="Unlimited Gloo">Unlimited Gloo</option>
                        <option value="Sniper Arena">Sniper Arena</option>
                        <option value="Custom Minigame">Custom Minigame</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1.5">
                        Max Players / Format
                      </label>
                      <input
                        type="text"
                        value={maxPlayers}
                        onChange={(e) => setMaxPlayers(e.target.value)}
                        placeholder="e.g. 1 vs 1 or 4 vs 4"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1.5">
                        Difficulty
                      </label>
                      <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value as 'Easy' | 'Medium' | 'Hard' | 'Extreme')}
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                      >
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                        <option value="Extreme">Extreme</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1.5">
                        Recommended Weapons
                      </label>
                      <input
                        type="text"
                        value={recommendedWeapon}
                        onChange={(e) => setRecommendedWeapon(e.target.value)}
                        placeholder="e.g. Desert Eagle / M1014 / Shotgun"
                        className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {/* Custom Map Icon / Thumbnail Upload & Selection */}
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                          <ImageIcon className="w-4 h-4 text-amber-400" />
                          Map Icon / Thumbnail (Upload Custom Image or Select Preset) *
                        </label>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Upload your custom map icon / screenshot from your device, or choose a preset.
                        </p>
                      </div>

                      {customUploadedImage && (
                        <button
                          type="button"
                          onClick={() => {
                            setCustomUploadedImage(null);
                            setImageUrl(PRESET_IMAGES[0].url);
                            if (fileInputRef.current) fileInputRef.current.value = '';
                          }}
                          className="self-start sm:self-auto text-xs text-rose-400 hover:text-rose-300 underline cursor-pointer"
                        >
                          Remove Custom Image
                        </button>
                      )}
                    </div>

                    {/* Custom Image File Upload Area */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
                      {/* Upload Box */}
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className={`md:col-span-7 border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                          customUploadedImage
                            ? 'border-emerald-500/50 bg-emerald-500/5 hover:border-emerald-500'
                            : 'border-slate-800 hover:border-amber-500/60 bg-slate-900/60 hover:bg-slate-900'
                        }`}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-2">
                          <FileUp className="w-5 h-5" />
                        </div>
                        <div className="text-xs font-bold text-white">
                          {customUploadedImage ? 'Custom Image Uploaded (Click to change)' : 'Click to Upload Custom Map Image'}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">
                          Supports PNG, JPG, WebP, GIF (Max 5MB)
                        </p>
                      </div>

                      {/* Active Thumbnail Preview */}
                      <div className="md:col-span-5 relative aspect-video rounded-xl overflow-hidden border border-slate-700 bg-slate-950 flex items-center justify-center">
                        <img
                          src={customUploadedImage || (customImageUrl.trim() ? customImageUrl : imageUrl)}
                          alt="Thumbnail preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src =
                              'https://placehold.co/800x450/1e293b/f8fafc?text=Invalid+Image+URL';
                          }}
                        />
                        <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-semibold text-amber-300 border border-slate-800">
                          {customUploadedImage
                            ? 'Custom Upload Active'
                            : customImageUrl.trim()
                            ? 'Custom URL Active'
                            : 'Preset Active'}
                        </div>
                      </div>
                    </div>

                    {/* Predefined thumbnails selection */}
                    <div className="pt-2 border-t border-slate-800/80">
                      <span className="text-[11px] font-semibold text-slate-400 block mb-2">
                        Or select from predefined thumbnails:
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                        {PRESET_IMAGES.map((preset) => {
                          const isSelected =
                            !customUploadedImage && !customImageUrl && imageUrl === preset.url;
                          return (
                            <button
                              key={preset.name}
                              type="button"
                              onClick={() => {
                                setCustomUploadedImage(null);
                                setCustomImageUrl('');
                                setImageUrl(preset.url);
                                if (fileInputRef.current) fileInputRef.current.value = '';
                              }}
                              className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                                isSelected
                                  ? 'border-amber-500 shadow-lg shadow-amber-500/10 scale-[0.98]'
                                  : 'border-slate-800 hover:border-slate-600 opacity-60 hover:opacity-100'
                              }`}
                            >
                              <img
                                src={preset.url}
                                alt={preset.name}
                                className="w-full h-full object-cover"
                              />
                              <span className="absolute bottom-1 left-1 right-1 bg-slate-950/80 px-1 py-0.5 text-[10px] font-semibold text-white rounded text-center truncate">
                                {preset.name}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Custom URL Input fallback */}
                      <input
                        type="url"
                        value={customImageUrl}
                        onChange={(e) => {
                          setCustomImageUrl(e.target.value);
                          if (e.target.value) setCustomUploadedImage(null);
                        }}
                        placeholder="Or enter custom image URL: https://..."
                        className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {/* Country & Server Codes Builder (Essential Feature) */}
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                          <Globe className="w-4 h-4 text-amber-400" />
                          Country & Server Map Codes (Separated by Server) *
                        </h3>
                        <p className="text-xs text-slate-400">
                          Add the specific Craftland codes for Bangladesh, India, Indonesia, Pakistan, Global, etc.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddServerRow}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-semibold cursor-pointer transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add Country/Server
                      </button>
                    </div>

                    <div className="space-y-2.5 pt-1">
                      {serverCodes.map((sc, index) => (
                        <div
                          key={sc.id}
                          className="grid grid-cols-1 sm:grid-cols-12 gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 items-center"
                        >
                          {/* Server Preset dropdown */}
                          <div className="sm:col-span-3">
                            <select
                              value={sc.serverName}
                              onChange={(e) => handleServerPresetSelect(index, e.target.value)}
                              className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                            >
                              {SERVER_PRESETS.map((p) => (
                                <option key={p.name} value={p.name}>
                                  {p.flag} {p.name} ({p.code})
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Map Code Input */}
                          <div className="sm:col-span-5">
                            <input
                              type="text"
                              required
                              value={sc.code}
                              onChange={(e) => {
                                const updated = [...serverCodes];
                                updated[index].code = e.target.value;
                                setServerCodes(updated);
                              }}
                              placeholder="#FREEFIRE... Code"
                              className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono font-bold text-amber-300 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                            />
                          </div>

                          {/* Optional Note */}
                          <div className="sm:col-span-3">
                            <input
                              type="text"
                              value={sc.notes}
                              onChange={(e) => {
                                const updated = [...serverCodes];
                                updated[index].notes = e.target.value;
                                setServerCodes(updated);
                              }}
                              placeholder="Notes (e.g. Scrims)"
                              className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                            />
                          </div>

                          {/* Delete row */}
                          <div className="sm:col-span-1 flex justify-end">
                            <button
                              type="button"
                              onClick={() => handleRemoveServerRow(sc.id)}
                              className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                              title="Remove server"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Description & Features */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1.5">
                        Description & Lore *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Detailed overview of map layout, weapons provided, play style..."
                        className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1.5">
                          Features (1 per line)
                        </label>
                        <textarea
                          rows={3}
                          value={featuresInput}
                          onChange={(e) => setFeaturesInput(e.target.value)}
                          placeholder="Infinite Gloo Walls&#10;Zero Fall Damage&#10;Fast Reload"
                          className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1.5">
                          Game Rules (1 per line)
                        </label>
                        <textarea
                          rows={3}
                          value={rulesInput}
                          onChange={(e) => setRulesInput(e.target.value)}
                          placeholder="120 seconds round&#10;No spawn camping"
                          className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1.5">
                        Tags (comma separated)
                      </label>
                      <input
                        type="text"
                        value={tagsInput}
                        onChange={(e) => setTagsInput(e.target.value)}
                        placeholder="1v1, UnlimitedGloo, FastSwitch, BDServer"
                        className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="featuredMap"
                        checked={isFeatured}
                        onChange={(e) => setIsFeatured(e.target.checked)}
                        className="rounded border-slate-800 text-amber-500 focus:ring-amber-500 w-4 h-4 cursor-pointer"
                      />
                      <label htmlFor="featuredMap" className="text-xs font-semibold text-slate-300 cursor-pointer">
                        Mark as Featured / Hot Map (highlight on homepage)
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end pt-3 border-t border-slate-800">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/20 cursor-pointer flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      {editingMap ? 'Update Map Post' : 'Publish Map Post'}
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 2: MANAGE EXISTING MAPS */}
              {activeTab === 'manage' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      Total Published Maps: <strong className="text-white">{maps.length}</strong>
                    </span>
                    <button
                      onClick={() => {
                        setEditingMap(null);
                        setActiveTab('upload');
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      New Map
                    </button>
                  </div>

                  <div className="divide-y divide-slate-800 border border-slate-800 rounded-2xl bg-slate-950 overflow-hidden">
                    {maps.map((map) => (
                      <div
                        key={map.id}
                        className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-900/60 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={map.imageUrl}
                            alt={map.title}
                            className="w-16 h-10 object-cover rounded-lg shrink-0 border border-slate-800"
                          />
                          <div className="min-w-0">
                            <h4 className="text-sm font-bold text-white truncate">{map.title}</h4>
                            <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                              <span>{map.category}</span>
                              <span>·</span>
                              <span>{map.serverCodes.length} Server Codes</span>
                              <span>·</span>
                              <span className="tabular-nums">{map.likes} likes</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                          <button
                            onClick={() => {
                              setEditingMap(map);
                              setActiveTab('upload');
                            }}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5 text-amber-400" />
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete map "${map.title}"?`)) {
                                onDeleteMap(map.id);
                              }
                            }}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-semibold transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: SETTINGS & BACKUP */}
              {activeTab === 'settings' && (
                <div className="space-y-6 max-w-lg">
                  {/* Change Password */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Lock className="w-4 h-4 text-amber-400" />
                      Change Admin Password
                    </h3>
                    <p className="text-xs text-slate-400">
                      Update the password required to open the Crafter Sajjad admin panel.
                    </p>

                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="password"
                        autoComplete="new-password"
                        value={newPassword}
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                          setPasswordSuccess(false);
                        }}
                        placeholder="••••••••••••"
                        className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 font-mono tracking-widest"
                      />
                      <button
                        onClick={() => {
                          if (newPassword.trim().length >= 4) {
                            onChangePassword(newPassword.trim());
                            setPasswordSuccess(true);
                            setNewPassword('');
                            setTimeout(() => setPasswordSuccess(false), 2500);
                          } else {
                            alert('Password must be at least 4 characters.');
                          }
                        }}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                      >
                        Update
                      </button>
                    </div>

                    {passwordSuccess && (
                      <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Admin password updated!
                      </p>
                    )}
                  </div>

                  {/* Export & Reset */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Download className="w-4 h-4 text-amber-400" />
                      Backup & Reset Data
                    </h3>
                    <p className="text-xs text-slate-400">
                      Export your map database to a JSON file or restore default initial maps.
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1">
                      <button
                        onClick={handleExportJSON}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 text-amber-400" />
                        Export Maps as JSON
                      </button>

                      <button
                        onClick={() => {
                          if (confirm('Reset all maps back to initial default database? Custom uploaded maps will be replaced.')) {
                            onResetToDefault();
                            alert('Database restored to original default maps.');
                          }
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Reset to Default Maps
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
