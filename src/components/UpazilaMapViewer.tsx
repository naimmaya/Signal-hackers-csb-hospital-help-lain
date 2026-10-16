import React from 'react';
import { UPAZILAS, UPAZILA_DIRECTORY, UpazilaName, HOSPITALS_DATA } from '../data/hospitalsData';
import { MapPin, Phone, Hospital as HospitalIcon, Navigation, ArrowRight } from 'lucide-react';

interface UpazilaMapViewerProps {
  onSelectUpazila: (upazila: UpazilaName) => void;
}

export const UpazilaMapViewer: React.FC<UpazilaMapViewerProps> = ({ onSelectUpazila }) => {
  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <MapPin className="w-4 h-4" />
            <span>ভৌগোলিক অবস্থান ও উপজেলা স্বাস্থ্য গাইড</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            জামালপুর জেলার ৭টি উপজেলার স্বাস্থ্য ব্যবস্থা
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            জামালপুর জেলা সদর থেকে প্রতিটি উপজেলার দূরত্ব, স্বাস্থ্য কমপ্লেক্সের অবস্থান এবং জরুরি যোগাযোগের ডিরেক্টরি।
            যেকোনো উপজেলায় ক্লিক করে সেখানকার হাসপাতালগুলোর পূর্ণাঙ্গ তালিকা ও যোগাযোগ নম্বর দেখুন।
          </p>
        </div>
      </div>

      {/* Interactive Upazila Geographic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {UPAZILAS.map((upazila) => {
          const stats = UPAZILA_DIRECTORY[upazila];
          const hospitalList = HOSPITALS_DATA.filter((h) => h.upazila === upazila);

          return (
            <div
              key={upazila}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-teal-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-semibold text-teal-800 font-mono">
                    {stats.distanceFromSadarKm === 0
                      ? 'কেন্দ্রীয় জেলা সদর'
                      : `সদর থেকে ${stats.distanceFromSadarKm} কিমি`}
                  </span>
                  <span className="px-2 py-0.5 bg-teal-50 text-teal-800 rounded text-[11px] font-semibold">
                    {hospitalList.length} টি চিকিৎসাকেন্দ্র
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  {stats.nameBn}
                </h3>
                <span className="text-xs text-slate-400 font-sans block mb-3">
                  {stats.nameEn} Upazila
                </span>

                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  {stats.description}
                </p>

                {/* Key hospitals list */}
                <div className="space-y-1.5 pt-3 border-t border-slate-100 text-xs">
                  <div className="text-[11px] font-bold text-slate-700">প্রধান স্বাস্থ্যকেন্দ্রসমূহ:</div>
                  {hospitalList.map((h) => (
                    <div key={h.id} className="flex items-center gap-1.5 text-slate-600 truncate">
                      <HospitalIcon className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span className="truncate">{h.nameBn}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between gap-2">
                <a
                  href={`tel:${stats.emergencyHotline}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-teal-800"
                >
                  <Phone className="w-3.5 h-3.5 text-teal-600" />
                  <span className="font-mono tabular-nums">{stats.emergencyHotline}</span>
                </a>

                <button
                  onClick={() => onSelectUpazila(upazila)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
                >
                  <span>হাসপাতাল দেখুন</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Emergency Administrative Contacts */}
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
        <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
          <Phone className="w-4 h-4 text-teal-700" />
          <span>জামালপুর জেলা স্বাস্থ্য প্রশাসন জরুরি যোগাযোগ</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs text-slate-700">
          <div className="bg-white p-3 rounded-lg border border-slate-200/80">
            <div className="font-semibold text-slate-900">সিভিল সার্জন কার্যালয়, জামালপুর</div>
            <div className="text-slate-500 mt-0.5">অফিস: ০৯৮১-৬৩২২২</div>
            <div className="text-teal-700 font-bold mt-1">হটলাইন: ০১৭১২-৪৫৬৭৮৯</div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200/80">
            <div className="font-semibold text-slate-900">জামালপুর ফায়ার সার্ভিস ও সিভিল ডিফেন্স</div>
            <div className="text-slate-500 mt-0.5">জরুরি উদ্ধার ও অগ্নিনির্বাপণ</div>
            <div className="text-red-700 font-bold mt-1">হটলাইন: ০১৭৩০-০০২৪৫৮</div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200/80">
            <div className="font-semibold text-slate-900">জামালপুর জেলা পুলিশ কন্ট্রোল রুম</div>
            <div className="text-slate-500 mt-0.5">আইন-শৃঙ্খলা ও সড়ক দুর্ঘটনা সহায়তা</div>
            <div className="text-blue-700 font-bold mt-1">হটলাইন: ০১৩২০-১০২১০০</div>
          </div>
        </div>
      </div>
    </div>
  );
};
