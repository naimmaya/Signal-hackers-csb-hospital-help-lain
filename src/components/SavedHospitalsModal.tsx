import React from 'react';
import { Hospital } from '../data/hospitalsData';
import { X, Bookmark, Phone, Navigation, Trash2, ExternalLink } from 'lucide-react';

interface SavedHospitalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedHospitals: Hospital[];
  onRemoveSave: (id: string) => void;
  onSelectHospital: (h: Hospital) => void;
}

export const SavedHospitalsModal: React.FC<SavedHospitalsModalProps> = ({
  isOpen,
  onClose,
  savedHospitals,
  onRemoveSave,
  onSelectHospital,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-slate-100">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-teal-600 fill-teal-100" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              সংরক্ষিত হাসপাতাল সমূহ ({savedHospitals.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-full"
            aria-label="বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-5 overflow-y-auto space-y-3">
          {savedHospitals.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-xs">
              <Bookmark className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p>আপনার কোনো সংরক্ষিত হাসপাতাল নেই।</p>
              <p className="mt-1 text-slate-400">
                যেকোনো হাসপাতালের কার্ডে বুকমার্ক আইকনে ক্লিক করে সংরক্ষণ করুন।
              </p>
            </div>
          ) : (
            savedHospitals.map((hospital) => (
              <div
                key={hospital.id}
                className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 flex items-center justify-between gap-3 text-xs"
              >
                <div className="min-w-0">
                  <div className="text-[11px] text-teal-800 font-semibold mb-0.5">
                    {hospital.upazila}
                  </div>
                  <h4
                    onClick={() => {
                      onClose();
                      onSelectHospital(hospital);
                    }}
                    className="font-bold text-slate-900 truncate hover:text-teal-700 cursor-pointer"
                  >
                    {hospital.nameBn}
                  </h4>
                  <div className="text-slate-500 truncate text-[11px] mt-0.5">
                    হটলাইন: <span className="font-mono">{hospital.hotline}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <a
                    href={`tel:${hospital.hotline}`}
                    className="p-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
                    title="সরাসরি কল দিন"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={hospital.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg transition-colors"
                    title="গুগল ম্যাপে যান"
                  >
                    <Navigation className="w-3.5 h-3.5 text-blue-600" />
                  </a>

                  <button
                    onClick={() => onRemoveSave(hospital.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="তালিকা থেকে মুছুন"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200/80 rounded-lg"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
