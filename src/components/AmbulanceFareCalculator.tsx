import React, { useState } from 'react';
import { Calculator, MapPin, ArrowRight, Clock, ShieldCheck, DollarSign } from 'lucide-react';

interface RouteOption {
  id: string;
  from: string;
  to: string;
  distanceKm: number;
  durationText: string;
  govtAmbulanceFee: string;
  privateAcFee: string;
  notes: string;
}

const POPULAR_ROUTES: RouteOption[] = [
  {
    id: 'r1',
    from: 'মাদারগঞ্জ বালিজুড়ী বাজার',
    to: 'জামালপুর ২৫০ শয্যা জেনারেল হাসপাতাল (সদর)',
    distanceKm: 29,
    durationText: '৪৫ - ৫৫ মিনিট',
    govtAmbulanceFee: '৮০০ - ১,০০০ টাকা',
    privateAcFee: '১,৫০০ - ১,৮০০ টাকা',
    notes: 'মাদারগঞ্জ-জামালপুর পাকা সড়ক হয়ে সরাসরি বকুলতলা মোড়।',
  },
  {
    id: 'r2',
    from: 'মাদারগঞ্জ (উপজেলা সদর)',
    to: 'শেখ হাসিনা মেডিকেল কলেজ, রাণাগাছা',
    distanceKm: 38,
    durationText: '১ ঘণ্টা ১০ মিনিট',
    govtAmbulanceFee: '১,১০০ - ১,৩০০ টাকা',
    privateAcFee: '২,০০০ - ২,৪০০ টাকা',
    notes: 'জামালপুর বাইপাস হয়ে রাণাগাছা মহাসড়ক।',
  },
  {
    id: 'r3',
    from: 'মাদারগঞ্জ / জামালপুর সদর',
    to: 'ময়মনসিংহ মেডিকেল কলেজ হাসপাতাল (MMCH)',
    distanceKm: 85,
    durationText: '২ ঘণ্টা থেকে ২ ঘণ্টা ২০ মিনিট',
    govtAmbulanceFee: '২,৫০০ - ৩,০০০ টাকা',
    privateAcFee: '৪,৫০০ - ৫,৫০০ টাকা',
    notes: 'জামালপুর-মুক্তাগাছা-ময়মনসিংহ হাইওয়ে। গুরুতর রেফারেল রোগীদের জন্য প্রধান রুট।',
  },
  {
    id: 'r4',
    from: 'মাদারগঞ্জ / জামালপুর সদর',
    to: 'ঢাকা মেডিকেল কলেজ হাসপাতাল (DMCH) / পিজি',
    distanceKm: 180,
    durationText: '৪ ঘণ্টা থেকে ৪ ঘণ্টা ৩০ মিনিট',
    govtAmbulanceFee: '৫,৫০০ - ৬,৫০০ টাকা',
    privateAcFee: '৮,৫০০ - ১০,৫০০ টাকা',
    notes: 'অক্সিজেন লাইন সমৃদ্ধ এসি অ্যাম্বুলেন্সে যাতায়াত সবচেয়ে নিরাপদ।',
  },
  {
    id: 'r5',
    from: 'গুণারিতলা / সিধুলী (মাদারগঞ্জ)',
    to: 'মাদারগঞ্জ ৫০ শয্যা স্বাস্থ্য কমপ্লেক্স',
    distanceKm: 8,
    durationText: '১৫ - ২০ মিনিট',
    govtAmbulanceFee: '৩০০ - ৪০০ টাকা',
    privateAcFee: '৫০০ - ৭০০ টাকা',
    notes: 'লোকাল রোগী আনা-নেওয়ার জন্য দ্রুততম ব্যবস্থা।',
  },
];

export const AmbulanceFareCalculator: React.FC = () => {
  const [selectedRouteId, setSelectedRouteId] = useState<string>('r1');

  const selectedRoute = POPULAR_ROUTES.find((r) => r.id === selectedRouteId) || POPULAR_ROUTES[0];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
      <div className="flex items-center gap-2 text-teal-800 text-xs font-bold uppercase tracking-wider">
        <Calculator className="w-4 h-4 text-teal-600" />
        <span>অ্যাম্বুলেন্স ন্যায্য ভাড়া ও দূরত্ব ক্যালকুলেটর (Fair Fare Estimator)</span>
      </div>

      <div className="max-w-2xl">
        <h3 className="text-xl font-bold text-slate-900 mb-1">
          মাদারগঞ্জ ও জামালপুর থেকে হাসপাতাল রোগী পরিবহন আনুমানিক ভাড়া
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          রোগীর স্বজনরা যেন কোনো মধ্যস্বত্বভোগী বা দালালের অতিরিক্ত ভাড়ার ফাঁদে না পড়েন, সেজন্য সরকারি নির্ধারিত ও সাধারণ ভাড়ার নির্ভরযোগ্য তালিকা।
        </p>
      </div>

      {/* Route Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {POPULAR_ROUTES.map((route) => (
          <button
            key={route.id}
            onClick={() => setSelectedRouteId(route.id)}
            className={`p-3 rounded-xl text-left border transition-all text-xs flex flex-col justify-between ${
              selectedRouteId === route.id
                ? 'border-teal-600 bg-teal-50/70 shadow-xs'
                : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
            }`}
          >
            <div className="font-bold text-slate-900 mb-1 line-clamp-1">{route.to}</div>
            <div className="text-slate-500 flex items-center gap-1 text-[11px]">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span>{route.from} থেকে</span>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Route Breakdown Card */}
      <div className="p-5 bg-gradient-to-br from-slate-900 to-teal-950 text-white rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="space-y-0.5">
            <span className="text-[11px] text-teal-300 font-semibold uppercase">নির্বাচিত রুট:</span>
            <div className="text-base font-bold flex items-center gap-2 flex-wrap">
              <span>{selectedRoute.from}</span>
              <ArrowRight className="w-4 h-4 text-teal-400 shrink-0" />
              <span className="text-teal-200">{selectedRoute.to}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="bg-slate-800/80 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-teal-400" />
              <span>দূরত্ব: <strong>{selectedRoute.distanceKm} কিমি</strong></span>
            </div>
            <div className="bg-slate-800/80 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-teal-400" />
              <span>আনুমানিক সময়: <strong>{selectedRoute.durationText}</strong></span>
            </div>
          </div>
        </div>

        {/* Fare Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/80">
            <div className="text-xs text-slate-300 font-medium mb-1">সরকারি অ্যাম্বুলেন্স নির্ধারিত ভাড়া</div>
            <div className="text-xl font-bold text-emerald-400 font-mono">
              {selectedRoute.govtAmbulanceFee}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              হাসপাতালের ডিউটি রুম বা সরকারি চালকের অফিসিয়াল রিসিট সহ।
            </p>
          </div>

          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/80">
            <div className="text-xs text-slate-300 font-medium mb-1">প্রাইভেট এসি অ্যাম্বুলেন্স সাধারণ ভাড়া</div>
            <div className="text-xl font-bold text-amber-300 font-mono">
              {selectedRoute.privateAcFee}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              অক্সিজেন সাপোর্ট ও এয়ার কন্ডিশন সুবিধা সহ নির্ধারিত গড় রেট।
            </p>
          </div>
        </div>

        <div className="text-xs text-slate-300 pt-2 border-t border-slate-800 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
          <span>পরামর্শ: {selectedRoute.notes} অ্যাম্বুলেন্স ডাকার আগে অক্সিজেন প্রস্তুত আছে কি না ড্রাইভারের সাথে নিশ্চিত হয়ে নিন।</span>
        </div>
      </div>
    </div>
  );
};
