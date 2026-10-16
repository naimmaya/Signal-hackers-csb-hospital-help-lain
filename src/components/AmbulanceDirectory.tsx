import React, { useState } from 'react';
import { AMBULANCE_SERVICES, AmbulanceService } from '../data/ambulanceData';
import { UPAZILAS, UpazilaName } from '../data/hospitalsData';
import { Ambulance, Phone, MapPin, MessageSquare, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const AmbulanceDirectory: React.FC = () => {
  const [selectedUpazila, setSelectedUpazila] = useState<string>('সব উপজেলা');
  const [selectedType, setSelectedType] = useState<string>('সকল প্রকার');

  const filteredServices = AMBULANCE_SERVICES.filter((service) => {
    const matchUpazila = selectedUpazila === 'সব উপজেলা' || service.upazila === selectedUpazila;
    const matchType = selectedType === 'সকল প্রকার' || service.type.includes(selectedType);
    return matchUpazila && matchType;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner / Guidelines */}
      <div className="bg-emerald-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-emerald-200 text-xs font-semibold uppercase tracking-wider mb-2">
            <Ambulance className="w-4 h-4" />
            <span>জামালপুর জেলা সার্বক্ষণিক অ্যাম্বুলেন্স নেটওয়ার্ক</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            জরুরি অ্যাম্বুলেন্স ও রোগী পরিবহন সেবা
          </h2>
          <p className="text-sm text-emerald-100 leading-relaxed">
            জামালপুর সদর, উপজেলা স্বাস্থ্য কমপ্লেক্স এবং প্রাইভেট এসি/নন-এসি/আইসিইউ অ্যাম্বুলেন্সের সরাসরি যোগাযোগ নম্বর।
            জরুরি অবস্থায় এক ক্লিকেই ড্রাইভার বা কন্ট্রোল রুমে কল দিন।
          </p>

          <div className="mt-4 pt-4 border-t border-emerald-800/80 flex flex-wrap gap-4 text-xs text-emerald-200">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>২৪ ঘণ্টা প্রস্তুত সেবা</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>সেন্ট্রাল অক্সিজেন সমৃদ্ধ ভ্যান</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>ময়মনসিংহ ও ঢাকা মেডিকেল রেফারেল</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Upazila Selector */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-slate-700">উপজেলা নির্বাচন:</span>
          <select
            value={selectedUpazila}
            onChange={(e) => setSelectedUpazila(e.target.value)}
            className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="সব উপজেলা">সব উপজেলা ({AMBULANCE_SERVICES.length})</option>
            {UPAZILAS.map((upazila) => (
              <option key={upazila} value={upazila}>
                {upazila}
              </option>
            ))}
          </select>
        </div>

        {/* Vehicle Type Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {['সকল প্রকার', 'সরকারি', 'এসি', 'নন-এসি', 'আইসিইউ'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedType === type
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Ambulance Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServices.map((amb) => (
          <div
            key={amb.id}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Top metadata */}
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="font-semibold text-emerald-800">{amb.upazila}</span>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] font-medium">
                  {amb.type}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 leading-snug mb-1">
                {amb.name}
              </h3>
              <div className="text-xs text-slate-600 mb-3">
                যোগাযোগ: <span className="font-semibold text-slate-800">{amb.driverOrContact}</span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600 mb-3 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <div className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                  <span>{amb.baseLocationBn}</span>
                </div>
                {amb.vehicleNumber && (
                  <div className="text-[11px] text-slate-500 font-mono pl-5">
                    গাড়ি নং: {amb.vehicleNumber}
                  </div>
                )}
                <div className="text-[11px] text-slate-600 pl-5">
                  {amb.notesBn}
                </div>
              </div>
            </div>

            {/* Direct Contact Action */}
            <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
              <a
                href={`tel:${amb.phone}`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>সরাসরি কল ({amb.phone})</span>
              </a>

              <a
                href={`sms:${amb.phone}?body=জরুরি অ্যাম্বুলেন্স প্রয়োজন। রোগীর অবস্থান:`}
                className="p-2 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200 rounded-lg transition-colors"
                title="এসএমএস পাঠান"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-slate-500">
          এই উপজেলায় নির্বাচিত ক্যাটাগরির কোনো অ্যাম্বুলেন্স পাওয়া যায়নি। সদর অ্যাম্বুলেন্স ডেস্কে কল করুন: ০১৭৩০-৩২৪৮১১
        </div>
      )}

      {/* Ambulance Emergency Tips */}
      <div className="p-4 bg-amber-50 rounded-xl border border-amber-200/80 text-xs text-amber-900 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold">অ্যাম্বুলেন্স বুকিংয়ের জরুরি নির্দেশিকা:</span>
          <p>
            ড্রাইভারকে কল করার সময় স্পষ্ট করে বলুন: রোগীর অবস্থা (অক্সিজেন বা আইসিইউ লাগবে কি না), রোগীর সঠিক বর্তমান অবস্থান, এবং কোন হাসপাতালে নিতে চান।
            কোনো অ্যাম্বুলেন্স না পেলে অবিলম্বে জাতীয় জরুরি সেবা ৯৯৯ এ কল দিন।
          </p>
        </div>
      </div>
    </div>
  );
};
