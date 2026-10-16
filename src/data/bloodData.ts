import { UpazilaName } from './hospitalsData';

export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';

export const BLOOD_GROUPS: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

export interface BloodDonor {
  id: string;
  name: string;
  phone: string;
  bloodGroup: BloodGroup;
  upazila: UpazilaName;
  areaBn: string;
  lastDonationDate: string; // YYYY-MM-DD
  totalDonations: number;
  isAvailable: boolean;
  notesBn?: string;
}

export interface BloodRequest {
  id: string;
  patientName: string;
  bloodGroup: BloodGroup;
  bagsNeeded: number;
  hospitalName: string;
  upazila: UpazilaName;
  contactPerson: string;
  contactPhone: string;
  urgency: 'খুব জরুরি (Immediate)' | 'আজকের মধ্যে (Today)' | 'আগামীকাল (Tomorrow)';
  reasonBn: string;
  dateNeeded: string;
  status: 'সক্রিয় (Active)' | 'রক্তদাতা পাওয়া গেছে (Fulfilled)';
  postedAt: string;
}

export const INITIAL_BLOOD_DONORS: BloodDonor[] = [
  {
    id: 'donor-1',
    name: 'তানভীর আহমেদ',
    phone: '01719-234567',
    bloodGroup: 'O+',
    upazila: 'জামালপুর সদর',
    areaBn: 'বকুলতলা, জামালপুর সদর',
    lastDonationDate: '2026-06-10', // > 90 days ago
    totalDonations: 8,
    isAvailable: true,
    notesBn: 'নিয়মিত রক্তদাতা, সদর হাসপাতালের আশেপাশে দ্রুত পৌঁছাতে পারব।',
  },
  {
    id: 'donor-2',
    name: 'মাহমুদুল হাসান শুভ',
    phone: '01823-456789',
    bloodGroup: 'A+',
    upazila: 'জামালপুর সদর',
    areaBn: 'দেওয়ানপাড়া, সদর',
    lastDonationDate: '2026-05-15',
    totalDonations: 6,
    isAvailable: true,
    notesBn: 'যেকোনো জরুরি প্রয়োজনে কল করুন।',
  },
  {
    id: 'donor-3',
    name: 'ফারহানা ইসলাম তন্বী',
    phone: '01912-345678',
    bloodGroup: 'B+',
    upazila: 'জামালপুর সদর',
    areaBn: 'কাচারিপাড়া, কোর্ট রোড',
    lastDonationDate: '2026-07-01',
    totalDonations: 4,
    isAvailable: true,
    notesBn: 'মা ও শিশু হাসপাতাল বা জেনারেল হাসপাতালে রক্তদান সম্ভব।',
  },
  {
    id: 'donor-4',
    name: 'শাকিল চৌধুরী',
    phone: '01735-889900',
    bloodGroup: 'AB+',
    upazila: 'সরিষাবাড়ী',
    areaBn: 'শিমলা বাজার, সরিষাবাড়ী',
    lastDonationDate: '2026-04-20',
    totalDonations: 5,
    isAvailable: true,
    notesBn: 'সরিষাবাড়ী বা জামালপুর সদরে যেতে পারব।',
  },
  {
    id: 'donor-5',
    name: 'আরিফুল ইসলাম রাজু',
    phone: '01711-667788',
    bloodGroup: 'O-',
    upazila: 'জামালপুর সদর',
    areaBn: 'নান্দিনা, জামালপুর',
    lastDonationDate: '2026-06-18',
    totalDonations: 9,
    isAvailable: true,
    notesBn: 'দুর্লভ O নেগেটিভ রক্ত। জরুরি অপারেশনের জন্য প্রস্তুত।',
  },
  {
    id: 'donor-6',
    name: 'সোহেল রানা',
    phone: '01742-112233',
    bloodGroup: 'B+',
    upazila: 'মেলান্দহ',
    areaBn: 'মেলান্দহ বাজার',
    lastDonationDate: '2026-05-28',
    totalDonations: 3,
    isAvailable: true,
    notesBn: 'মেলান্দহ উপজেলা হাসপাতাল ও আশেক মাহমুদ কলেজ চত্বর।',
  },
  {
    id: 'donor-7',
    name: 'নাজমুল করিম',
    phone: '01798-554433',
    bloodGroup: 'A-',
    upazila: 'ইসলামপুর',
    areaBn: 'ইসলামপুর কলেজ মোড়',
    lastDonationDate: '2026-06-05',
    totalDonations: 4,
    isAvailable: true,
    notesBn: 'ইসলামপুর ও সংলগ্ন এলাকায় রক্তের প্রয়োজন হলে ডাকবেন।',
  },
  {
    id: 'donor-8',
    name: 'জাহিদ হাসান',
    phone: '01855-778899',
    bloodGroup: 'AB-',
    upazila: 'জামালপুর সদর',
    areaBn: 'রাণাগাছা, জামালপুর',
    lastDonationDate: '2026-05-02',
    totalDonations: 5,
    isAvailable: true,
    notesBn: 'শেখ হাসিনা মেডিকেল কলেজের কাছে অবস্থান। দুর্লভ এবি নেগেটিভ।',
  },
  {
    id: 'donor-9',
    name: 'মিজানুর রহমান',
    phone: '01728-990022',
    bloodGroup: 'O+',
    upazila: 'মাদারগঞ্জ',
    areaBn: 'বালিজুড়ী বাজার',
    lastDonationDate: '2026-06-12',
    totalDonations: 7,
    isAvailable: true,
    notesBn: 'বালিজুড়ী ও মাদারগঞ্জ উপজেলায় রোগী থাকলে জানাবেন।',
  },
  {
    id: 'donor-10',
    name: 'কামরুল আহসান',
    phone: '01750-667788',
    bloodGroup: 'B-',
    upazila: 'দেওয়ানগঞ্জ',
    areaBn: 'দেওয়ানগঞ্জ জংশন এলাকা',
    lastDonationDate: '2026-06-25',
    totalDonations: 3,
    isAvailable: true,
    notesBn: 'বি নেগেটিভ ডোনার। প্রস্তুত আছি।',
  },
  {
    id: 'donor-11',
    name: 'রাশেদুল আলম',
    phone: '01716-443355',
    bloodGroup: 'A+',
    upazila: 'বকশীগঞ্জ',
    areaBn: 'বকশীগঞ্জ থানা সংলগ্ন',
    lastDonationDate: '2026-05-30',
    totalDonations: 6,
    isAvailable: true,
    notesBn: 'বকশীগঞ্জ ৫০ শয্যা হাসপাতালের কাছাকাছি আছি।',
  },
];

