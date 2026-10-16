import React from 'react';
import { X, Printer, Phone, MapPin, ShieldCheck, Heart } from 'lucide-react';

interface PrintEmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrintEmergencyModal: React.FC<PrintEmergencyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-teal-700" />
            <h3 className="text-base font-bold text-slate-900">
              জরুরি হেল্পলাইন নম্বর শিট (প্রিন্ট ফ্রেন্ডলি)
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>প্রিন্ট করুন</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Paper Area */}
        <div className="p-6 overflow-y-auto text-slate-900 space-y-5 text-xs print:p-0">
          <div className="text-center pb-4 border-b border-slate-300">
            <h2 className="text-lg font-bold text-slate-900">
              Signal Hackers CSB — জরুরি হাসপাতাল ও স্বাস্থ্য হেল্পলাইন
            </h2>
            <p className="text-xs text-slate-600">
              মাদারগঞ্জ থানা ও জামালপুর জেলা জরুরি চিকিৎসাসেবা দ্রুত যোগাযোগ তালিকা
            </p>
          </div>

          {/* Section: National & District Emergency */}
          <div>
            <div className="font-bold text-xs bg-slate-100 p-1.5 rounded mb-2 text-slate-800">
              ১. জাতীয় ও জেলা প্রশাসন জরুরি সেবা
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 border rounded">
                <span className="font-semibold block">জাতীয় জরুরি সেবা (পুলিশ, অ্যাম্বুলেন্স, ফায়ার):</span>
                <span className="text-red-700 font-bold text-sm font-mono">৯৯৯ (টোল-ফ্রি)</span>
              </div>
              <div className="p-2 border rounded">
                <span className="font-semibold block">সিভিল সার্জন কার্যালয়, জামালপুর:</span>
                <span className="text-teal-800 font-bold font-mono">০৯৮১-৬৩২২২ / ০১৭১২-৪৫৬৭৮৯</span>
              </div>
              <div className="p-2 border rounded">
                <span className="font-semibold block">জামালপুর ফায়ার সার্ভিস:</span>
                <span className="text-red-700 font-bold font-mono">০১৭৩০-০০২৪৫৮</span>
              </div>
              <div className="p-2 border rounded">
                <span className="font-semibold block">স্বাস্থ্য বাতায়ন (ডাক্তারের সাথে কথা বলুন):</span>
                <span className="text-teal-800 font-bold text-sm font-mono">১৬২৬৩</span>
              </div>
            </div>
          </div>

          {/* Section: Madarganj Thana Hospitals */}
          <div>
            <div className="font-bold text-xs bg-teal-50 p-1.5 rounded mb-2 text-teal-900">
              ২. মাদারগঞ্জ থানার হাসপাতাল ও সরকারি স্বাস্থ্যকেন্দ্র
            </div>
            <table className="w-full text-left border-collapse border border-slate-200">
              <thead>
                <tr className="bg-slate-50 text-[11px]">
                  <th className="p-2 border">হাসপাতালের নাম</th>
                  <th className="p-2 border">অবস্থান / এলাকা</th>
                  <th className="p-2 border">জরুরি ফোন নম্বর</th>
                </tr>
              </thead>
              <tbody className="text-[11px]">
                <tr>
                  <td className="p-1.5 border font-semibold">মাদারগঞ্জ ৫০ শয্যা স্বাস্থ্য কমপ্লেক্স (সরকারি)</td>
                  <td className="p-1.5 border">বালিজুড়ী বাজার মোড়</td>
                  <td className="p-1.5 border font-mono font-bold text-teal-800">০১৭৩০-৩২৪৮৬০</td>
                </tr>
                <tr>
                  <td className="p-1.5 border font-semibold">মাদারগঞ্জ সরকারি অ্যাম্বুলেন্স</td>
                  <td className="p-1.5 border">স্বাস্থ্য কমপ্লেক্স চত্বর</td>
                  <td className="p-1.5 border font-mono font-bold text-emerald-800">০১৭৩০-৩২৪৮৬১</td>
                </tr>
                <tr>
                  <td className="p-1.5 border">মা ও শিশু কল্যাণ কেন্দ্র (MCWC)</td>
                  <td className="p-1.5 border">বালিজুড়ী, মাদারগঞ্জ</td>
                  <td className="p-1.5 border font-mono">০১৭১২-৮৮৭৭১১</td>
                </tr>
                <tr>
                  <td className="p-1.5 border">গুণারিতলা সরকারি ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র</td>
                  <td className="p-1.5 border">গুণারিতলা বাজার</td>
                  <td className="p-1.5 border font-mono">০১৭২৫-৬৬৭৭৮৮</td>
                </tr>
                <tr>
                  <td className="p-1.5 border">সিধুলী সরকারি ইউনিয়ন স্বাস্থ্য কেন্দ্র</td>
                  <td className="p-1.5 border">সিধুলী বাজার</td>
                  <td className="p-1.5 border font-mono">০১৭৩৩-৪৪৫৫৬৬</td>
                </tr>
                <tr>
                  <td className="p-1.5 border">বালিজুড়ী আল-মদিনা জেনারেল হাসপাতাল</td>
                  <td className="p-1.5 border">বালিজুড়ী প্রধান সড়ক</td>
                  <td className="p-1.5 border font-mono font-bold text-teal-800">০১৭১৭-৫৫৬৬৭৭</td>
                </tr>
                <tr>
                  <td className="p-1.5 border">মাদারগঞ্জ সেন্ট্রাল হাসপাতাল ও ট্রমা সেন্টার</td>
                  <td className="p-1.5 border">কলেজ মোড়, বালিজুড়ী</td>
                  <td className="p-1.5 border font-mono">০১৭১১-৪৪৩৩২২</td>
                </tr>
                <tr>
                  <td className="p-1.5 border">মাদারগঞ্জ জরুরি অক্সিজেন সরবরাহ</td>
                  <td className="p-1.5 border">বালিজুড়ী বাজার</td>
                  <td className="p-1.5 border font-mono font-bold text-blue-800">০১৭১৭-৫৫৬৬৭৯</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section: Jamalpur Sadar Major Hospitals */}
          <div>
            <div className="font-bold text-xs bg-slate-100 p-1.5 rounded mb-2 text-slate-800">
              ৩. জামালপুর সদর ও প্রধান রেফারেল হাসপাতাল
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 border rounded">
                <span className="font-semibold block">জামালপুর ২৫০ শয্যা জেনারেল হাসপাতাল (সদর):</span>
                <span className="text-teal-800 font-bold font-mono">০১৭৩০-৩২৪৮১০</span>
              </div>
              <div className="p-2 border rounded">
                <span className="font-semibold block">শেখ হাসিনা মেডিকেল কলেজ ও হাসপাতাল:</span>
                <span className="text-teal-800 font-bold font-mono">০১৭৬৯-৯২৩৪৫০</span>
              </div>
              <div className="p-2 border rounded">
                <span className="font-semibold block">রেড ক্রিসেন্ট ব্লাড সেন্টার (রক্তের প্রয়োজনে):</span>
                <span className="text-red-700 font-bold font-mono">০১৭১৮-২২৩৩৪৪</span>
              </div>
              <div className="p-2 border rounded">
                <span className="font-semibold block">জামালপুর ডায়াবেটিক সমিতি ও হাসপাতাল:</span>
                <span className="text-slate-800 font-bold font-mono">০১৭২০-৬৫৪৩২১</span>
              </div>
            </div>
          </div>

          <div className="text-[10px] text-slate-500 text-center pt-3 border-t">
            জরুরি প্রয়োজনে এই শিটটি সংরক্ষণ করুন এবং বাসা বা প্রতিষ্ঠানের দেয়ালে ঝুলিয়ে রাখুন।
          </div>
        </div>
      </div>
    </div>
  );
};
