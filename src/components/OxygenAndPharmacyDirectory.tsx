import React, { useState } from 'react';
import { OXYGEN_PHARMACY_SUPPLIERS, OxygenPharmacySupplier } from '../data/doctorsAndSuppliesData';
import { Wind, Pill, Phone, MapPin, Truck, CheckCircle2, AlertCircle } from 'lucide-react';

export const OxygenAndPharmacyDirectory: React.FC = () => {
  const [filterType, setFilterType] = useState<string>('সকল');
  const [filterUpazila, setFilterUpazila] = useState<string>('সকল উপজেলা');

  const filtered = OXYGEN_PHARMACY_SUPPLIERS.filter((item) => {
    const matchType = filterType === 'সকল' || item.type.includes(filterType);
    const matchUpazila = filterUpazila === 'সকল উপজেলা' || item.upazila === filterUpazila;
    return matchType && matchUpazila;
  });

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-teal-950 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Wind className="w-4 h-4" />
            <span>জরুরি অক্সিজেন সিলিন্ডার ও ২৪/৭ ফার্মেসি নেটওয়ার্ক</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            অক্সিজেন রিফিল, সিলিন্ডার সরবরাহ ও জরুরি মেডিসিন
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            শ্বাসকষ্ট, নিউমোনিয়া বা জরুরি রোগীর জন্য তাৎক্ষণিক অক্সিজেন সিলিন্ডার সরবরাহকারী এবং গভীর রাতেও ওষুধ পাওয়ার নিশ্চিত ঠিকানা।
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {['সকল', 'অক্সিজেন', 'ফার্মেসি'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filterType === t
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t === 'সকল' ? 'সকল সেবা' : t === 'অক্সিজেন' ? 'অক্সিজেন সিলিন্ডার' : '২৪/৭ মডেল ফার্মেসি'}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 font-medium">উপজেলা:</span>
          <select
            value={filterUpazila}
            onChange={(e) => setFilterUpazila(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 text-xs font-medium"
          >
            <option value="সকল উপজেলা">সকল উপজেলা</option>
            <option value="মাদারগঞ্জ">মাদারগঞ্জ থানা</option>
            <option value="জামালপুর সদর">জামালপুর সদর</option>
          </select>
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="font-semibold text-blue-800">{item.upazila}</span>
                <span className="px-2 py-0.5 bg-blue-50 text-blue-800 rounded text-[11px] font-semibold">
                  {item.type}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-1 leading-snug">
                {item.name}
              </h3>

              <div className="space-y-1.5 bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs text-slate-700 mb-4">
                <div className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                  <span>{item.addressBn}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>
                    হোম ডেলিভারি:{' '}
                    <strong className={item.homeDelivery ? 'text-emerald-700' : 'text-slate-600'}>
                      {item.homeDelivery ? 'হ্যাঁ, ২৪ ঘণ্টা উপলব্ধ' : 'দোকান থেকে সংগ্রহ'}
                    </strong>
                  </span>
                </div>
                <div className="text-[11px] text-slate-600 pt-1 border-t border-slate-200/60">
                  সিলিন্ডার / সুবিধা: {item.cylinderSizes}
                </div>
                <div className="text-[11px] text-slate-500 italic">
                  &ldquo;{item.notesBn}&rdquo;
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <span className="text-[11px] text-slate-500">জরুরি যোগাযোগ:</span>
              <a
                href={`tel:${item.phone}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>সরাসরি কল ({item.phone})</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency Guidance */}
      <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 text-xs text-blue-900 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">অক্সিজেন ব্যবহারের নিরাপত্তা সতর্কতা:</span>
          <p className="mt-0.5">
            সিলিন্ডার ব্যবহারের সময় ফায়ার ও আগুনের উৎস থেকে দূরে রাখুন। ফ্লো-মিটার দিয়ে ডাক্তারের পরামর্শ অনুযায়ী প্রতি মিনিটে নির্দিষ্ট লিটার (LPM) অক্সিজেন সরবরাহ করুন।
          </p>
        </div>
      </div>
    </div>
  );
};
