import React, { useState, useEffect } from 'react';
import {
  BloodDonor,
  BloodGroup,
  BLOOD_GROUPS,
  INITIAL_BLOOD_DONORS,
  getDonationEligibility,
} from '../data/bloodData';
import { UPAZILAS, UpazilaName } from '../data/hospitalsData';
import {
  Heart,
  Phone,
  MessageSquare,
  UserPlus,
  Filter,
  CheckCircle,
  AlertCircle,
  Calendar,
  Shield,
  Droplet,
  MapPin,
  Clock,
} from 'lucide-react';

export const BloodDonorNetwork: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<string>('সব গ্রুপ');
  const [selectedUpazila, setSelectedUpazila] = useState<string>('সব উপজেলা');
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(true);
  const [donors, setDonors] = useState<BloodDonor[]>([]);
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);

  // Form states
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formGroup, setFormGroup] = useState<BloodGroup>('O+');
  const [formUpazila, setFormUpazila] = useState<UpazilaName>('জামালপুর সদর');
  const [formArea, setFormArea] = useState('');
  const [formLastDate, setFormLastDate] = useState('2026-06-01');
  const [formTotal, setFormTotal] = useState(1);
  const [formNotes, setFormNotes] = useState('');
  const [registeredSuccess, setRegisteredSuccess] = useState(false);

  // Load donors from localStorage or initial list
  useEffect(() => {
    try {
      const saved = localStorage.getItem('jamalpur_blood_donors');
      if (saved) {
        setDonors(JSON.parse(saved));
      } else {
        setDonors(INITIAL_BLOOD_DONORS);
      }
    } catch {
      setDonors(INITIAL_BLOOD_DONORS);
    }
  }, []);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone) return;

    const newDonor: BloodDonor = {
      id: `donor-${Date.now()}`,
      name: formName,
      phone: formPhone,
      bloodGroup: formGroup,
      upazila: formUpazila,
      areaBn: formArea || `${formUpazila} সদর`,
      lastDonationDate: formLastDate,
      totalDonations: Number(formTotal) || 1,
      isAvailable: true,
      notesBn: formNotes || 'স্বেচ্ছাসেবী রক্তদাতা। জরুরি প্রয়োজনে যোগাযোগ করতে পারেন।',
    };

    const updated = [newDonor, ...donors];
    setDonors(updated);
    try {
      localStorage.setItem('jamalpur_blood_donors', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    setRegisteredSuccess(true);
    setTimeout(() => {
      setRegisteredSuccess(false);
      setShowRegisterModal(false);
      // Reset form
      setFormName('');
      setFormPhone('');
      setFormArea('');
      setFormNotes('');
    }, 1800);
  };

  const filteredDonors = donors.filter((donor) => {
    const matchGroup = selectedGroup === 'সব গ্রুপ' || donor.bloodGroup === selectedGroup;
    const matchUpazila = selectedUpazila === 'সব উপজেলা' || donor.upazila === selectedUpazila;
    const eligibility = getDonationEligibility(donor.lastDonationDate);
    const matchAvailable = !onlyAvailable || eligibility.isEligible;
    return matchGroup && matchUpazila && matchAvailable;
  });

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-red-200 text-xs font-semibold uppercase tracking-wider mb-2">
            <Heart className="w-4 h-4 fill-red-200 text-red-200" />
            <span>জামালপুর জেলা ও উপজেলা ভিত্তিক রক্তদাতা নেটওয়ার্ক</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            জরুরি রক্তের প্রয়োজনে সরাসরি রক্তদাতার সাথে যোগাযোগ
          </h2>
          <p className="text-sm text-red-100 leading-relaxed">
            ফেসবুকে পোস্ট করে ঘণ্টার পর ঘণ্টা অপেক্ষা করার বদলে সরাসরি নিকটস্থ স্বেচ্ছাসেবী রক্তদাতার মোবাইল নম্বরে কল বা মেসেজ দিন।
            ৯০ দিনের ব্যবধান যাচাই করে রক্তদানের উপযুক্ত ডোনারদের তালিকা প্রদর্শন করা হচ্ছে।
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={() => setShowRegisterModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-red-700 hover:bg-red-50 rounded-lg text-xs font-bold shadow-xs transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              <span>রক্তদাতা হিসেবে যুক্ত হোন (Volunteer Sign-up)</span>
            </button>
            <div className="inline-flex items-center gap-2 px-3 py-2 bg-red-800/60 rounded-lg text-xs text-red-100 font-medium">
              <span>মোট নিবন্ধিত ডোনার: <strong className="text-white font-mono">{donors.length} জন</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Controls (as specified in user prompt image) */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
        {/* Blood Group Filter Bar */}
        <div>
          <div className="text-xs font-bold text-slate-700 mb-2 flex items-center justify-between">
            <span>রক্তের গ্রুপ নির্বাচন করুন:</span>
            <span className="text-[11px] text-slate-400 font-normal">যেকোনো গ্রুপ ক্লিক করুন</span>
          </div>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            <button
              onClick={() => setSelectedGroup('সব গ্রুপ')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                selectedGroup === 'সব গ্রুপ'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              সব গ্রুপ ({donors.length})
            </button>
            {BLOOD_GROUPS.map((group) => {
              const count = donors.filter((d) => d.bloodGroup === group).length;
              return (
                <button
                  key={group}
                  onClick={() => setSelectedGroup(group)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 ${
                    selectedGroup === group
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Droplet className="w-3 h-3 fill-current opacity-80" />
                  <span>{group}</span>
                  <span className="text-[10px] opacity-75 font-mono">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Upazila & Availability Toggle */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-slate-600">উপজেলা ফিল্টার:</span>
            <select
              value={selectedUpazila}
              onChange={(e) => setSelectedUpazila(e.target.value)}
              className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="সব উপজেলা">জামালপুর জেলার সব উপজেলা</option>
              {UPAZILAS.map((upazila) => (
                <option key={upazila} value={upazila}>
                  {upazila}
                </option>
              ))}
            </select>
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 select-none">
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
              className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
            />
            <span>শুধুমাত্র রক্তদানে প্রস্তুত ডোনারগণ (৯০ দিন পূর্ণ)</span>
          </label>
        </div>
      </div>

      {/* Donors List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDonors.map((donor) => {
          const eligibility = getDonationEligibility(donor.lastDonationDate);
          return (
            <div
              key={donor.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-red-200 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header: Blood Group Icon & Availability */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 border border-red-100 flex items-center justify-center font-bold text-lg font-mono">
                      {donor.bloodGroup}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 leading-tight">
                        {donor.name}
                      </h3>
                      <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{donor.upazila} · {donor.areaBn}</span>
                      </div>
                    </div>
                  </div>

                  {/* 90 Days Eligibility Status */}
                  <div className="text-right">
                    {eligibility.isEligible ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        <span>রক্তদানে প্রস্তুত</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                        <Clock className="w-3 h-3 text-amber-600" />
                        <span>বিশ্রামকালীন</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Donation History Details */}
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-xs text-slate-600 space-y-1 mb-3">
                  <div className="flex justify-between">
                    <span>শেষ রক্তদানের তারিখ:</span>
                    <span className="font-mono font-medium text-slate-800">{donor.lastDonationDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>স্ট্যাটাস বিবরণ:</span>
                    <span className="font-medium text-slate-700">{eligibility.statusSubBn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>মোট রক্তদান:</span>
                    <span className="font-semibold text-red-700 font-mono">{donor.totalDonations} বার</span>
                  </div>
                </div>

                {donor.notesBn && (
                  <p className="text-xs text-slate-500 italic mb-2 line-clamp-2">
                    &ldquo;{donor.notesBn}&rdquo;
                  </p>
                )}
              </div>

              {/* Action Buttons: Direct Call & SMS (as in screenshot) */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <a
                  href={`tel:${donor.phone}`}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>সরাসরি কল ({donor.phone})</span>
                </a>

                <a
                  href={`sms:${donor.phone}?body=আসসালামু আলাইকুম। জামালপুরে একজন রোগীর জন্য জরুরি ${donor.bloodGroup} রক্তের প্রয়োজন। আপনি কি রক্তদান করতে পারবেন?`}
                  className="p-2 text-slate-600 hover:text-red-700 hover:bg-red-50 border border-slate-200 rounded-lg transition-colors"
                  title="এসএমএস পাঠান"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {filteredDonors.length === 0 && (
        <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-slate-500">
          নির্বাচিত গ্রুপের কোনো ডোনার এই মুহূর্তে পাওয়া যায়নি।
          জামালপুর রেড ক্রিসেন্ট ব্লাড সেন্টারে যোগাযোগ করুন: <a href="tel:01718223344" className="underline font-bold text-red-600">০১৭১৮-২২৩৩৪৪</a>
        </div>
      )}

      {/* Volunteer Registration Modal */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2 text-red-600">
                <Heart className="w-5 h-5 fill-red-600" />
                <h3 className="text-lg font-bold text-slate-900">রক্তদাতা নিবন্ধন ফর্ম</h3>
              </div>
              <button
                onClick={() => setShowRegisterModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            {registeredSuccess ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-slate-900">নিবন্ধন সফল হয়েছে!</h4>
                <p className="text-xs text-slate-600">
                  মানবতার সেবায় এগিয়ে আসার জন্য আপনাকে ধন্যবাদ। আপনার তথ্য তালিকায় যুক্ত হয়েছে।
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">আপনার পূর্ণ নাম *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="যেমন: মো. আরিফুল ইসলাম"
                    className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">রক্তের গ্রুপ *</label>
                    <select
                      value={formGroup}
                      onChange={(e) => setFormGroup(e.target.value as BloodGroup)}
                      className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      {BLOOD_GROUPS.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">মোবাইল নম্বর *</label>
                    <input
                      type="tel"
                      required
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="01712-XXXXXX"
                      className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">উপজেলা *</label>
                    <select
                      value={formUpazila}
                      onChange={(e) => setFormUpazila(e.target.value as UpazilaName)}
                      className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      {UPAZILAS.map((u) => (
                        <option key={u} value={u}>{u}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">এলাকা / মহল্লা</label>
                    <input
                      type="text"
                      value={formArea}
                      onChange={(e) => setFormArea(e.target.value)}
                      placeholder="যেমন: বকুলতলা, সদর"
                      className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">সর্বশেষ রক্তদানের তারিখ</label>
                    <input
                      type="date"
                      value={formLastDate}
                      onChange={(e) => setFormLastDate(e.target.value)}
                      className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">মোট কতবার রক্ত দিয়েছেন?</label>
                    <input
                      type="number"
                      min={0}
                      value={formTotal}
                      onChange={(e) => setFormTotal(Number(e.target.value))}
                      className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">অতিরিক্ত নোট / বার্তা</label>
                  <textarea
                    rows={2}
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value)}
                    placeholder="যেমন: সদর হাসপাতালের কাছে থাকি, জরুরি প্রয়োজনে দ্রুত যেতে পারব।"
                    className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowRegisterModal(false)}
                    className="px-4 py-2 border border-slate-200 rounded-lg font-medium text-slate-600 hover:bg-slate-100"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold shadow-xs"
                  >
                    নিবন্ধন সম্পূর্ণ করুন
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
