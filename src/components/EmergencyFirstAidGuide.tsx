import React from 'react';
import { AlertOctagon, HeartPulse, Activity, Flame, ShieldAlert } from 'lucide-react';

export const EmergencyFirstAidGuide: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
      <div className="flex items-center gap-2 text-rose-700 text-xs font-bold uppercase tracking-wider">
        <AlertOctagon className="w-4 h-4 text-rose-600" />
        <span>জরুরি প্রাথমিক চিকিৎসা ও জীবন বাঁচানোর নির্দেশিকা (Emergency First Aid)</span>
      </div>

      <div className="max-w-3xl">
        <h3 className="text-xl font-bold text-slate-900 mb-1">
          হাসপাতালে পৌঁছানোর পূর্বে রোগীর তাৎক্ষণিক জীবন রক্ষাকারী করণীয়
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          মাদারগঞ্জ ও জামালপুরের চরাঞ্চলসহ যে কোনো স্থানে জরুরি মুহূর্তে সঠিক পদক্ষেপ রোগীর জীবন বাঁচাতে পারে।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Snake Bite */}
        <div className="bg-rose-50/60 p-4 rounded-xl border border-rose-100 space-y-2">
          <div className="flex items-center gap-2 text-rose-900 font-bold">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            <span>সাপে কাটলে করণীয় (মাদারগঞ্জ চরাঞ্চল বিশেষ সতর্কতা)</span>
          </div>
          <ul className="space-y-1 text-slate-700 list-disc pl-4">
            <li>রোগীকে শান্ত রাখুন, আক্রান্ত হাত বা পা একেবারেই নাড়াচাড়া করবেন না।</li>
            <li><strong>কী করবেন না:</strong> ব্লেড দিয়ে কাটা, মুখ দিয়ে রক্ত চোষা বা শক্ত দড়ি দিয়ে বাঁধা সম্পূর্ণ নিষেধ!</li>
            <li>অবিলম্বে রোগীকে <strong>মাদারগঞ্জ উপজেলা স্বাস্থ্য কমপ্লেক্স</strong> বা সদর হাসপাতালে আনুন। এখানে সরকারি বিনামূল্যে এন্টিভেনম (Antivenom) ইনজেকশন মজুদ রয়েছে।</li>
          </ul>
        </div>

        {/* Heart Attack */}
        <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-100 space-y-2">
          <div className="flex items-center gap-2 text-amber-900 font-bold">
            <HeartPulse className="w-4 h-4 text-amber-600" />
            <span>হার্ট অ্যাটাক সন্দেহ হলে (বুকে তীব্র চাপ বা ব্যথা)</span>
          </div>
          <ul className="space-y-1 text-slate-700 list-disc pl-4">
            <li>রোগীকে আরামদায়কভাবে বসিয়ে দিন, শুইয়ে রাখবেন না।</li>
            <li>গলার টাই বা শক্ত জামাকাপড় ঢিলে করে দিন এবং উন্মুক্ত বাতাস নিশ্চিত করুন।</li>
            <li>পরামর্শমতো অ্যাসপিরিন (Aspirin 300mg) ট্যাবলেট চিবিয়ে খেতে দিতে পারেন।</li>
            <li>অবিলম্বে অক্সিজেন সুবিধাযুক্ত অ্যাম্বুলেন্সে কার্ডিওলজি ইউনিটে নিয়ে যান।</li>
          </ul>
        </div>

        {/* Stroke */}
        <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-100 space-y-2">
          <div className="flex items-center gap-2 text-blue-900 font-bold">
            <Activity className="w-4 h-4 text-blue-600" />
            <span>ব্রেইন স্ট্রোক (FAST নিয়ম মনে রাখুন)</span>
          </div>
          <ul className="space-y-1 text-slate-700 list-disc pl-4">
            <li><strong>F (Face):</strong> হাসতে বলুন — মুখের এক পাশ বেঁকে যাচ্ছে কি না।</li>
            <li><strong>A (Arm):</strong> দুই হাত তুলতে বলুন — এক হাত দুর্বল বা অবশ কি না।</li>
            <li><strong>S (Speech):</strong> কথা বলতে বলুন — কথা অস্পষ্ট বা জড়ানো কি না।</li>
            <li><strong>T (Time):</strong> ৩ ঘণ্টার মধ্যে সিটি স্ক্যান সুবিধাযুক্ত হাসপাতালে পৌঁছান।</li>
          </ul>
        </div>

        {/* Burn */}
        <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-100 space-y-2">
          <div className="flex items-center gap-2 text-emerald-900 font-bold">
            <Flame className="w-4 h-4 text-emerald-600" />
            <span>আগুনে পোড়া বা গরম পানিতে ঝলসে গেলে</span>
          </div>
          <ul className="space-y-1 text-slate-700 list-disc pl-4">
            <li>পোড়া স্থানে সাথে সাথে স্বাভাবিক তাপমাত্রার পরিষ্কার পানি অন্তত ২০ মিনিট ঢালুন।</li>
            <li><strong>কী করবেন না:</strong> বরফ, ডিম, পেস্ট বা তেল কখনোই লাগাবেন না।</li>
            <li>পোড়া অংশে পরিষ্কার শুকনো কাপড় ঢেকে দ্রুত নিকটস্থ স্বাস্থ্যকেন্দ্রে আনুন।</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