export const INITIAL_BLOOD_REQUESTS: BloodRequest[] = [
  {
    id: 'req-1',
    patientName: 'সালমা বেগম (প্রসূতি রোগী)',
    bloodGroup: 'B+',
    bagsNeeded: 2,
    hospitalName: 'জামালপুর ২৫০ শয্যা জেনারেল হাসপাতাল',
    upazila: 'জামালপুর সদর',
    contactPerson: 'আফজাল হোসেন (স্বজন)',
    contactPhone: '01712-445566',
    urgency: 'খুব জরুরি (Immediate)',
    reasonBn: 'জরুরি সিজারিয়ান অপারেশন চলাকালীন রক্তের তীব্র সংকট।',
    dateNeeded: 'আজকে জরুরি',
    status: 'সক্রিয় (Active)',
    postedAt: '১০ মিনিট আগে',
  },
  {
    id: 'req-2',
    patientName: 'মো. রফিকুল ইসলাম (দুর্ঘটনা)',
    bloodGroup: 'O+',
    bagsNeeded: 3,
    hospitalName: 'শেখ হাসিনা মেডিকেল কলেজ ও হাসপাতাল',
    upazila: 'জামালপুর সদর',
    contactPerson: 'তারেক রহমান (ভাই)',
    contactPhone: '01723-998877',
    urgency: 'খুব জরুরি (Immediate)',
    reasonBn: 'সড়ক দুর্ঘটনায় অতিরিক্ত রক্তক্ষরণ, অর্থোপেডিক ওটি চলছে।',
    dateNeeded: 'এখনই প্রয়োজন',
    status: 'সক্রিয় (Active)',
    postedAt: '৩৫ মিনিট আগে',
  },
  {
    id: 'req-3',
    patientName: 'শিশু ফাহিম (থ্যালাসেমিয়া)',
    bloodGroup: 'A+',
    bagsNeeded: 1,
    hospitalName: 'রেড ক্রিসেন্ট ব্লাড সেন্টার / সদর হাসপাতাল',
    upazila: 'জামালপুর সদর',
    contactPerson: 'আনোয়ার হোসেন (বাবা)',
    contactPhone: '01815-667788',
    urgency: 'আজকের মধ্যে (Today)',
    reasonBn: 'মাসিক নিয়মিত রক্ত পরিবর্তন প্রয়োজন। হিমোগ্লোবিন ৫.২ এ নেমেছে।',
    dateNeeded: 'আজ বিকাল ৫টার মধ্যে',
    status: 'সক্রিয় (Active)',
    postedAt: '২ ঘণ্টা আগে',
  },
  {
    id: 'req-4',
    patientName: 'মোছাঃ জাহানারা বেগম',
    bloodGroup: 'O-',
    bagsNeeded: 1,
    hospitalName: 'পপুলার হাসপাতাল ও ডায়াগনস্টিক',
    upazila: 'জামালপুর সদর',
    contactPerson: 'কবির মাহমুদ',
    contactPhone: '01718-332211',
    urgency: 'খুব জরুরি (Immediate)',
    reasonBn: 'ল্যাপারোস্কপিক গলব্লাডার অপারেশন। ও নেগেটিভ দুর্লভ রক্ত প্রয়োজন।',
    dateNeeded: 'জরুরি ভিত্তিতে',
    status: 'সক্রিয় (Active)',
    postedAt: '৩ ঘণ্টা আগে',
  },
];

// Helper to check 90-day eligibility logic (as specified in user prompt image)
export function getDonationEligibility(lastDonationDateStr: string) {
  if (!lastDonationDateStr) {
    return { isEligible: true, daysLeft: 0, daysSince: 999 };
  }
  const lastDate = new Date(lastDonationDateStr);
  const today = new Date('2026-10-15'); // Using environment baseline date
  const diffTime = today.getTime() - lastDate.getTime();
  const daysSince = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const minInterval = 90; // 90 days required between blood donations

  if (daysSince >= minInterval) {
    return {
      isEligible: true,
      daysLeft: 0,
      daysSince,
      statusLabelBn: 'রক্তদানে প্রস্তুত',
      statusSubBn: `${daysSince} দিন আগে শেষ রক্তদান`,
    };
  } else {
    const daysLeft = minInterval - daysSince;
    return {
      isEligible: false,
      daysLeft,
      daysSince,
      statusLabelBn: 'বিশ্রাম কালীন',
      statusSubBn: `আর ${daysLeft} দিন পর রক্ত দিতে পারবেন`,
    };
  }
}
