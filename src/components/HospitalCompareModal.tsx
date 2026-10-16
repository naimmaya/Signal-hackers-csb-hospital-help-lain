import React from 'react';
import { Hospital } from '../data/hospitalsData';
import { X, Check, Minus, Phone, MapPin, Navigation, Bed, Shield } from 'lucide-react';

interface HospitalCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  hospitals: Hospital[];
  onSelectHospital: (h: Hospital) => void;
}

export const HospitalCompareModal: React.FC<HospitalCompareModalProps> = ({
  isOpen,
  onClose,
  hospitals,
  onSelectHospital,
}) => {
  if (!isOpen || hospitals.length < 2) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              হাসপাতাল তুলনা (Hospital Comparison)
            </h3>
            <span className="text-xs text-slate-500">
              সুবিধাসমূহ, শয্যা ও যোগাযোগ তথ্য পাশাপাশি তুলনা করে সিদ্ধান্ত নিন
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 overflow-x-auto text-xs">
          <table className="w-full border-collapse border border-slate-200">
            <thead>
              <tr className="bg-slate-50">
                <th className="p-3 border text-left font-bold text-slate-700 w-36">বৈশিষ্ট্য</th>
                {hospitals.map((h) => (
                  <th key={h.id} className="p-3 border text-left font-bold text-slate-900 min-w-[200px]">
                    <div className="text-teal-800 text-[11px] font-semibold">{h.upazila}</div>
                    <div className="text-sm font-bold mt-0.5">{h.nameBn}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3 border font-semibold bg-slate-50/50">ধরন</td>
                {hospitals.map((h) => (
                  <td key={h.id} className="p-3 border">
                    {h.type === 'govt'
                      ? 'সরকারি জেনারেল হাসপাতাল'
                      : h.type === 'medical_college'
                      ? 'সরকারি মেডিকেল কলেজ'
                      : h.type === 'upazila_complex'
                      ? 'উপজেলা স্বাস্থ্য কমপ্লেক্স'
                      : 'বেসরকারি জেনারেল ক্লিনিক'}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 border font-semibold bg-slate-50/50">মোট শয্যা সংখ্যা</td>
                {hospitals.map((h) => (
                  <td key={h.id} className="p-3 border font-mono font-bold text-slate-800">
                    {h.bedCount} টি শয্যা
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 border font-semibold bg-slate-50/50">জরুরি সেবা (ইমার্জেন্সি)</td>
                {hospitals.map((h) => (
                  <td key={h.id} className="p-3 border">
                    {h.emergencyAvailable ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <Check className="w-4 h-4" /> ২৪ ঘণ্টা খোলা
                      </span>
                    ) : (
                      <span className="text-slate-500 flex items-center gap-1">
                        <Minus className="w-4 h-4" /> নিয়মিত সময়
                      </span>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 border font-semibold bg-slate-50/50">আইসিইউ (ICU) সুবিধা</td>
                {hospitals.map((h) => {
                  const hasIcu = h.facilities.some((f) => f.includes('আইসিইউ'));
                  return (
                    <td key={h.id} className="p-3 border">
                      {hasIcu ? (
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <Check className="w-4 h-4" /> উপলব্ধ আছে
                        </span>
                      ) : (
                        <span className="text-slate-400 flex items-center gap-1">
                          <Minus className="w-4 h-4" /> নেই
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className="p-3 border font-semibold bg-slate-50/50">অ্যাম্বুলেন্স সুবিধা</td>
                {hospitals.map((h) => (
                  <td key={h.id} className="p-3 border font-mono">
                    <a href={`tel:${h.ambulancePhone}`} className="text-emerald-700 font-bold hover:underline">
                      {h.ambulancePhone}
                    </a>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 border font-semibold bg-slate-50/50">ঠিকানা ও অবস্থান</td>
                {hospitals.map((h) => (
                  <td key={h.id} className="p-3 border text-slate-600">
                    <div>{h.addressBn}</div>
                    {h.landmarkBn && (
                      <div className="text-[11px] text-slate-400 mt-1">ল্যান্ডমার্ক: {h.landmarkBn}</div>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 border font-semibold bg-slate-50/50">জরুরি কল</td>
                {hospitals.map((h) => (
                  <td key={h.id} className="p-3 border">
                    <a
                      href={`tel:${h.hotline}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-bold"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{h.hotline}</span>
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-lg"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
