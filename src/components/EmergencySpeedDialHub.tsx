import React, { useState } from 'react';
import { PhoneCall, X, Ambulance, Heart, ShieldAlert, Navigation, Copy, Check } from 'lucide-react';

export const EmergencySpeedDialHub: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedCoords, setCopiedCoords] = useState(false);

  const handleCopyLocation = () => {
    navigator.clipboard.writeText('অবস্থান: মাদারগঞ্জ / জামালপুর জেলা, বাংলাদেশ');
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2000);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Expanded Emergency Drawer */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border-2 border-red-500 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-200 animate-bounce" />
              <div>
                <h4 className="font-bold text-sm leading-tight">SOS জরুরি হটলাইন হাব</h4>
                <p className="text-[11px] text-red-100">তাৎক্ষণিক ১-ট্যাপে সরাসরি কল করুন</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 space-y-2.5 text-xs">
            {/* 999 */}
            <a
              href="tel:999"
              className="flex items-center justify-between p-2.5 bg-red-50 hover:bg-red-100 rounded-xl border border-red-200 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-600 text-white font-bold flex items-center justify-center text-sm font-mono">
                  999
                </div>
                <div>
                  <div className="font-bold text-slate-900">জাতীয় জরুরি কল ৯৯৯</div>
                  <div className="text-[11px] text-slate-500">পুলিশ, অ্যাম্বুলেন্স, ফায়ার সার্ভিস</div>
                </div>
              </div>
              <span className="font-bold text-red-700">কল দিন →</span>
            </a>

            {/* Madarganj Hospital */}
            <a
              href="tel:01730324860"
              className="flex items-center justify-between p-2.5 bg-teal-50 hover:bg-teal-100 rounded-xl border border-teal-200 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-700 text-white font-bold flex items-center justify-center text-xs">
                  মা
                </div>
                <div>
                  <div className="font-bold text-slate-900">মাদারগঞ্জ স্বাস্থ্য কমপ্লেক্স ইমার্জেন্সি</div>
                  <div className="text-[11px] text-teal-800 font-mono">০১৭৩০-৩২৪৮৬০</div>
                </div>
              </div>
              <span className="font-bold text-teal-800">কল দিন →</span>
            </a>

            {/* Ambulance */}
            <a
              href="tel:01730324861"
              className="flex items-center justify-between p-2.5 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                  <Ambulance className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">মাদারগঞ্জ সরকারি অ্যাম্বুলেন্স</div>
                  <div className="text-[11px] text-emerald-800 font-mono">০১৭৩০-৩২৪৮৬১</div>
                </div>
              </div>
              <span className="font-bold text-emerald-800">কল দিন →</span>
            </a>

            {/* Sadar Hospital ER */}
            <a
              href="tel:01730324810"
              className="flex items-center justify-between p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-slate-800 text-white font-bold flex items-center justify-center text-xs">
                  সদর
                </div>
                <div>
                  <div className="font-bold text-slate-900">জামালপুর ২৫০ শয্যা সদর হাসপাতাল</div>
                  <div className="text-[11px] text-slate-600 font-mono">০১৭৩০-৩২৪৮১০</div>
                </div>
              </div>
              <span className="font-bold text-slate-700">কল দিন →</span>
            </a>

            {/* Blood Bank */}
            <a
              href="tel:01718223344"
              className="flex items-center justify-between p-2.5 bg-rose-50 hover:bg-rose-100 rounded-xl border border-rose-200 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center">
                  <Heart className="w-4 h-4 fill-white" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">রেড ক্রিসেন্ট ব্লাড সেন্টার</div>
                  <div className="text-[11px] text-rose-800 font-mono">০১৭১৮-২২৩৩৪৪</div>
                </div>
              </div>
              <span className="font-bold text-rose-800">কল দিন →</span>
            </a>

            {/* Location Share prompt */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <Navigation className="w-3.5 h-3.5 text-teal-600" />
                <span>মাদারগঞ্জ ও জামালপুর জেলা</span>
              </span>
              <button
                onClick={handleCopyLocation}
                className="text-teal-700 font-semibold hover:underline flex items-center gap-0.5"
              >
                {copiedCoords ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedCoords ? 'কপি হয়েছে' : 'অবস্থান কপি'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main SOS Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95 group ring-4 ring-red-400/30"
        aria-label="জরুরি SOS হেল্পলাইন"
      >
        <PhoneCall className="w-5 h-5 animate-pulse text-white" />
        <span className="text-xs font-extrabold tracking-wide uppercase">
          {isOpen ? 'বন্ধ করুন' : 'জরুরি SOS কল'}
        </span>
      </button>
    </div>
  );
};
