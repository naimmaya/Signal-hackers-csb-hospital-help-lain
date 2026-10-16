export interface DiagnosticTest {
  id: string;
  nameBn: string;
  nameEn: string;
  category: 'প্যাথলজি ও রক্ত' | 'রেডিওলজি ও ইমেজিং' | 'কার্ডিওলজি' | 'হরমোন ও বিশেষ টেস্ট';
  govtHospitalFee: string;
  privateClinicFee: string;
  preparationBn: string;
  deliveryTime: string;
}

export const DIAGNOSTIC_TESTS: DiagnosticTest[] = [
  {
    id: 'test-1',
    nameBn: 'কমপ্লিট ব্লাড কাউন্ট (CBC উইথ ESR)',
    nameEn: 'Complete Blood Count (CBC with ESR)',
    category: 'প্যাথলজি ও রক্ত',
    govtHospitalFee: '১৫০ - ২০০ টাকা',
    privateClinicFee: '৩৫০ - ৫০০ টাকা',
    preparationBn: 'কোনো বিশেষ প্রস্তুতির প্রয়োজন নেই। দিনের যেকোনো সময় রক্ত দেয়া যায়।',
    deliveryTime: '২ - ৪ ঘণ্টা',
  },
  {
    id: 'test-2',
    nameBn: 'রক্তের গ্লুকোজ / ডায়াবেটিস (Fasting / 2HABF)',
    nameEn: 'Blood Glucose (Fasting & PP)',
    category: 'প্যাথলজি ও রক্ত',
    govtHospitalFee: '৫০ - ৮০ টাকা',
    privateClinicFee: '১২০ - ২০০ টাকা',
    preparationBn: 'ফাস্টিংয়ের জন্য অন্তত ৮ থেকে ১০ ঘণ্টা খালি পেটে থাকতে হবে। ২ ঘণ্টা পরের টেস্টে খাবার শেষ হওয়ার ঠিক ২ ঘণ্টা পর রক্ত দিতে হয়।',
    deliveryTime: '১ - ২ ঘণ্টা',
  },
  {
    id: 'test-3',
    nameBn: 'সিরাম ক্রিয়েটিনিন (কিডনি ফাংশন)',
    nameEn: 'Serum Creatinine (Kidney Function)',
    category: 'প্যাথলজি ও রক্ত',
    govtHospitalFee: '১০০ - ১৫০ টাকা',
    privateClinicFee: '২৫০ - ৪০০ টাকা',
    preparationBn: 'সাধারণ খাবার খেতে পারেন। অতিরিক্ত ভারী মাংস খাওয়া থেকে বিরত থাকা ভালো।',
    deliveryTime: '২ - ৩ ঘণ্টা',
  },
  {
    id: 'test-4',
    nameBn: 'লিপিড প্রোফাইল (কোলেস্টেরল ও চর্বি)',
    nameEn: 'Lipid Profile (Full Panel)',
    category: 'প্যাথলজি ও রক্ত',
    govtHospitalFee: '৩০০ - ৪০০ টাকা',
    privateClinicFee: '৭০০ - ১,০০০ টাকা',
    preparationBn: '১০ থেকে ১২ ঘণ্টা রাতের উপবাস (শুধু পানি পান করা যাবে) আবশ্যক।',
    deliveryTime: '৪ - ৬ ঘণ্টা',
  },
  {
    id: 'test-5',
    nameBn: 'ডিজিটাল চেস্ট এক্স-রে (Chest X-Ray P/A View)',
    nameEn: 'Digital Chest X-Ray P/A',
    category: 'রেডিওলজি ও ইমেজিং',
    govtHospitalFee: '১০০ - ১৫০ টাকা',
    privateClinicFee: '৩০০ - ৫০০ টাকা',
    preparationBn: 'গলার চেইন, মেটালিক বোতাম বা গহনা খুলে এক্স-রে রুমে প্রবেশ করতে হবে।',
    deliveryTime: '৩০ মিনিট - ১ ঘণ্টা',
  },
  {
    id: 'test-6',
    nameBn: 'আল্ট্রাসনোগ্রাম (পুরো পেট / গর্ভকালীন ইউএসজি)',
    nameEn: 'Ultrasonography (Whole Abdomen / Pregnancy USG)',
    category: 'রেডিওলজি ও ইমেজিং',
    govtHospitalFee: '২২০ - ৩০০ টাকা',
    privateClinicFee: '৬০০ - ৯০০ টাকা',
    preparationBn: 'পেটের পরীক্ষার জন্য পর্যাপ্ত পানি পান করে প্রস্রাবের স্বাভাবিক চাপ থাকতে হবে। সকালে খালি পেটে আসা উত্তম।',
    deliveryTime: '১ ঘণ্টা',
  },
  {
    id: 'test-7',
    nameBn: '১২-লিড ডিজিটাল ইসিজি (ECG)',
    nameEn: '12-Lead Electrocardiogram (ECG)',
    category: 'কার্ডিওলজি',
    govtHospitalFee: '৮০ - ১০০ টাকা',
    privateClinicFee: '২০০ - ৩০০ টাকা',
    preparationBn: 'পরীক্ষার পূর্বে শান্তভাবে ১০ মিনিট বিশ্রাম নিন। কোনো পূর্ব প্রস্তুতির প্রয়োজন নেই।',
    deliveryTime: 'তাৎক্ষণিক (১৫ মিনিট)',
  },
  {
    id: 'test-8',
    nameBn: 'ইকো-কার্ডিওগ্রাফি (কালার ডপলার 2D Echo)',
    nameEn: '2D Echocardiogram with Color Doppler',
    category: 'কার্ডিওলজি',
    govtHospitalFee: '৬০০ - ৮০০ টাকা',
    privateClinicFee: '১,৫০০ - ২,২০০ টাকা',
    preparationBn: 'কার্ডিওলজিস্ট দ্বারা সরাসরি সম্পন্ন হয়। পূর্বের সকল প্রেসক্রিপশন ও ইসিজি সাথে রাখুন।',
    deliveryTime: '১ - ২ ঘণ্টা',
  },
];

