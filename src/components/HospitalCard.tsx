import React, { useState } from 'react';
import { Hospital } from '../data/hospitalsData';
import { Phone, MapPin, Navigation, Clock, ShieldCheck, Bookmark, ExternalLink, Share2, Check } from 'lucide-react';

interface HospitalCardProps {
  hospital: Hospital;
  onSelect: (hospital: Hospital) => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  isCompared?: boolean;
  onToggleCompare?: (hospital: Hospital) => void;
}

export const HospitalCard: React.FC<HospitalCardProps> = ({
  hospital,
  onSelect,
  isSaved,
  onToggleSave,
  isCompared = false,
  onToggleCompare,
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `${hospital.nameBn}\nঠিকানা: ${hospital.addressBn}\nহটলাইন: ${hospital.hotline}\nম্যাপ: ${hospital.googleMapsUrl}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTypeLabel = (type: Hospital['type']) => {
    switch (type) {
      case 'govt':
        return 'সরকারি জেনারেল হাসপাতাল';
      case 'medical_college':
        return 'সরকারি মেডিকেল কলেজ হাসপাতাল';
      case 'upazila_complex':
        return 'উপজেলা স্বাস্থ্য কমপ্লেক্স';
      case 'private':
        return 'বেসরকারি ক্লিনিক ও হাসপাতাল';
      case 'specialized':
        return 'বিশেষায়িত হাসপাতাল / কেন্দ্র';
      default:
        return 'হাসপাতাল';
    }
  };

  return (
    <div
      className={`bg-white rounded-xl border transition-all flex flex-col justify-between overflow-hidden group shadow-xs hover:shadow-md ${
        isCompared ? 'border-teal-500 ring-2 ring-teal-200' : 'border-slate-200/90 hover:border-teal-200'
      }`}
    >
      <div className="p-5">
        {/* Top Header Row: Clean unboxed metadata with typographic separators */}
        <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-2.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-semibold text-teal-800">{hospital.upazila}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>{getTypeLabel(hospital.type)}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="font-mono tabular-nums">{hospital.bedCount} শয্যা</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleShare}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
              title="ঠিকানা ও ফোন কপি করুন"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => onToggleSave(hospital.id)}
              className={`p-1.5 rounded-md transition-colors ${
                isSaved
                  ? 'text-teal-700 bg-teal-50'
                  : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
              }`}
              title={isSaved ? 'সংরক্ষণ বাতিল করুন' : 'বুকমার্ক করুন'}
              aria-label="বুকমার্ক"
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-teal-700' : ''}`} />
            </button>
          </div>
        </div>

        {/* Title & Verified Badge */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3
            onClick={() => onSelect(hospital)}
            className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-teal-800 transition-colors cursor-pointer leading-snug"
          >
            {hospital.nameBn}
          </h3>
        </div>

        <p className="text-xs text-slate-500 font-sans mb-3 line-clamp-1">
          {hospital.nameEn}
        </p>

        {/* Location & Landmark */}
        <div className="space-y-1.5 text-xs text-slate-600 mb-4">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <span className="line-clamp-2">{hospital.addressBn}</span>
          </div>
          {hospital.landmarkBn && (
            <div className="flex items-center gap-2 text-slate-500 pl-6 text-[11px]">
              <span>নিকটবর্তী: {hospital.landmarkBn}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-slate-500">
            <Clock className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="line-clamp-1">{hospital.operatingHours}</span>
          </div>
        </div>

        {/* Facility highlights */}
        <div className="pt-2 border-t border-slate-100 mb-2">
          <div className="text-[11px] text-slate-500 mb-1.5 font-medium flex items-center justify-between">
            <span>প্রধান সুবিধাসমূহ:</span>
            {hospital.emergencyAvailable && (
              <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-0.5">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>২৪/৭ সক্রিয়</span>
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {hospital.facilities.slice(0, 4).map((facility, i) => (
              <span
                key={i}
                className="text-[11px] px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-center"
              >
                {facility}
              </span>
            ))}
            {hospital.facilities.length > 4 && (
              <span className="text-[11px] px-1.5 py-0.5 text-slate-500 font-mono">
                +{hospital.facilities.length - 4} আরও
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="p-3 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <a
            href={`tel:${hospital.hotline}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-md text-xs font-semibold shadow-xs transition-colors whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>সরাসরি কল</span>
          </a>

          <a
            href={hospital.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-md text-xs font-medium transition-colors whitespace-nowrap"
            title="গুগল ম্যাপে লোকেশন দেখুন"
          >
            <Navigation className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">ম্যাপ</span>
          </a>
        </div>

        <div className="flex items-center gap-2">
          {onToggleCompare && (
            <label className="flex items-center gap-1 text-[11px] text-slate-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isCompared}
                onChange={() => onToggleCompare(hospital)}
                className="rounded text-teal-600 focus:ring-teal-500 w-3.5 h-3.5"
              />
              <span className="hidden md:inline">তুলনা</span>
            </label>
          )}

          <button
            onClick={() => onSelect(hospital)}
            className="text-xs font-semibold text-teal-800 hover:text-teal-950 flex items-center gap-1 transition-colors px-2 py-1"
          >
            <span>পূর্ণ তথ্য</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
