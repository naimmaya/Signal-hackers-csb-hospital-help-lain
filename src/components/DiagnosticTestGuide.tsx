import React, { useState } from 'react';
import { DIAGNOSTIC_TESTS, DiagnosticTest } from '../data/diagnosticAndBedsData';
import { FileText, Search, Clock, AlertCircle, CheckCircle2, DollarSign } from 'lucide-react';

export const DiagnosticTestGuide: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('সকল');

  const categories = ['সকল', 'প্যাথলজি ও রক্ত', 'রেডিওলজি ও ইমেজিং', 'কার্ডিওলজি'];

  const filteredTests = DIAGNOSTIC_TESTS.filter((test) => {
    const matchCat = selectedCategory === 'সকল' || test.category === selectedCategory;
    const matchSearch =
      !searchQuery.trim() ||
      test.nameBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.nameEn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
      <div className="flex items-center gap-2 text-teal-800 text-xs font-bold uppercase tracking-wider">
        <FileText className="w-4 h-4 text-teal-600" />
        <span>মেডিকেল টেস্ট ফি ও পূর্বপ্রস্তুতি নির্দেশিকা (Diagnostic Price & Prep Guide)</span>
      </div>

      <div className="max-w-3xl">
        <h3 className="text-xl font-bold text-slate-900 mb-1">
          রক্ত, এক্স-রে ও আল্ট্রাসনোগ্রাম পরীক্ষার সঠিক সরকারি ও বেসরকারি ফি
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          মাদারগঞ্জ ও জামালপুরের ল্যাবগুলোতে কোন পরীক্ষার জন্য কত ফি নেওয়া হয় এবং টেস্টের আগে কী নিয়ম মানতে হবে তার নির্ভরযোগ্য গাইড।
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="পরীক্ষার নাম খুঁজুন (যেমন: সিবিসি, আল্ট্রাসনোগ্রাম, ক্রিয়েটিনিন, এক্স-রে)..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
                selectedCategory === c
                  ? 'bg-teal-700 text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Tests Table / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTests.map((test) => (
          <div
            key={test.id}
            className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-3 flex flex-col justify-between hover:border-teal-300 transition-all"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                <span className="font-semibold text-teal-800">{test.category}</span>
                <span className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Clock className="w-3 h-3" />
                  <span>রিপোর্ট: {test.deliveryTime}</span>
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-900 leading-snug">
                {test.nameBn}
              </h4>
              <p className="text-[11px] text-slate-500 font-sans mb-3">{test.nameEn}</p>

              {/* Price comparison */}
              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-medium block">সরকারি হাসপাতালে ফি</span>
                  <span className="text-sm font-bold text-emerald-700 font-mono">{test.govtHospitalFee}</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-medium block">বেসরকারি ক্লিনিকে ফি</span>
                  <span className="text-sm font-bold text-slate-800 font-mono">{test.privateClinicFee}</span>
                </div>
              </div>

              {/* Prep Advice */}
              <div className="bg-white p-2.5 rounded-lg border border-slate-200/80 text-[11px] text-slate-600">
                <strong className="text-slate-800">পরীক্ষার পূর্বপ্রস্তুতি:</strong> {test.preparationBn}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
