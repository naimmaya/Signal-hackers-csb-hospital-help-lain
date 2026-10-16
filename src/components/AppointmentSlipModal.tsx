import React, { useState } from 'react';
import { X, Calendar, User, Phone, CheckCircle2, Printer, Stethoscope, Hospital as HospitalIcon } from 'lucide-react';
import { HOSPITALS_DATA } from '../data/hospitalsData';

interface AppointmentSlipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppointmentSlipModal: React.FC<AppointmentSlipModalProps> = ({ isOpen, onClose }) => {
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [selectedHospital, setSelectedHospital] = useState('মাদারগঞ্জ ৫০ শয্যা উপজেলা স্বাস্থ্য কমপ্লেক্স (সরকারি প্রধান হাসপাতাল)');
  const [department, setDepartment] = useState('মেডিসিন বিভাগ');
  const [appointmentDate, setAppointmentDate] = useState('2026-10-16');
  const [symptom, setSymptom] = useState('');
  const [generatedSlip, setGeneratedSlip] = useState<any>(null);

  if (!isOpen) return null;

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !patientPhone) return;

    const tokenNo = `CSB-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedSlip({
      tokenNo,
      patientName,
      patientAge,
      patientPhone,
      selectedHospital,
      department,
      appointmentDate,
      symptom: symptom || 'সাধারণ পরামর্শ ও স্বাস্থ্য পরীক্ষা',
      issuedAt: new Date().toLocaleTimeString(),
    });
  };

  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-teal-700" />
            <h3 className="text-base font-bold text-slate-900">
              ডিজিটাল ওপিডি সিরিয়াল স্লিপ জেনারেটর
            </h3>
          </div>
          <button
            onClick={() => {
              setGeneratedSlip(null);
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto text-xs text-slate-700">
          {!generatedSlip ? (
            <form onSubmit={handleGenerate} className="space-y-3.5">
              <p className="text-slate-500 mb-2">
                মাদারগঞ্জ উপজেলা স্বাস্থ্য কমপ্লেক্স বা যেকোনো হাসপাতালে ডাক্তার দেখানোর সিরিয়াল স্লিপ তৈরি করুন।
              </p>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">রোগীর পূর্ণ নাম *</label>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="যেমন: মো. রফিকুল ইসলাম"
                  className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">বয়স *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={120}
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    placeholder="যেমন: ৩৫"
                    className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 font-mono focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">মোবাইল নম্বর *</label>
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="01712-XXXXXX"
                    className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 font-mono focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">কাঙ্ক্ষিত হাসপাতাল *</label>
                <select
                  value={selectedHospital}
                  onChange={(e) => setSelectedHospital(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 font-medium focus:ring-2 focus:ring-teal-500"
                >
                  {HOSPITALS_DATA.slice(0, 15).map((h) => (
                    <option key={h.id} value={h.nameBn}>
                      {h.nameBn} ({h.upazila})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">বিভাগ *</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="মেডিসিন বিভাগ">মেডিসিন বিভাগ</option>
                    <option value="গাইনি ও প্রসূতি">গাইনি ও প্রসূতি</option>
                    <option value="শিশু রোগ বিভাগ">শিশু রোগ বিভাগ</option>
                    <option value="জেনারেল সার্জারি">জেনারেল সার্জারি</option>
                    <option value="অর্থোপেডিক্স ও ট্রমা">অর্থোপেডিক্স ও ট্রমা</option>
                    <option value="চক্ষু বিভাগ">চক্ষু বিভাগ</option>
                    <option value="ডেন্টাল ইউনিট">ডেন্টাল ইউনিট</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">তারিখ *</label>
                  <input
                    type="date"
                    required
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 font-mono focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">প্রধান সমস্যা বা লক্ষণ</label>
                <textarea
                  rows={2}
                  value={symptom}
                  onChange={(e) => setSymptom(e.target.value)}
                  placeholder="যেমন: ৩ দিন ধরে তীব্র জ্বর ও পেটে ব্যথা..."
                  className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-bold text-xs shadow-xs transition-colors"
              >
                ডিজিটাল সিরিয়াল টোকেন তৈরি করুন
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              {/* Generated Slip Display */}
              <div className="p-5 border-2 border-dashed border-teal-600 bg-teal-50/40 rounded-xl space-y-3">
                <div className="flex items-center justify-between border-b border-teal-200 pb-2">
                  <div>
                    <div className="text-[10px] text-teal-800 font-bold tracking-wider uppercase">
                      SIGNAL HACKERS CSB HELPLINE
                    </div>
                    <div className="text-sm font-bold text-slate-900">ডাক্তার সিরিয়াল টোকেন</div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500">টোকেন নং:</span>
                    <div className="text-base font-bold text-teal-800 font-mono">{generatedSlip.tokenNo}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500 block">রোগীর নাম:</span>
                    <strong className="text-slate-900">{generatedSlip.patientName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">বয়স:</span>
                    <strong className="text-slate-900">{generatedSlip.patientAge} বছর</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">হাসপাতাল:</span>
                    <strong className="text-slate-900 line-clamp-1">{generatedSlip.selectedHospital}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">বিভাগ:</span>
                    <strong className="text-teal-800">{generatedSlip.department}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">তারিখ:</span>
                    <strong className="text-slate-900 font-mono">{generatedSlip.appointmentDate}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">মোবাইল:</span>
                    <strong className="text-slate-900 font-mono">{generatedSlip.patientPhone}</strong>
                  </div>
                </div>

                <div className="text-[11px] text-slate-600 pt-2 border-t border-teal-100">
                  <strong>সমস্যা:</strong> {generatedSlip.symptom}
                </div>

                <div className="text-[10px] text-slate-400 text-center pt-1">
                  এই টোকেনটি হাসপাতালের বহির্বিভাগে প্রদর্শন করে সরাসরি সেবা গ্রহণ করুন।
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setGeneratedSlip(null)}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100"
                >
                  নতুন টোকেন
                </button>

                <button
                  type="button"
                  onClick={handlePrintSlip}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-bold flex items-center gap-1.5 shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>স্লিপ প্রিন্ট করুন</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
