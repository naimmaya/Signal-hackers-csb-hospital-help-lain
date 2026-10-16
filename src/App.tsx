import React, { useState, useEffect, useMemo } from 'react';
import { HOSPITALS_DATA, Hospital, UPAZILAS, UpazilaName, UPAZILA_DIRECTORY } from './data/hospitalsData';
import { INITIAL_BLOOD_REQUESTS } from './data/bloodData';
import { Header } from './components/Header';
import { HospitalCard } from './components/HospitalCard';
import { HospitalDetailModal } from './components/HospitalDetailModal';
import { AmbulanceDirectory } from './components/AmbulanceDirectory';
import { BloodDonorNetwork } from './components/BloodDonorNetwork';
import { BloodRequestBoard } from './components/BloodRequestBoard';
import { UpazilaMapViewer } from './components/UpazilaMapViewer';
import { SavedHospitalsModal } from './components/SavedHospitalsModal';
import { SpecialistDoctorsDirectory } from './components/SpecialistDoctorsDirectory';
import { OxygenAndPharmacyDirectory } from './components/OxygenAndPharmacyDirectory';
import { AmbulanceFareCalculator } from './components/AmbulanceFareCalculator';
import { EmergencyFirstAidGuide } from './components/EmergencyFirstAidGuide';
import { PrintEmergencyModal } from './components/PrintEmergencyModal';
import { HospitalCompareModal } from './components/HospitalCompareModal';
import { LiveBedStatusTracker } from './components/LiveBedStatusTracker';
import { DiagnosticTestGuide } from './components/DiagnosticTestGuide';
import { EmergencySpeedDialHub } from './components/EmergencySpeedDialHub';
import { AppointmentSlipModal } from './components/AppointmentSlipModal';
import {
  Search,
  MapPin,
  Filter,
  PhoneCall,
  Activity,
  Heart,
  Ambulance,
  Hospital as HospitalIcon,
  ShieldAlert,
  X,
  Building2,
  Stethoscope,
  ChevronRight,
  Sparkles,
  Layers,
  Printer,
  Wind,
  Volume2,
  VolumeX,
  FileCheck2,
  Bed,
  FileText,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('hospitals');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedUpazila, setSelectedUpazila] = useState<string>('সব উপজেলা');
  const [selectedType, setSelectedType] = useState<string>('সব ধরন');
  const [selectedFacility, setSelectedFacility] = useState<string>('সব সুবিধা');
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [savedModalOpen, setSavedModalOpen] = useState<boolean>(false);
  const [bloodRequestsCount, setBloodRequestsCount] = useState<number>(0);

  // New Professional Features State
  const [compareHospitals, setCompareHospitals] = useState<Hospital[]>([]);
  const [compareModalOpen, setCompareModalOpen] = useState<boolean>(false);
  const [printModalOpen, setPrintModalOpen] = useState<boolean>(false);
  const [appointmentModalOpen, setAppointmentModalOpen] = useState<boolean>(false);
  const [isSpeakingAudio, setIsSpeakingAudio] = useState<boolean>(false);

  // Load saved bookmarks from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('jamalpur_saved_hospitals');
      if (saved) {
        setSavedIds(JSON.parse(saved));
      }
      const reqs = localStorage.getItem('jamalpur_blood_requests');
      if (reqs) {
        const parsed = JSON.parse(reqs);
        setBloodRequestsCount(parsed.filter((r: any) => r.status.includes('Active') || r.status.includes('সক্রিয়')).length);
      } else {
        setBloodRequestsCount(INITIAL_BLOOD_REQUESTS.length);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleToggleSave = (id: string) => {
    setSavedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('jamalpur_saved_hospitals', JSON.stringify(next));
      } catch (err) {
        console.error(err);
      }
      return next;
    });
  };

  const savedHospitals = useMemo(() => {
    return HOSPITALS_DATA.filter((h) => savedIds.includes(h.id));
  }, [savedIds]);

  const handleToggleCompare = (hospital: Hospital) => {
    setCompareHospitals((prev) => {
      const exists = prev.some((h) => h.id === hospital.id);
      if (exists) {
        return prev.filter((h) => h.id !== hospital.id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), hospital];
      }
      return [...prev, hospital];
    });
  };

  // Bengali Voice Emergency Guidance (Web Speech API)
  const handlePlayVoiceGuidance = () => {
    if (!('speechSynthesis' in window)) {
      alert('আপনার ব্রাউজারে স্পিচ সিন্থেসিস সমর্থন করে না।');
      return;
    }

    if (isSpeakingAudio) {
      window.speechSynthesis.cancel();
      setIsSpeakingAudio(false);
      return;
    }

    const text = 'সিগন্যাল হ্যাকার্স সিএসবি হাসপাতাল হেল্পলাইনে আপনাকে স্বাগতম। মাদারগঞ্জ ও জামালপুর জেলার যে কোনো জরুরি চিকিৎসার প্রয়োজনে সরাসরি জাতীয় জরুরি সেবা ৯৯৯ অথবা মাদারগঞ্জ হাসপাতাল কন্ট্রোল রুমে কল দিন। সাপে কাটলে রোগীকে শান্ত রাখুন এবং অবিলম্বে মাদারগঞ্জ স্বাস্থ্য কমপ্লেক্সে নিয়ে আসুন, যেখানে বিনামূল্যে অ্যান্টিভেনম ইনজেকশন মজুদ রয়েছে।';
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'bn-BD';
    utterance.rate = 0.95;

    utterance.onend = () => setIsSpeakingAudio(false);
    utterance.onerror = () => setIsSpeakingAudio(false);

    setIsSpeakingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  // Filtered hospitals
  const filteredHospitals = useMemo(() => {
    return HOSPITALS_DATA.filter((h) => {
      // Upazila match
      if (selectedUpazila !== 'সব উপজেলা' && h.upazila !== selectedUpazila) {
        return false;
      }

      // Type match
      if (selectedType !== 'সব ধরন') {
        if (selectedType === 'সরকারি' && h.type !== 'govt' && h.type !== 'upazila_complex') return false;
        if (selectedType === 'মেডিকেল কলেজ' && h.type !== 'medical_college') return false;
        if (selectedType === 'উপজেলা স্বাস্থ্য কমপ্লেক্স' && h.type !== 'upazila_complex') return false;
        if (selectedType === 'বেসরকারি' && h.type !== 'private') return false;
        if (selectedType === 'বিশেষায়িত' && h.type !== 'specialized') return false;
      }

      // Facility filter
      if (selectedFacility !== 'সব সুবিধা') {
        const hasFac = h.facilities.some((f) => f.toLowerCase().includes(selectedFacility.toLowerCase()));
        if (!hasFac) return false;
      }

      // Search query (names, upazila, address, departments, facilities)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inNameBn = h.nameBn.toLowerCase().includes(q);
        const inNameEn = h.nameEn.toLowerCase().includes(q);
        const inUpazila = h.upazila.toLowerCase().includes(q) || h.upazilaEn.toLowerCase().includes(q);
        const inAddress = h.addressBn.toLowerCase().includes(q) || h.landmarkBn.toLowerCase().includes(q);
        const inDepts = h.departments.some((d) => d.toLowerCase().includes(q));
        const inFacilities = h.facilities.some((f) => f.toLowerCase().includes(q));
        return inNameBn || inNameEn || inUpazila || inAddress || inDepts || inFacilities;
      }

      return true;
    });
  }, [searchQuery, selectedUpazila, selectedType, selectedFacility]);

  // Total bed counts in filtered
  const totalBeds = useMemo(() => {
    return filteredHospitals.reduce((acc, curr) => acc + curr.bedCount, 0);
  }, [filteredHospitals]);

  const handleSelectUpazilaFromGuide = (upazila: UpazilaName) => {
    setSelectedUpazila(upazila);
    setActiveTab('hospitals');
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const madarganjCount = useMemo(() => {
    return HOSPITALS_DATA.filter((h) => h.upazila === 'মাদারগঞ্জ').length;
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header with Signal Hackers CSB Branding */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedIds.length}
        onOpenSaved={() => setSavedModalOpen(true)}
        bloodRequestCount={bloodRequestsCount}
        onOpenPrint={() => setPrintModalOpen(true)}
      />

      {/* Quick Action Navigation Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2 flex items-center justify-between gap-4 overflow-x-auto text-xs">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-slate-500 font-semibold">বিশেষায়িত টুলস:</span>
            <button
              onClick={() => setActiveTab('beds')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors flex items-center gap-1.5 shrink-0 ${
                activeTab === 'beds'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Bed className="w-3.5 h-3.5 text-emerald-600" />
              <span>লাইভ শয্যা ও আইসিইউ প্রাপ্যতা</span>
            </button>

            <button
              onClick={() => setActiveTab('tests')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors flex items-center gap-1.5 shrink-0 ${
                activeTab === 'tests'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              <span>মেডিকেল টেস্ট ও ফি তালিকা</span>
            </button>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setAppointmentModalOpen(true)}
              className="px-3.5 py-1.5 bg-gradient-to-r from-teal-700 to-emerald-700 text-white rounded-lg font-bold flex items-center gap-1.5 shadow-xs hover:brightness-110 transition-all shrink-0"
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>ওপিডি সিরিয়াল স্লিপ তৈরি</span>
            </button>

            <button
              onClick={handlePlayVoiceGuidance}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-colors shrink-0 ${
                isSpeakingAudio
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
              title="জরুরি ভয়েস নির্দেশিকা শুনুন"
            >
              {isSpeakingAudio ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-teal-600" />}
              <span>{isSpeakingAudio ? 'অডিও থামান' : 'বাংলা অডিও গাইড'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-8">
        {/* Render Tab Contents */}
        {activeTab === 'hospitals' && (
          <div className="space-y-8">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-lg border border-teal-900/40">
              <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-300 tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>SIGNAL HACKERS CSB · জামালপুর ও মাদারগঞ্জ থানা স্বাস্থ্য পোর্টাল</span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  Signal Hackers CSB হাসপাতাল হেল্পলাইন
                </h1>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                  মাদারগঞ্জ থানার ৫০ শয্যা স্বাস্থ্য কমপ্লেক্স, সরকারি মা ও শিশু কেন্দ্র (MCWC), গুণারিতলা, সিধুলী, চর পাকেরদহ, আদারভিটা ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র,
                  বালিজুড়ী জেনারেল হাসপাতালসমূহ এবং জামালপুর জেলার সকল সরকারি-বেসরকারি চিকিৎসালয়ের ভেরিফাইড পূর্ণাঙ্গ তথ্য।
                </p>

                {/* Instant Search Bar */}
                <div className="pt-2">
                  <div className="relative max-w-2xl">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="মাদারগঞ্জ, বালিজুড়ী, গুণারিতলা, সিধুলী, সদর হাসপাতাল, ডাক্তার বিভাগ বা আইসিইউ..."
                      className="w-full pl-12 pr-10 py-3.5 bg-white text-slate-900 placeholder:text-slate-400 rounded-xl text-sm font-medium shadow-md focus:outline-none focus:ring-3 focus:ring-teal-400"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Special Madarganj Quick Highlight & Upazila Selectors */}
                <div className="pt-2 flex items-center gap-2 flex-wrap text-xs">
                  {/* Highlighted Madarganj button */}
                  <button
                    onClick={() => setSelectedUpazila('মাদারগঞ্জ')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                      selectedUpazila === 'মাদারগঞ্জ'
                        ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300'
                        : 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:brightness-110'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 fill-current" />
                    <span>মাদারগঞ্জ থানার হাসপাতালসমূহ ({madarganjCount} টি)</span>
                  </button>

                  <button
                    onClick={() => setSelectedUpazila('সব উপজেলা')}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      selectedUpazila === 'সব উপজেলা'
                        ? 'bg-teal-500 text-white font-semibold'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    সব ({HOSPITALS_DATA.length})
                  </button>

                  {UPAZILAS.filter((u) => u !== 'মাদারগঞ্জ').map((upazila) => (
                    <button
                      key={upazila}
                      onClick={() => setSelectedUpazila(upazila)}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        selectedUpazila === upazila
                          ? 'bg-teal-500 text-white font-semibold'
                          : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {upazila}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stat Counters Row */}
              <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <div className="text-slate-400">মোট চিকিৎসাকেন্দ্র</div>
                  <div className="text-xl sm:text-2xl font-bold text-white font-mono mt-0.5">
                    {HOSPITALS_DATA.length} টি
                  </div>
                </div>
                <div>
                  <div className="text-slate-400">মাদারগঞ্জ থানা কভারেজ</div>
                  <div className="text-xl sm:text-2xl font-bold text-amber-400 font-mono mt-0.5">
                    {madarganjCount} টি হাসপাতাল
                  </div>
                </div>
                <div>
                  <div className="text-slate-400">সরকারি ও জেনারেল শয্যা</div>
                  <div className="text-xl sm:text-2xl font-bold text-teal-400 font-mono mt-0.5">
                    ১,৩৫০+ শয্যা
                  </div>
                </div>
                <div>
                  <div className="text-slate-400">জরুরি হেল্পলাইন</div>
                  <div className="text-xl sm:text-2xl font-bold text-white font-mono mt-0.5">
                    ২৪ ঘণ্টা সক্রিয়
                  </div>
                </div>
              </div>
            </section>

            {/* Compare Floating Bar (if 2+ selected) */}
            {compareHospitals.length > 0 && (
              <div className="sticky top-20 z-30 bg-slate-900 text-white p-3 rounded-xl shadow-lg border border-teal-500/50 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-teal-400" />
                  <span>
                    <strong>{compareHospitals.length}</strong> টি হাসপাতাল তুলনার জন্য নির্বাচিত
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCompareHospitals([])}
                    className="text-slate-400 hover:text-white underline text-[11px]"
                  >
                    ক্লিয়ার
                  </button>
                  {compareHospitals.length >= 2 ? (
                    <button
                      onClick={() => setCompareModalOpen(true)}
                      className="px-3 py-1 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-lg transition-colors"
                    >
                      পাশাপাশি তুলনা দেখুন
                    </button>
                  ) : (
                    <span className="text-slate-400 text-[11px]">আরও ১টি হাসপাতাল নির্বাচন করুন</span>
                  )}
                </div>
              </div>
            )}

            {/* Filter Bar & Controls */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
              {/* Type Segmented Controls */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
                {['সব ধরন', 'সরকারি', 'মেডিকেল কলেজ', 'উপজেলা স্বাস্থ্য কমপ্লেক্স', 'বেসরকারি', 'বিশেষায়িত'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedType(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                      selectedType === t
                        ? 'bg-teal-700 text-white font-semibold shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Facility Select Filter */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 font-medium">সুবিধা:</span>
                <select
                  value={selectedFacility}
                  onChange={(e) => setSelectedFacility(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                >
                  <option value="সব সুবিধা">সকল সুবিধা</option>
                  <option value="আইসিইউ">আইসিইউ (ICU)</option>
                  <option value="এনআইসিইউ">এনআইসিইউ (NICU)</option>
                  <option value="ডায়ালাইসিস">ডায়ালাইসিস ইউনিট</option>
                  <option value="অক্সিজেন">সেন্ট্রাল অক্সিজেন</option>
                  <option value="ব্লাড ব্যাংক">ব্লাড ব্যাংক</option>
                  <option value="অ্যাম্বুলেন্স">অ্যাম্বুলেন্স</option>
                  <option value="সিজারিয়ান">সিজারিয়ান / ওটি</option>
                </select>

                {(selectedUpazila !== 'সব উপজেলা' || selectedType !== 'সব ধরন' || selectedFacility !== 'সব সুবিধা' || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedUpazila('সব উপজেলা');
                      setSelectedType('সব ধরন');
                      setSelectedFacility('সব সুবিধা');
                      setSearchQuery('');
                    }}
                    className="text-xs text-red-600 hover:text-red-800 underline font-medium ml-2"
                  >
                    ফিল্টার মুছুন
                  </button>
                )}
              </div>
            </div>

            {/* Results Counter & Madarganj note */}
            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
              <div>
                প্রদর্শিত হচ্ছে: <strong className="text-slate-800">{filteredHospitals.length}</strong> টি চিকিৎসাকেন্দ্র
                {selectedUpazila === 'মাদারগঞ্জ' && (
                  <span className="text-teal-700 font-bold"> (মাদারগঞ্জ থানা ও বালিজুড়ী অঞ্চল)</span>
                )}
                {selectedUpazila !== 'মাদারগঞ্জ' && selectedUpazila !== 'সব উপজেলা' && (
                  <span> ({selectedUpazila} উপজেলা)</span>
                )}
              </div>
              <div className="font-mono tabular-nums">
                মোট শয্যা: {totalBeds} টি
              </div>
            </div>

            {/* Hospital Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredHospitals.map((hospital) => (
                <HospitalCard
                  key={hospital.id}
                  hospital={hospital}
                  onSelect={(h) => setSelectedHospital(h)}
                  isSaved={savedIds.includes(hospital.id)}
                  onToggleSave={handleToggleSave}
                  isCompared={compareHospitals.some((h) => h.id === hospital.id)}
                  onToggleCompare={handleToggleCompare}
                />
              ))}
            </div>

            {filteredHospitals.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 space-y-3">
                <HospitalIcon className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">
                  কোনো হাসপাতাল বা ক্লিনিক খুঁজে পাওয়া যায়নি
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  আপনার অনুসন্ধান ফিল্টার পরিবর্তন করে পুনরায় চেষ্টা করুন অথবা মাদারগঞ্জ স্বাস্থ্য কমপ্লেক্সের জরুরি হটলাইনে কল দিন।
                </p>
                <button
                  onClick={() => {
                    setSelectedUpazila('মাদারগঞ্জ');
                    setSelectedType('সব ধরন');
                    setSelectedFacility('সব সুবিধা');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-lg"
                >
                  মাদারগঞ্জ থানার হাসপাতালসমূহ দেখুন
                </button>
              </div>
            )}

            {/* Fair Ambulance Fare Estimator Section */}
            <AmbulanceFareCalculator />

            {/* Emergency First Aid Guidelines */}
            <EmergencyFirstAidGuide />
          </div>
        )}

        {/* Tab: Live Bed Status */}
        {activeTab === 'beds' && <LiveBedStatusTracker />}

        {/* Tab: Medical Tests Price Guide */}
        {activeTab === 'tests' && <DiagnosticTestGuide />}

        {/* Tab: Specialist Doctors & OPD Schedules */}
        {activeTab === 'doctors' && <SpecialistDoctorsDirectory />}

        {/* Tab: Emergency Ambulance Network */}
        {activeTab === 'ambulance' && (
          <div className="space-y-8">
            <AmbulanceDirectory />
            <AmbulanceFareCalculator />
          </div>
        )}

        {/* Tab: Oxygen & 24/7 Pharmacy */}
        {activeTab === 'oxygen' && <OxygenAndPharmacyDirectory />}

        {/* Tab: Blood Donors Network */}
        {activeTab === 'blood' && <BloodDonorNetwork />}

        {/* Tab: Live Blood Requests Board */}
        {activeTab === 'blood-requests' && <BloodRequestBoard />}

        {/* Tab: Upazila Map & Health Administration Guide */}
        {activeTab === 'upazila-guide' && (
          <UpazilaMapViewer onSelectUpazila={handleSelectUpazilaFromGuide} />
        )}
      </main>

      {/* Hospital Details Modal */}
      <HospitalDetailModal
        hospital={selectedHospital}
        onClose={() => setSelectedHospital(null)}
      />

      {/* Hospital Comparison Modal */}
      <HospitalCompareModal
        isOpen={compareModalOpen}
        onClose={() => setCompareModalOpen(false)}
        hospitals={compareHospitals}
        onSelectHospital={(h) => setSelectedHospital(h)}
      />

      {/* Saved Bookmarks Modal */}
      <SavedHospitalsModal
        isOpen={savedModalOpen}
        onClose={() => setSavedModalOpen(false)}
        savedHospitals={savedHospitals}
        onRemoveSave={handleToggleSave}
        onSelectHospital={(h) => setSelectedHospital(h)}
      />

      {/* Printable Wall Directory Sheet Modal */}
      <PrintEmergencyModal
        isOpen={printModalOpen}
        onClose={() => setPrintModalOpen(false)}
      />

      {/* Digital Appointment Slip Modal */}
      <AppointmentSlipModal
        isOpen={appointmentModalOpen}
        onClose={() => setAppointmentModalOpen(false)}
      />

      {/* Floating Speed Dial SOS Hub */}
      <EmergencySpeedDialHub />

      {/* Footer with Signal Hackers CSB branding */}
      <footer className="mt-16 bg-slate-900 text-slate-300 border-t border-slate-800 text-xs py-10 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-sm tracking-wider">
                  CSB
                </div>
                <span className="text-base font-bold text-white">
                  Signal Hackers CSB Hospital Helpline
                </span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed max-w-md">
                সিগন্যাল হ্যাকার্স সিএসবি হাসপাতাল হেল্পলাইন — মাদারগঞ্জ থানা ও জামালপুর জেলার সকল সরকারি-বেসরকারি জেনারেল হাসপাতাল,
                ইউনিয়ন উপ-স্বাস্থ্য কেন্দ্র, অ্যাম্বুলেন্স এবং জরুরি রক্তদাতাদের তথ্য ও জরুরি ফোন নম্বর দ্রুত পাওয়ার জন্য প্রস্তুতকৃত প্ল্যাটফর্ম।
              </p>
              <div className="text-[11px] text-teal-400">
                মাদারগঞ্জ উপজেলা স্বাস্থ্য কমপ্লেক্স কন্ট্রোল: ০১৭৩০-৩২৪৮৬০ | সদর হাসপাতাল: ০১৭৩০-৩২৪৮১০
              </div>
            </div>

            <div>
              <div className="font-semibold text-white mb-2">উপজেলা স্বাস্থ্য কমপ্লেক্সসমূহ</div>
              <ul className="space-y-1 text-slate-400">
                <li>
                  <button
                    onClick={() => handleSelectUpazilaFromGuide('মাদারগঞ্জ')}
                    className="text-amber-300 font-semibold hover:underline"
                  >
                    মাদারগঞ্জ ৫০ শয্যা স্বাস্থ্য কমপ্লেক্স ({madarganjCount} টি কেন্দ্র)
                  </button>
                </li>
                {UPAZILAS.filter((u) => u !== 'মাদারগঞ্জ').map((upz) => (
                  <li key={upz}>
                    <button
                      onClick={() => handleSelectUpazilaFromGuide(upz)}
                      className="hover:text-teal-300 transition-colors"
                    >
                      {upz} স্বাস্থ্য কমপ্লেক্স
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="font-semibold text-white mb-2">জরুরি হেল্পলাইন নম্বর</div>
              <ul className="space-y-1.5 text-slate-400">
                <li>জাতীয় জরুরি কল: <a href="tel:999" className="text-red-400 font-bold">৯৯৯</a></li>
                <li>মাদারগঞ্জ ইমার্জেন্সি: <a href="tel:01730324860" className="text-amber-300 font-bold">০১৭৩০-৩২৪৮৬০</a></li>
                <li>মাদারগঞ্জ সরকারি অ্যাম্বুলেন্স: <a href="tel:01730324861" className="text-emerald-400 font-bold">০১৭৩০-৩২৪৮৬১</a></li>
                <li>জামালপুর সদর ইমার্জেন্সি: <a href="tel:01730324810" className="text-teal-400">০১৭৩০-৩২৪৮১০</a></li>
                <li>রেড ক্রিসেন্ট ব্লাড সেন্টার: <a href="tel:01718223344" className="text-teal-400">০১৭১৮-২২৩৩৪৪</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
            <div>© {new Date().getFullYear()} Signal Hackers CSB Hospital Helpline. সর্বস্বত্ব সংরক্ষিত।</div>
            <div className="flex items-center gap-4">
              <span>মানবতার কল্যাণে নিবেদিত</span>
              <span>·</span>
              <span>২৪ ঘণ্টা উন্মুক্ত হেল্পলাইন</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
