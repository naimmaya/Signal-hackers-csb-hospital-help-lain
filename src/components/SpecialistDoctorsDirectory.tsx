import React, { useState } from 'react';
import { SPECIALIST_DOCTORS, SpecialistDoctor } from '../data/doctorsAndSuppliesData';
import { Stethoscope, Phone, Clock, MapPin, Calendar, Search, Award, DollarSign } from 'lucide-react';

export const SpecialistDoctorsDirectory: React.FC = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('সকল বিশেষজ্ঞ');
  const [selectedUpazila, setSelectedUpazila] = useState<string>('সকল উপজেলা');
  const [searchDoc, setSearchDoc] = useState<string>('');

  const specialties = ['সকল বিশেষজ্ঞ', 'মেডিসিন', 'গাইনি ও প্রসূতি', 'শিশু রোগ', 'সার্জারি', 'অর্থোপেডিক্স', 'হৃদরোগ'];

  const filteredDoctors = SPECIALIST_DOCTORS.filter((doc) => {
    const matchSpecialty = selectedSpecialty === 'সকল বিশেষজ্ঞ' || doc.specialty === selectedSpecialty;
    const matchUpazila = selectedUpazila === 'সকল উপজেলা' || doc.upazila === selectedUpazila;
    const matchSearch =
      !searchDoc.trim() ||
      doc.name.toLowerCase().includes(searchDoc.toLowerCase()) ||
      doc.qualification.toLowerCase().includes(searchDoc.toLowerCase()) ||
      doc.hospitalOrChamber.toLowerCase().includes(searchDoc.toLowerCase());
    return matchSpecialty && matchUpazila && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <Stethoscope className="w-4 h-4" />
            <span>বিশেষজ্ঞ ডাক্তার ও চেম্বার নির্দেশিকা</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            মাদারগঞ্জ ও জামালপুরের বিশেষজ্ঞ ডাক্তারদের সময়সূচী ও সিরিয়াল
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            মাদারগঞ্জ উপজেলা স্বাস্থ্য কমপ্লেক্স এবং জামালপুর সদর ও মেডিকেল কলেজের অভিজ্ঞ কনসালট্যান্টদের চেম্বার,
            বসার দিন, সময় এবং অগ্রিম সিরিয়ালের সরাসরি ফোন নম্বর।
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchDoc}
            onChange={(e) => setSearchDoc(e.target.value)}
            placeholder="ডাক্তারের নাম, ডিগ্রি বা হাসপাতালের নাম দিয়ে খুঁজুন..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Specialty Filter Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap gap-1.5">
            {specialties.map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedSpecialty === spec
                    ? 'bg-teal-700 text-white font-semibold shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">এলাকা:</span>
            <select
              value={selectedUpazila}
              onChange={(e) => setSelectedUpazila(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
            >
              <option value="সকল উপজেলা">সকল উপজেলা</option>
              <option value="মাদারগঞ্জ">মাদারগঞ্জ থানা</option>
              <option value="জামালপুর সদর">জামালপুর সদর</option>
            </select>
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDoctors.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-teal-300 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Top metadata */}
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="font-semibold text-teal-800">{doc.upazila}</span>
                <span className="px-2 py-0.5 bg-teal-50 text-teal-800 rounded text-[11px] font-semibold">
                  {doc.specialty}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 leading-snug mb-1">
                {doc.name}
              </h3>
              <p className="text-xs text-slate-600 font-medium mb-1">{doc.qualification}</p>
              <div className="text-xs text-slate-500 mb-3 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>{doc.designation}</span>
              </div>

              {/* Chamber & Timing Details */}
              <div className="space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs text-slate-700 mb-4">
                <div className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                  <span>
                    চেম্বার: <strong>{doc.hospitalOrChamber}</strong> {doc.roomNo && `(${doc.roomNo})`}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>রোগী দেখার দিন: <strong>{doc.visitingDays}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>সময়সূচী: <strong>{doc.visitingHours}</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-teal-800 font-semibold pt-1 border-t border-slate-200/60">
                  <DollarSign className="w-3.5 h-3.5 shrink-0" />
                  <span>ভিজিট / ফি: {doc.fee}</span>
                </div>
              </div>
            </div>

            {/* Direct Serial Booking Dial */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <span className="text-[11px] text-slate-500">সিরিয়াল বুকিং:</span>
              <a
                href={`tel:${doc.serialPhone}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>সরাসরি সিরিয়াল দিন ({doc.serialPhone})</span>
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-slate-500">
          নির্বাচিত ক্যাটাগরির কোনো ডাক্তার পাওয়া যায়নি। অন্য বিষয় নির্বাচন করুন অথবা মাদারগঞ্জ হাসপাতালের হটলাইনে কল দিন।
        </div>
      )}
    </div>
  );
};
