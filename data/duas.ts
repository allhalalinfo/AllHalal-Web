export type DuaCategory = {
  id: string;
  name: string;
  intro: string;
};

export const duaCategories: DuaCategory[] = [
  { id: 'morning-evening', name: 'Morning & Evening', intro: 'Start and end your day with the remembrance of Allah to seek His protection, blessings, and peace of mind.' },
  { id: 'travel', name: 'Travel & Movement', intro: 'Supplications for leaving the house, boarding a vehicle, and returning safely from journeys.' },
  { id: 'stress', name: 'Stress & Anxiety', intro: 'Seek comfort in Allah during times of hardship, worry, and emotional distress.' },
  { id: 'ramadan', name: 'Ramadan & Fasting', intro: 'Essential duas for breaking fast (Iftar), seeking forgiveness, and Laylatul Qadr.' }
];

export type Dua = {
  id: string;
  categoryId: string;
  arabic: string;
  transliteration: string;
  translation: string;
};

export const duas: Dua[] = [
  {
    id: 'waking-up',
    categoryId: 'morning-evening',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    transliteration: 'Alhamdu lillahil-lathee ahyana baAAda ma amatana wa-ilayhin-nushoor',
    translation: 'All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection.'
  },
  {
    id: 'leaving-home',
    categoryId: 'travel',
    arabic: 'بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    transliteration: 'Bismillahi, tawakkaltu AAalal-lahi, wala hawla wala quwwata illa billah',
    translation: 'In the name of Allah, I place my trust in Allah, and there is no might nor power except with Allah.'
  },
  {
    id: 'stress-anxiety',
    categoryId: 'stress',
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ',
    transliteration: 'Allahumma innee aAAoothu bika minal-hammi walhazan, wal-AAajzi walkasal, wal-bukhli waljubn, wa dalaAAid-dayni wa ghalabatir-rijal',
    translation: 'O Allah, I seek refuge in You from anxiety and sorrow, weakness and laziness, miserliness and cowardice, the burden of debts and from being overpowered by men.'
  },
  {
    id: 'iftar',
    categoryId: 'ramadan',
    arabic: 'ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ، وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ',
    transliteration: 'Dhahabaz-zama\'u, wabtallatil-AAurooqu, wathabatal-ajru inshaa-Allah',
    translation: 'The thirst is gone, the veins are moistened, and the reward is confirmed, if Allah wills.'
  }
];