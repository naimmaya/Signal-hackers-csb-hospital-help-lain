import React from 'react';
import { PhoneCall, Heart, Bookmark, Ambulance, Stethoscope, Wind, Printer } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  savedCount: number;
  onOpenSaved: () => void;
  bloodRequestCount: number;
  onOpenPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  onOpenSaved,
  bloodRequestCount,
  onOpenPrint,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Emergency Strip */}
      <div className="bg-gradient-to-r from-red-600 via-rose-700 to-teal-900 text-white text-xs py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-wide">জরুরি হেল্পলাইন:</span>
            <span className="opacity-95">জাতীয় জরুরি ৯৯৯</span>
            <span aria-hidden="true" className="opacity-60">·</span>
            <span className="opacity-95">
              মাদারগঞ্জ স্বাস্থ্য কমপ্লেক্স: <a href="tel:01730324860" className="underline font-bold hover:text-amber-200">০১৭৩০-৩২৪৮৬০</a>
            </span>
            <span aria-hidden="true" className="opacity-60">·</span>
            <span className="opacity-95">
              জামালপুর সদর ইমার্জেন্সি: <a href="tel:01730324810" className="underline hover:text-amber-200">০১৭৩০-৩২৪৮১০</a>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenPrint}
              className="text-[11px] bg-white/20 hover:bg-white/30 text-white px-2.5 py-0.5 rounded flex items-center gap-1 transition-colors"
            >
              <Printer className="w-3 h-3" />
              <span>হেল্পলাইন শিট প্রিন্ট</span>
            </button>
            <span className="text-[11px] bg-black/25 px-2 py-0.5 rounded text-white font-medium">২৪ ঘণ্টা উন্মুক্ত</span>
          </div>
        </div>
      </div>

      {/* Main Navigation: 3-Zone Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Wordmark - Signal Hackers CSB Hospital Helpline */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('hospitals')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-teal-600 to-slate-900 text-white flex items-center justify-center font-bold text-sm tracking-wider shadow-sm group-hover:from-teal-700 group-hover:to-black transition-all">
              CSB
            </div>
            <div>
              <span className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 block leading-tight">
                Signal Hackers CSB
              </span>
              <span className="text-[11px] text-teal-800 font-semibold hidden sm:block">
                হাসপাতাল হেল্পলাইন (মাদারগঞ্জ ও জামালপুর)
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links (single line) */}
        <nav className="hidden xl:flex items-center gap-5 text-xs font-semibold text-slate-600">
          <button
            onClick={() => setActiveTab('hospitals')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'hospitals'
                ? 'text-teal-700 font-bold border-b-2 border-teal-600'
                : 'hover:text-slate-900'
            }`}
          >
            হাসপাতাল নির্দেশিকা
          </button>

          <button
            onClick={() => setActiveTab('doctors')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1 ${
              activeTab === 'doctors'
                ? 'text-teal-700 font-bold border-b-2 border-teal-600'
                : 'hover:text-slate-900'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5 text-teal-700" />
            ডাক্তার চেম্বার
          </button>

          <button
            onClick={() => setActiveTab('ambulance')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1 ${
              activeTab === 'ambulance'
                ? 'text-teal-700 font-bold border-b-2 border-teal-600'
                : 'hover:text-slate-900'
            }`}
          >
            <Ambulance className="w-3.5 h-3.5 text-emerald-600" />
            অ্যাম্বুলেন্স
          </button>

          <button
            onClick={() => setActiveTab('oxygen')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1 ${
              activeTab === 'oxygen'
                ? 'text-teal-700 font-bold border-b-2 border-teal-600'
                : 'hover:text-slate-900'
            }`}
          >
            <Wind className="w-3.5 h-3.5 text-blue-600" />
            অক্সিজেন ও ফার্মেসি
          </button>

          <button
            onClick={() => setActiveTab('blood')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1 ${
              activeTab === 'blood'
                ? 'text-teal-700 font-bold border-b-2 border-teal-600'
                : 'hover:text-slate-900'
            }`}
          >
            <Heart className="w-3.5 h-3.5 text-red-600 fill-red-100" />
            রক্তদাতা নেটওয়ার্ক
          </button>

          <button
            onClick={() => setActiveTab('blood-requests')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1 ${
              activeTab === 'blood-requests'
                ? 'text-teal-700 font-bold border-b-2 border-teal-600'
                : 'hover:text-slate-900'
            }`}
          >
            রক্তের আবেদন
            {bloodRequestCount > 0 && (
              <span className="w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {bloodRequestCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('upazila-guide')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              activeTab === 'upazila-guide'
                ? 'text-teal-700 font-bold border-b-2 border-teal-600'
                : 'hover:text-slate-900'
            }`}
          >
            উপজেলা গাইড
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenSaved}
            className="p-2 text-slate-600 hover:text-teal-700 hover:bg-slate-100 rounded-lg relative transition-colors"
            title="সংরক্ষিত হাসপাতাল সমূহ"
            aria-label="সংরক্ষিত হাসপাতাল"
          >
            <Bookmark className="w-5 h-5" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-teal-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {savedCount}
              </span>
            )}
          </button>

          <a
            href="tel:999"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>জরুরি ৯৯৯</span>
          </a>
        </div>
      </div>

      {/* Mobile Submenu Bar */}
      <div className="xl:hidden flex items-center justify-between border-t border-slate-100 px-3 py-2 bg-slate-50 overflow-x-auto text-xs font-medium text-slate-700 gap-1.5">
        <button
          onClick={() => setActiveTab('hospitals')}
          className={`px-2.5 py-1.5 rounded whitespace-nowrap shrink-0 ${
            activeTab === 'hospitals' ? 'bg-teal-700 text-white font-bold' : 'bg-white'
          }`}
        >
          হাসপাতাল
        </button>
        <button
          onClick={() => setActiveTab('doctors')}
          className={`px-2.5 py-1.5 rounded whitespace-nowrap shrink-0 ${
            activeTab === 'doctors' ? 'bg-teal-700 text-white font-bold' : 'bg-white'
          }`}
        >
          ডাক্তার চেম্বার
        </button>
        <button
          onClick={() => setActiveTab('ambulance')}
          className={`px-2.5 py-1.5 rounded whitespace-nowrap shrink-0 ${
            activeTab === 'ambulance' ? 'bg-teal-700 text-white font-bold' : 'bg-white'
          }`}
        >
          অ্যাম্বুলেন্স
        </button>
        <button
          onClick={() => setActiveTab('oxygen')}
          className={`px-2.5 py-1.5 rounded whitespace-nowrap shrink-0 ${
            activeTab === 'oxygen' ? 'bg-blue-600 text-white font-bold' : 'bg-white'
          }`}
        >
          অক্সিজেন
        </button>
        <button
          onClick={() => setActiveTab('blood')}
          className={`px-2.5 py-1.5 rounded whitespace-nowrap shrink-0 ${
            activeTab === 'blood' ? 'bg-red-600 text-white font-bold' : 'bg-white'
          }`}
        >
          রক্তদাতা
        </button>
        <button
          onClick={() => setActiveTab('blood-requests')}
          className={`px-2.5 py-1.5 rounded whitespace-nowrap shrink-0 ${
            activeTab === 'blood-requests' ? 'bg-red-600 text-white font-bold' : 'bg-white'
          }`}
        >
          রক্তের আবেদন
        </button>
        <button
          onClick={() => setActiveTab('upazila-guide')}
          className={`px-2.5 py-1.5 rounded whitespace-nowrap shrink-0 ${
            activeTab === 'upazila-guide' ? 'bg-teal-700 text-white font-bold' : 'bg-white'
          }`}
        >
          উপজেলা গাইড
        </button>
      </div>
    </header>
  );
};
