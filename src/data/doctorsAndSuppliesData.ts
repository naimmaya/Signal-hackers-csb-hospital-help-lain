export interface SpecialistDoctor {
  id: string;
  name: string;
  qualification: string;
  designation: string;
  specialty: 'মেডিসিন' | 'গাইনি ও প্রসূতি' | 'শিশু রোগ' | 'সার্জারি' | 'অর্থোপেডিক্স' | 'হৃদরোগ' | 'চক্ষু' | 'চর্ম ও যৌন';
  hospitalOrChamber: string;
  upazila: string;
  visitingDays: string;
  visitingHours: string;
  serialPhone: string;
  fee: string;
  roomNo?: string;
}

export const SPECIALIST_DOCTORS: SpecialistDoctor[] = [
  // Madarganj Specialists
  {
    id: 'doc-1',
    name: 'ডাঃ মো. কামরুজ্জামান (ইউএইচএফপিও)',
    qualification: 'এমবিবিএস, বিসিএস (স্বাস্থ্য), এফসিপিএস (মেডিসিন শেষ পর্ব)',
    designation: 'উপজেলা স্বাস্থ্য ও পরিবার পরিকল্পনা কর্মকর্তা',
    specialty: 'মেডিসিন',
    hospitalOrChamber: 'মাদারগঞ্জ ৫০ শয্যা উপজেলা স্বাস্থ্য কমপ্লেক্স',
    upazila: 'মাদারগঞ্জ',
    visitingDays: 'রবিবার - বৃহস্পতিবার',
    visitingHours: 'সকাল ৯:০০ - দুপুর ২:০০',
    serialPhone: '01730-324860',
    fee: 'সরকারি টিকিট মাত্র ৫ টাকা',
    roomNo: 'রুম নং ১০২',
  },
  {
    id: 'doc-2',
    name: 'ডাঃ মোছাঃ নাসরিন আক্তার',
    qualification: 'এমবিবিএস, বিসিএস (স্বাস্থ্য), ডিজিও (গাইনি ও প্রসূতি)',
    designation: 'জুনিয়র কনসালট্যান্ট (গাইনি ও অবস)',
    specialty: 'গাইনি ও প্রসূতি',
    hospitalOrChamber: 'মাদারগঞ্জ উপজেলা স্বাস্থ্য কমপ্লেক্স / বালিজুড়ী আল-মদিনা হাসপাতাল',
    upazila: 'মাদারগঞ্জ',
    visitingDays: 'শনিবার - বৃহস্পতিবার',
    visitingHours: 'সকাল ৯:০০ - দুপুর ২:০০ (বিকাল ৪:০০ - রাত ৮:০০ আল-মদিনায়)',
    serialPhone: '01717-556677',
    fee: 'সরকারি ৫ টাকা / চেম্বারে ৫০০ টাকা',
    roomNo: 'রুম নং ১০৮',
  },
  {
    id: 'doc-3',
    name: 'ডাঃ আশরাফুল হক সুজন',
    qualification: 'এমবিবিএস, বিসিএস (স্বাস্থ্য), এমএস (অর্থোপেডিক্স সার্জারি)',
    designation: 'অর্থোপেডিক ও ট্রমা সার্জন',
    specialty: 'অর্থোপেডিক্স',
    hospitalOrChamber: 'মাদারগঞ্জ সেন্ট্রাল জেনারেল হাসপাতাল ও ট্রমা সেন্টার, কলেজ মোড়',
    upazila: 'মাদারগঞ্জ',
    visitingDays: 'প্রতি শুক্রবার ও সোমবার',
    visitingHours: 'সকাল ১০:০০ - বিকাল ৫:০০',
    serialPhone: '01711-443322',
    fee: '৬০০ টাকা',
    roomNo: 'চেম্বার নং ৩',
  },
  {
    id: 'doc-4',
    name: 'ডাঃ তানভীর আহমেদ চৌধুরী',
    qualification: 'এমবিবিএস, ডিইউএমএস, ডিসিএইচ (শিশু স্বাস্থ্য)',
    designation: 'শিশু রোগ বিশেষজ্ঞ ও কনসালট্যান্ট',
    specialty: 'শিশু রোগ',
    hospitalOrChamber: 'বালিজুড়ী আল-মদিনা হাসপাতাল, মাদারগঞ্জ',
    upazila: 'মাদারগঞ্জ',
    visitingDays: 'প্রতিদিন (শুক্রবার বাদে)',
    visitingHours: 'বিকাল ৩:০০ - রাত ৮:৩০',
    serialPhone: '01717-556677',
    fee: '৫০০ টাকা',
    roomNo: 'রুম নং ১০৫',
  },

  // Sadar & Medical College Specialists
  {
    id: 'doc-5',
    name: 'প্রফেসর ডাঃ এ কে এম নাজমুল করিম',
    qualification: 'এমবিবিএস, এফসিপিএস (মেডিসিন), এমএসিপি (ইউএসএ)',
    designation: 'বিভাগীয় প্রধান ও অধ্যাপক, মেডিসিন বিভাগ',
    specialty: 'মেডিসিন',
    hospitalOrChamber: 'শেখ হাসিনা মেডিকেল কলেজ ও হাসপাতাল / পপুলার ডায়াগনস্টিক, জামালপুর',
    upazila: 'জামালপুর সদর',
    visitingDays: 'শনিবার - বুধবার',
    visitingHours: 'বিকাল ৪:০০ - রাত ৯:০০',
    serialPhone: '01712-998877',
    fee: '৮০০ টাকা',
    roomNo: 'চেম্বার নং ১০৪',
  },
  {
    id: 'doc-6',
    name: 'ডাঃ মোছাঃ সেলিনা পারভীন',
    qualification: 'এমবিবিএস, এফসিপিএস (অবস ও গাইনি), এমএস',
    designation: 'সিনিয়র কনসালট্যান্ট, গাইনি বিভাগ',
    specialty: 'গাইনি ও প্রসূতি',
    hospitalOrChamber: 'জামালপুর ২৫০ শয্যা জেনারেল হাসপাতাল / আল-রাজি হাসপাতাল',
    upazila: 'জামালপুর সদর',
    visitingDays: 'শনিবার - বৃহস্পতিবার',
    visitingHours: 'বিকাল ৩:৩০ - রাত ৮:০০',
    serialPhone: '01716-112233',
    fee: '৭০০ টাকা',
    roomNo: 'রুম নং ২০২',
  },
  {
    id: 'doc-7',
    name: 'ডাঃ মোহাম্মদ গোলাম রাব্বানী',
    qualification: 'এমবিবিএস, এমএস (জেনারেল সার্জারি), এফএসিএস (ইউএসএ)',
    designation: 'সহযোগী অধ্যাপক, সার্জারি বিভাগ',
    specialty: 'সার্জারি',
    hospitalOrChamber: 'শেখ হাসিনা মেডিকেল কলেজ / সেন্ট্রাল হাসপাতাল, জামালপুর',
    upazila: 'জামালপুর সদর',
    visitingDays: 'প্রতিদিন (শুক্রবার বিকাল বাদে)',
    visitingHours: 'বিকাল ৪:০০ - রাত ৮:৩০',
    serialPhone: '01712-456789',
    fee: '৮০০ টাকা',
    roomNo: 'চেম্বার নং ১২',
  },
  {
    id: 'doc-8',
    name: 'ডাঃ মাহমুদুর রহমান তারেক',
    qualification: 'এমবিবিএস, ডি-কার্ড (এনআইসিভিডি), এমডি (কার্ডিওলজি)',
    designation: 'হৃদরোগ ও রক্তচাপ বিশেষজ্ঞ',
    specialty: 'হৃদরোগ',
    hospitalOrChamber: 'জামালপুর ডায়াবেটিক সমিতি ও হাসপাতাল',
    upazila: 'জামালপুর সদর',
    visitingDays: 'শনিবার - বৃহস্পতিবার',
    visitingHours: 'সকাল ৯:০০ - বিকাল ৩:০০',
    serialPhone: '01720-654321',
    fee: '৬০০ টাকা',
    roomNo: 'কার্ডিওলজি ওপিডি',
  },
];

