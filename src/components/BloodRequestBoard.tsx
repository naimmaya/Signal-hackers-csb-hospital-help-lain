import React, { useState, useEffect } from 'react';
import {
  BloodRequest,
  INITIAL_BLOOD_REQUESTS,
  BloodGroup,
  BLOOD_GROUPS,
} from '../data/bloodData';
import { UPAZILAS, UpazilaName } from '../data/hospitalsData';
import {
  AlertTriangle,
  Phone,
  PlusCircle,
  Clock,
  MapPin,
  CheckCircle2,
  Droplet,
  Share2,
} from 'lucide-react';

export const BloodRequestBoard: React.FC = () => {
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [showPostModal, setShowPostModal] = useState<boolean>(false);

  // Form states
  const [patientName, setPatientName] = useState('');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>('B+');
  const [bagsNeeded, setBagsNeeded] = useState(1);
  const [hospitalName, setHospitalName] = useState('জামালপুর ২৫০ শয্যা জেনারেল হাসপাতাল');
  const [upazila, setUpazila] = useState<UpazilaName>('জামালপুর সদর');
  const [contactPerson, setContactPerson] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [reasonBn, setReasonBn] = useState('');
  const [urgency, setUrgency] = useState<BloodRequest['urgency']>('খুব জরুরি (Immediate)');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('jamalpur_blood_requests');
      if (saved) {
        setRequests(JSON.parse(saved));
      } else {
        setRequests(INITIAL_BLOOD_REQUESTS);
      }
    } catch {
      setRequests(INITIAL_BLOOD_REQUESTS);
    }
  }, []);

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !contactPhone || !hospitalName) return;

    const newRequest: BloodRequest = {
      id: `req-${Date.now()}`,
      patientName,
      bloodGroup,
      bagsNeeded: Number(bagsNeeded) || 1,
      hospitalName,
      upazila,
      contactPerson: contactPerson || 'রোগীর স্বজন',
      contactPhone,
      urgency,
      reasonBn: reasonBn || 'জরুরি চিকিৎসার জন্য রক্তের প্রয়োজন।',
      dateNeeded: 'আজকে জরুরি',
      status: 'সক্রিয় (Active)',
      postedAt: 'এইমাত্র',
    };

    const updated = [newRequest, ...requests];
    setRequests(updated);
    try {
      localStorage.setItem('jamalpur_blood_requests', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    setShowPostModal(false);
    // Reset form
    setPatientName('');
    setContactPerson('');
    setContactPhone('');
    setReasonBn('');
  };

  const handleMarkFulfilled = (id: string) => {
    const updated = requests.map((req) =>
      req.id === id ? { ...req, status: 'রক্তদাতা পাওয়া গেছে (Fulfilled)' as const } : req
    );
    setRequests(updated);
    try {
      localStorage.setItem('jamalpur_blood_requests', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-rose-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-2">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>জরুরি রক্তের লাইভ নোটিশ বোর্ড</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            জামালপুরের বিভিন্ন হাসপাতালে রক্তের তাৎক্ষণিক আবেদন
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            রোগীর রক্তের জরুরি মুহূর্তে এখানে আবেদন পোস্ট করুন। স্থানীয় রক্তদাতা ও সামাজিক সংগঠনগুলো অবিলম্বে যোগাযোগ করবে।
          </p>
        </div>

        <button
          onClick={() => setShowPostModal(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors whitespace-nowrap shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>রক্তের আবেদন পোস্ট করুন</span>
        </button>
      </div>

      {/* Requests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {requests.map((req) => {
          const isFulfilled = req.status === 'রক্তদাতা পাওয়া গেছে (Fulfilled)';
          return (
            <div
              key={req.id}
              className={`rounded-xl border p-5 transition-all flex flex-col justify-between ${
                isFulfilled
                  ? 'bg-slate-50 border-slate-200 opacity-80'
                  : 'bg-white border-red-200/90 shadow-xs hover:border-red-300'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold text-xl font-mono shadow-xs shrink-0">
                      {req.bloodGroup}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-0.5">
                        <span className="font-semibold text-slate-700">{req.upazila}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono">{req.postedAt}</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                        {req.patientName}
                      </h3>
                    </div>
                  </div>

                  <span
                    className={`text-[11px] px-2 py-0.5 rounded font-semibold ${
                      isFulfilled
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-red-100 text-red-800 animate-pulse'
                    }`}
                  >
                    {isFulfilled ? 'রক্তদাতা পাওয়া গেছে' : req.urgency}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-2 text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100 mb-3">
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                    <span>
                      হাসপাতাল: <strong className="text-slate-900">{req.hospitalName}</strong>
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Droplet className="w-3.5 h-3.5 text-red-600" />
                      <span>প্রয়োজনীয় পরিমাণ: <strong className="font-mono">{req.bagsNeeded} ব্যাগ</strong></span>
                    </div>
                    <div className="text-slate-500">
                      যোগাযোগ: <strong>{req.contactPerson}</strong>
                    </div>
                  </div>

                  {req.reasonBn && (
                    <div className="text-slate-600 pt-1 border-t border-slate-200/60 text-[11px] leading-relaxed">
                      বিবরণ: {req.reasonBn}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                {!isFulfilled ? (
                  <>
                    <a
                      href={`tel:${req.contactPhone}`}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>সরাসরি স্বজনকে কল ({req.contactPhone})</span>
                    </a>

                    <button
                      onClick={() => handleMarkFulfilled(req.id)}
                      className="px-2.5 py-2 text-xs text-emerald-700 hover:bg-emerald-50 border border-emerald-200 rounded-lg transition-colors whitespace-nowrap"
                      title="রক্ত পাওয়া সম্পন্ন হয়েছে হিসেবে চিহ্নিত করুন"
                    >
                      রক্তদাতা পেয়েছি
                    </button>
                  </>
                ) : (
                  <div className="w-full text-center py-1 text-xs text-emerald-700 font-semibold flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>এই রোগীর জন্য রক্তদাতা নিশ্চিত হয়েছে।</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Post Modal */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h3 className="text-lg font-bold text-slate-900">জরুরি রক্তের আবেদন ফরম</h3>
              </div>
              <button
                onClick={() => setShowPostModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePostSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">রোগীর নাম *</label>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="যেমন: মোছাঃ সালমা খাতুন"
                  className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">রক্তের গ্রুপ *</label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
                    className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    {BLOOD_GROUPS.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">প্রয়োজনীয় ব্যাগ সংখ্যা *</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    required
                    value={bagsNeeded}
                    onChange={(e) => setBagsNeeded(Number(e.target.value))}
                    className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">উপজেলা *</label>
                  <select
                    value={upazila}
                    onChange={(e) => setUpazila(e.target.value as UpazilaName)}
                    className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    {UPAZILAS.map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">জরুরিত্বের মাত্রা *</label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value as BloodRequest['urgency'])}
                    className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="খুব জরুরি (Immediate)">খুব জরুরি (এখনই)</option>
                    <option value="আজকের মধ্যে (Today)">আজকের মধ্যে</option>
                    <option value="আগামীকাল (Tomorrow)">আগামীকাল</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">হাসপাতালের নাম ও রুম/ওয়ার্ড নম্বর *</label>
                <input
                  type="text"
                  required
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  placeholder="যেমন: জামালপুর ২৫০ শয্যা জেনারেল হাসপাতাল (মহিলা সার্জারি ওয়ার্ড)"
                  className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">যোগাযোগকারীর নাম *</label>
                  <input
                    type="text"
                    required
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="যেমন: কামাল হোসেন (ভাই)"
                    className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">মোবাইল নম্বর *</label>
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="01712-XXXXXX"
                    className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">রোগীর কারণ / অতিরিক্ত তথ্য</label>
                <textarea
                  rows={2}
                  value={reasonBn}
                  onChange={(e) => setReasonBn(e.target.value)}
                  placeholder="যেমন: সিজারিয়ান অপারেশনের জন্য অবিলম্বে রক্তের প্রয়োজন।"
                  className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-lg font-medium text-slate-600 hover:bg-slate-100"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold shadow-xs"
                >
                  আবেদন পোস্ট করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
