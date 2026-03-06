export const dailyInspirations = [
  {
    type: "Quran",
    text: "So verily, with the hardship, there is relief.",
    source: "Surah Ash-Sharh 94:5",
  },
  {
    type: "Hadith",
    text: "The best among you are those who have the best manners and character.",
    source: "Sahih al-Bukhari 3559",
  },
  {
    type: "Dua",
    text: "O Allah, I ask You for beneficial knowledge, goodly provision and acceptable deeds.",
    source: "Sunan Ibn Majah 925",
  },
  {
    type: "Quran",
    text: "And He found you lost and guided [you].",
    source: "Surah Ad-Duhaa 93:7",
  },
  {
    type: "Hadith",
    text: "He who does not show mercy to others, will not be shown mercy.",
    source: "Sahih Muslim 7376",
  },
  {
    type: "Quran",
    text: "Indeed, Allah is with the patient.",
    source: "Surah Al-Baqarah 2:153",
  },
  {
    type: "Hadith",
    text: "Exchange gifts, as that will lead to increasing your love to one another.",
    source: "Al-Adab Al-Mufrad 594",
  }
];

// Helper to get a deterministic item based on the day of the year
export function getDailyInspiration() {
  if (typeof window === 'undefined') return dailyInspirations[0];
  
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  return dailyInspirations[dayOfYear % dailyInspirations.length];
}