export interface OxygenPharmacySupplier {
  id: string;
  name: string;
  type: 'অক্সিজেন সিলিন্ডার সরবরাহকারী' | '২৪/৭ ফার্মেসি' | 'ব্লাড ট্রান্সফিউশন / ল্যাব';
  upazila: string;
  addressBn: string;
  phone: string;
  altPhone?: string;
  homeDelivery: boolean;
  cylinderSizes: string;
  notesBn: string;
}

export const OXYGEN_PHARMACY_SUPPLIERS: OxygenPharmacySupplier[] = [
  {
    id: 'ox-1',
    name: 'মাদারগঞ্জ জরুরি অক্সিজেন সেবা ও সিলিন্ডার ব্যাংক',
    type: 'অক্সিজেন সিলিন্ডার সরবরাহকারী',
    upazila: 'মাদারগঞ্জ',
    addressBn: 'বালিজুড়ী বাজার প্রধান সড়ক (আল-মদিনা ফার্মেসির পাশে), মাদারগঞ্জ',
    phone: '01717-556679',
    altPhone: '01730-324860',
    homeDelivery: true,
    cylinderSizes: '১.৪ ঘনমিটার ও ৬.৮ ঘনমিটার জ্যাম্বো সিলিন্ডার',
    notesBn: '২৪ ঘণ্টা হোম ডেলিভারি ও জরুরি রিফিল সুবিধা। সাথে ফ্লো-মিটার ও নেবুলাইজার মাস্ক সরবরাহ।',
  },
  {
    id: 'ox-2',
    name: 'বালিজুড়ী সেন্ট্রাল ২৪ ঘণ্টা মডেল ফার্মেসি',
    type: '২৪/৭ ফার্মেসি',
    upazila: 'মাদারগঞ্জ',
    addressBn: 'মাদারগঞ্জ ৫০ শয্যা হাসপাতাল গেটের বিপরীতে, বালিজুড়ী',
    phone: '01712-990088',
    homeDelivery: true,
    cylinderSizes: 'জরুরি অক্সিজেন সিলিন্ডার মজুদ আছে',
    notesBn: 'সকল প্রকার জরুরি জীবন রক্ষাকারী ইনজেকশন, স্যালাইন ও সাপের বিষের ওষুধ সার্বক্ষণিক মজুদ।',
  },
  {
    id: 'ox-3',
    name: 'জামালপুর রেড ক্রিসেন্ট অক্সিজেন ও রক্ত সেবা কেন্দ্র',
    type: 'অক্সিজেন সিলিন্ডার সরবরাহকারী',
    upazila: 'জামালপুর সদর',
    addressBn: 'কালেক্টরেট চত্বর, ডিসি অফিস মোড়, জামালপুর',
    phone: '01718-223344',
    altPhone: '01912-887766',
    homeDelivery: true,
    cylinderSizes: 'সকল সাইজের জরুরি সিলিন্ডার ও রিফিল',
    notesBn: 'স্বল্প ভাড়ায় বা দরিদ্র রোগীদের বিনামূল্যে জরুরি অক্সিজেন সিলিন্ডার সরবরাহ।',
  },
  {
    id: 'ox-4',
    name: 'মেডিসিন পয়েন্ট ২৪ ঘণ্টা ফার্মেসি (সদর হাসপাতাল মোড়)',
    type: '২৪/৭ ফার্মেসি',
    upazila: 'জামালপুর সদর',
    addressBn: 'হাসপাতাল রোড, বকুলতলা মোড়, জামালপুর',
    phone: '01715-442211',
    homeDelivery: false,
    cylinderSizes: 'জরুরি অক্সিজেন ও ক্যানুলা উপলব্ধ',
    notesBn: '২৫০ শয্যা জেনারেল হাসপাতালের জরুরি গেটের সামনে দিনরাত ২৪ ঘণ্টা খোলা।',
  },
];
