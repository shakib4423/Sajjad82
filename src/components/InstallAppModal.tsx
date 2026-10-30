import React, { useState, useEffect } from 'react';
import { X, Smartphone, Download, Check, ExternalLink, ShieldCheck, Sparkles, Layers } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({ isOpen, onClose }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setInstallSuccess(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  if (!isOpen) return null;

  const handleNativeInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setInstallSuccess(true);
      }
      setDeferredPrompt(null);
    } else {
      alert(
        'Android ইনস্টলেশন:\nআপনার ক্রোম ব্রাউজারের উপরে ৩-ডট (⋮) মেনুতে ট্যাপ করুন এবং "Add to Home screen" বা "Install app" এ ক্লিক করুন।'
      );
    }
  };

  const currentUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const pwaBuilderUrl = `https://www.pwabuilder.com?site=${encodeURIComponent(currentUrl)}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-amber-500/30 shadow-md shrink-0">
              <img
                src="/assets/aistudio/channels4_profile_851e70b0.jpg"
                alt="Crafter Sajjad Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Android অ্যাপ / APK ইনস্টলেশন (Crafter Sajjad)
              </h3>
              <p className="text-xs text-slate-400">
                Install as Native Android App on your Mobile Phone
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 text-xs sm:text-sm">
          {/* Explanation in Bengali */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 space-y-1.5 text-xs">
            <p className="font-bold flex items-center gap-1.5 text-white">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              অ্যান্ড্রয়েড ফোনে সরাসরি ব্যবহারের সেরা ২টি উপায়:
            </p>
            <p className="text-slate-300 leading-relaxed">
              Google AI Studio ওয়েব ক্লাউডে সরাসরি কোনো ব্রোকেন বা ভুয়া APK তৈরি না করে, এই অ্যাপটিকে পূর্ণাঙ্গ <strong>PWA (Progressive Web App)</strong> হিসেবে তৈরি করা হয়েছে। এতে কোনো ভারী APK ফাইল ছাড়াই সরাসরি ফোনে আসল অ্যাপের মতো ইনস্টল করা যায়!
            </p>
          </div>

          {/* Option 1: 1-Click Direct Install (PWA) */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
                  পদ্ধতি ১ (সবচেয়ে সহজ ও দ্রুত - কোনো ডাউনলোড লাগবে না)
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  ১-ক্লিকে ফোনে ইনস্টল করুন (Direct Install)
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  ফোনের হোম স্ক্রিনে Free Fire Craftland এর আইকন তৈরি হবে এবং কোনো ব্রাউজার বার ছাড়াই ফুল-স্ক্রিনে চলবে।
                </p>
              </div>
            </div>

            <button
              onClick={handleNativeInstall}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <Smartphone className="w-4 h-4" />
              <span>{isInstalled || installSuccess ? 'ইতিমধ্যে ইনস্টল করা হয়েছে' : 'ফোনে অ্যাপ ইনস্টল করুন (Install Now)'}</span>
            </button>
          </div>

          {/* Option 2: 1-Click Generate Signed APK via PWABuilder */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 block mb-1">
                  পদ্ধতি ২ (অফিসিয়াল APK ফাইল ডাউনলোড)
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  PWABuilder দিয়ে সরাসরি APK ডাউনলোড করুন
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Microsoft এবং Google এর অফিসিয়াল ফ্রি টুল <strong>PWABuilder</strong> এর মাধ্যমে এই সাইটের লাইভ URL দিয়ে সরাসরি সাইন করা Android APK ও AAB ফাইল ডাউনলোড করতে পারেন।
                </p>
              </div>
            </div>

            <a
              href={pwaBuilderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer border border-slate-700"
            >
              <Download className="w-4 h-4 text-sky-400" />
              <span>PWABuilder এ APK তৈরি করুন (Free APK Download)</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
          </div>

          {/* Manual Chrome instructions */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 space-y-1">
            <div className="font-semibold text-slate-300">ক্রোম ব্রাউজার থেকে ম্যানুয়াল ইনস্টলেশন:</div>
            <div>১. মোবাইলে ক্রোম (Chrome) ব্রাউজারের উপরের ৩-ডট মেনুতে যান।</div>
            <div>২. <strong>&quot;Install app&quot;</strong> বা <strong>&quot;Add to Home screen&quot;</strong> বাটনে চাপ দিন।</div>
            <div>৩. অ্যাপটি অন্যান্য সব সাধারণ গেম বা অ্যাপের মতো হোম স্ক্রিনে চালু হবে।</div>
          </div>
        </div>
      </div>
    </div>
  );
};
