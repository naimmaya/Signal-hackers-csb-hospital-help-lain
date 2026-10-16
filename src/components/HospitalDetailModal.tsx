import React, { useState } from 'react';
import { Hospital } from '../data/hospitalsData';
import {
  X,
  Phone,
  MapPin,
  Navigation,
  Clock,
  Shield,
  Ambulance,
  CheckCircle2,
  Copy,
  Check,
  Share2,
  Activity,
  Bed,
} from 'lucide-react';

interface HospitalDetailModalProps {
  hospital: Hospital | null;
  onClose: () => void;
}

export const HospitalDetailModal: React.FC<HospitalDetailModalProps> = ({ hospital, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!hospital) return null;

  const handleCopy = () => {
    const text = `${hospital.nameBn}\nঠিকানা: ${hospital.addressBn}\nল্যান্ডমার্ক: ${hospital.landmarkBn || 'N/A'}\nজরুরি হটলাইন: ${hospital.hotline}\nঅ্যাম্বুলেন্স: ${hospital.ambulancePhone}`;
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
        return 'উপজেলা স্বাস্থ্য কমপ্লেক্স (সরকারি)';
      case 'private':
        return 'বেসরকারি ক্লিনিক ও হাসপাতাল';
      case 'specialized':
        return 'বিশেষায়িত চিকিৎসা কেন্দ্র';
      default:
        return 'হাসপাতাল';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-slate-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span className="font-semibold text-teal-800">{hospital.upazila}</span>
              <span aria-hidden="true">·</span>
              <span>{getTypeLabel(hospital.type)}</span>
              {hospital.established && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>স্থাপিত: {hospital.established}</span>
                </>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              {hospital.nameBn}
            </h2>
            <p className="text-xs text-slate-500 font-sans mt-0.5">{hospital.nameEn}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors shrink-0"
            aria-label="বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
          {/* Quick Action Dial Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-teal-50/60 rounded-xl border border-teal-100">
            <div>
              <div className="text-[11px] font-semibold text-teal-900 mb-1">জরুরি হটলাইন (২৪ ঘণ্টা)</div>
              <a
                href={`tel:${hospital.hotline}`}
                className="inline-flex items-center gap-2 text-base font-bold text-teal-800 hover:text-teal-950"
              >
                <Phone className="w-4 h-4 text-teal-700" />
                <span className="font-mono tabular-nums">{hospital.hotline}</span>
              </a>
              {hospital.altPhone && (
                <div className="text-xs text-slate-600 mt-1">
                  বিকল্প ফোন: <a href={`tel:${hospital.altPhone}`} className="underline font-mono">{hospital.altPhone}</a>
                </div>
              )}
            </div>

            <div>
              <div className="text-[11px] font-semibold text-teal-900 mb-1">জরুরি অ্যাম্বুলেন্স ডেস্ক</div>
              <a
                href={`tel:${hospital.ambulancePhone}`}
                className="inline-flex items-center gap-2 text-base font-bold text-emerald-800 hover:text-emerald-950"
              >
                <Ambulance className="w-4 h-4 text-emerald-700" />
                <span className="font-mono tabular-nums">{hospital.ambulancePhone}</span>
              </a>
              <div className="text-xs text-slate-500 mt-1">অন-কল বা হাসপাতালে অবস্থানরত অ্যাম্বুলেন্স</div>
            </div>
          </div>

          {/* Location & Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-rose-600" />
              <span>অবস্থান ও যাতায়াত নির্দেশিকা</span>
            </h4>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2">
              <div className="text-slate-800 font-medium">{hospital.addressBn}</div>
              <div className="text-xs text-slate-500">{hospital.addressEn}</div>
              {hospital.landmarkBn && (
                <div className="text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-slate-100">
                  <span className="font-semibold text-slate-700">ল্যান্ডমার্ক / চেনার সহজ উপায়:</span> {hospital.landmarkBn}
                </div>
              )}
              <div className="pt-2 flex flex-wrap gap-2">
                <a
                  href={hospital.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>গুগল ম্যাপসে লাইভ ডিরেকশন</span>
                </a>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-medium transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'কপি হয়েছে!' : 'ঠিকানা ও ফোন কপি করুন'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Notes / Description */}
          {hospital.notesBn && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70 text-xs leading-relaxed text-slate-700">
              <span className="font-semibold text-slate-900">হাসপাতাল সম্পর্কে: </span>
              {hospital.notesBn}
            </div>
          )}

          {/* Key Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-[11px] text-slate-500 flex items-center gap-1 mb-1">
                <Bed className="w-3.5 h-3.5 text-teal-700" />
                <span>মোট শয্যা সংখ্যা</span>
              </div>
              <div className="text-base font-bold text-slate-900 font-mono tabular-nums">
                {hospital.bedCount} টি শয্যা
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-[11px] text-slate-500 flex items-center gap-1 mb-1">
                <Clock className="w-3.5 h-3.5 text-teal-700" />
                <span>কার্যসময়</span>
              </div>
              <div className="text-xs font-semibold text-slate-900">
                {hospital.emergencyAvailable ? '২৪ ঘণ্টা জরুরি খোলা' : 'সাধারণ সময়সূচী'}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 col-span-2 sm:col-span-1">
              <div className="text-[11px] text-slate-500 flex items-center gap-1 mb-1">
                <Shield className="w-3.5 h-3.5 text-teal-700" />
                <span>উপজেলা কভারেজ</span>
              </div>
              <div className="text-xs font-semibold text-slate-900">
                {hospital.upazila}
              </div>
            </div>
          </div>

          {/* Available Departments */}
          {hospital.departments.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-teal-700" />
                <span>ডাক্তার ও চিকিৎসা বিভাগসমূহ ({hospital.departments.length})</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {hospital.departments.map((dept, idx) => (
                  <div
                    key={idx}
                    className="p-2 bg-slate-50 rounded-lg text-xs font-medium text-slate-700 border border-slate-100 flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span className="truncate">{dept}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Facilities Available */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
              উপলব্ধ সুবিধাসমূহ ও টেস্ট
            </h4>
            <div className="flex flex-wrap gap-2">
              {hospital.facilities.map((fac, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs rounded-md"
                >
                  {fac}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
          <span className="text-xs text-slate-500">জামালপুর জেলা স্বাস্থ্য সেবা নেটওয়ার্ক</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>শেয়ার</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-900 rounded-lg transition-colors"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