export interface HospitalLiveBedStatus {
  hospitalId: string;
  hospitalName: string;
  upazila: string;
  generalBedsTotal: number;
  generalBedsAvailable: number;
  cabinTotal: number;
  cabinAvailable: number;
  icuTotal: number;
  icuAvailable: number;
  oxygenStatus: 'পর্যাপ্ত (High Capacity)' | 'স্বাভাবিক (Normal)' | 'সীমিত (Limited)';
  lastUpdated: string;
}

export const LIVE_BED_STATUSES: HospitalLiveBedStatus[] = [
  {
    hospitalId: 'hosp-madar-1',
    hospitalName: 'মাদারগঞ্জ ৫০ শয্যা উপজেলা স্বাস্থ্য কমপ্লেক্স',
    upazila: 'মাদারগঞ্জ',
    generalBedsTotal: 50,
    generalBedsAvailable: 14,
    cabinTotal: 6,
    cabinAvailable: 2,
    icuTotal: 0,
    icuAvailable: 0,
    oxygenStatus: 'পর্যাপ্ত (High Capacity)',
    lastUpdated: '১০ মিনিট আগে',
  },
  {
    hospitalId: 'hosp-madar-9',
    hospitalName: 'বালিজুড়ী আল-মদিনা জেনারেল হাসপাতাল',
    upazila: 'মাদারগঞ্জ',
    generalBedsTotal: 30,
    generalBedsAvailable: 8,
    cabinTotal: 8,
    cabinAvailable: 3,
    icuTotal: 2,
    icuAvailable: 1,
    oxygenStatus: 'পর্যাপ্ত (High Capacity)',
    lastUpdated: '২৫ মিনিট আগে',
  },
  {
    hospitalId: 'hosp-1',
    hospitalName: 'জামালপুর ২৫০ শয্যা জেনারেল হাসপাতাল (সদর)',
    upazila: 'জামালপুর সদর',
    generalBedsTotal: 250,
    generalBedsAvailable: 38,
    cabinTotal: 24,
    cabinAvailable: 4,
    icuTotal: 10,
    icuAvailable: 3,
    oxygenStatus: 'পর্যাপ্ত (High Capacity)',
    lastUpdated: '৫ মিনিট আগে',
  },
  {
    hospitalId: 'hosp-2',
    hospitalName: 'শেখ হাসিনা মেডিকেল কলেজ ও হাসপাতাল',
    upazila: 'জামালপুর সদর',
    generalBedsTotal: 500,
    generalBedsAvailable: 95,
    cabinTotal: 40,
    cabinAvailable: 9,
    icuTotal: 16,
    icuAvailable: 5,
    oxygenStatus: 'পর্যাপ্ত (High Capacity)',
    lastUpdated: '১৫ মিনিট আগে',
  },
  {
    hospitalId: 'hosp-madar-10',
    hospitalName: 'মাদারগঞ্জ সেন্ট্রাল জেনারেল হাসপাতাল ও ট্রমা সেন্টার',
    upazila: 'মাদারগঞ্জ',
    generalBedsTotal: 35,
    generalBedsAvailable: 11,
    cabinTotal: 6,
    cabinAvailable: 2,
    icuTotal: 0,
    icuAvailable: 0,
    oxygenStatus: 'স্বাভাবিক (Normal)',
    lastUpdated: '৪০ মিনিট আগে',
  },
];
