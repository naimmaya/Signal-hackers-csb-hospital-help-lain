import React, { useState } from 'react';
import { LIVE_BED_STATUSES, HospitalLiveBedStatus } from '../data/diagnosticAndBedsData';
import { Bed, Activity, Phone, Clock, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';

export const LiveBedStatusTracker: React.FC = () => {
  const [selectedUpazila, setSelectedUpazila] = useState<string>('সকল');
  const [lastRefreshed, setLastRefreshed] = useState<string>('সদ্য হালনাগাদ');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastRefreshed('এইমাত্র যাচাইকৃত');
    }, 600);
  };

  const filtered = LIVE_BED_STATUSES.filter(
    (item) => selectedUpazila === 'সকল' || item.upazila === selectedUpazila
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-teal-800 text-xs font-bold uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>লাইভ শয্যা ও আইসিইউ প্রাপ্যতা মনিটর (Live Bed & ICU Status)</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            হাসপাতালে রোগী ভর্তির পূর্বেই খালি শয্যার তথ্য জানুন
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            মাদারগঞ্জ ও জামালপুরের প্রধান সরকারি ও জেনারেল হাসপাতালের সাধারণ বেড, কেবিন ও আইসিইউ প্রাপ্যতা।
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-teal-600' : ''}`} />
            <span>রিফ্রেশ ({lastRefreshed})</span>
          </button>
        </div>
      </div>

      {/* Upazila Filter */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3 text-xs">
        <span className="font-semibold text-slate-600">এলাকা:</span>
        {['সকল', 'মাদারগঞ্জ', 'জামালপুর সদর'].map((u) => (
          <button
            key={u}
            onClick={() => setSelectedUpazila(u)}
            className={`px-3 py-1 rounded-md transition-colors ${
              selectedUpazila === u
                ? 'bg-teal-700 text-white font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {u}
          </button>
        ))}
      </div>

      {/* Bed Status Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => {
          const genAvailablePct = Math.round((item.generalBedsAvailable / item.generalBedsTotal) * 100);

          return (
            <div
              key={item.hospitalId}
              className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-3 flex flex-col justify-between hover:border-teal-300 transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-teal-800">{item.upazila}</span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{item.lastUpdated}</span>
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 leading-snug mb-3">
                  {item.hospitalName}
                </h4>

                {/* Bed metrics */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs mb-3">
                  <div className="bg-white p-2 rounded-lg border border-slate-200/80">
                    <div className="text-[10px] text-slate-500 font-medium">সাধারণ বেড</div>
                    <div className="text-base font-bold text-emerald-700 font-mono mt-0.5">
                      {item.generalBedsAvailable}
                      <span className="text-xs text-slate-400 font-normal font-sans">/{item.generalBedsTotal}</span>
                    </div>
                  </div>

                  <div className="bg-white p-2 rounded-lg border border-slate-200/80">
                    <div className="text-[10px] text-slate-500 font-medium">কেবিন</div>
                    <div className="text-base font-bold text-blue-700 font-mono mt-0.5">
                      {item.cabinAvailable}
                      <span className="text-xs text-slate-400 font-normal font-sans">/{item.cabinTotal}</span>
                    </div>
                  </div>

                  <div className="bg-white p-2 rounded-lg border border-slate-200/80">
                    <div className="text-[10px] text-slate-500 font-medium">আইসিইউ (ICU)</div>
                    <div className="text-base font-bold text-amber-700 font-mono mt-0.5">
                      {item.icuTotal > 0 ? (
                        <>
                          {item.icuAvailable}
                          <span className="text-xs text-slate-400 font-normal font-sans">/{item.icuTotal}</span>
                        </>
                      ) : (
                        <span className="text-xs text-slate-400 font-sans">উপলব্ধ নয়</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Oxygen Status Badge */}
                <div className="flex items-center justify-between text-[11px] text-slate-600 bg-white p-2 rounded-lg border border-slate-200/60">
                  <span>সেন্ট্রাল অক্সিজেন:</span>
                  <span className="font-semibold text-emerald-700">{item.oxygenStatus}</span>
                </div>
              </div>

              {/* Action */}
              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">ভর্তি ও জরুরি ডেস্ক:</span>
                <a
                  href="tel:01730324860"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold transition-colors"
                >
                  <Phone className="w-3 h-3" />
                  <span>কল দিয়ে নিশ্চিত হোন</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
