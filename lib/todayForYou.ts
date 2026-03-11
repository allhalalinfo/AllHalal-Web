import type { UserLocation } from "@/types/location";

export type PrayerTimes = {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
};

export type PrayerListItem = {
  id: string;
  name: string;
  time: string;
  status: string;
};

export type NextPrayerInfo = {
  name: string;
  countdown: string;
  progressPct: number;
};

export type TodayForYouInitialData = {
  location: UserLocation;
  timings: PrayerTimes;
  tomorrowTimings?: PrayerTimes | null;
  calculationMethod: string;
  nextEvent: {
    date: string;
    emoji?: string;
    title: string;
    title_ar?: string;
  } | null;
  upcomingEvents: Array<{
    date: string;
    emoji?: string;
    title: string;
    title_ar?: string;
  }>;
};

export function normalizeCalculationMethod(name?: string) {
  return (
    name
      ?.replace("University, Makkah", "")
      ?.replace("Umm Al-Qura", "Umm Al-Qura")
      ?.trim() || "Umm Al-Qura"
  );
}

export function locationsMatch(a?: UserLocation | null, b?: UserLocation | null) {
  if (!a || !b) {
    return false;
  }

  return (
    Math.abs(a.latitude - b.latitude) < 0.0001 &&
    Math.abs(a.longitude - b.longitude) < 0.0001
  );
}

export function buildPrayerState(
  timings: PrayerTimes,
  now = new Date()
) {
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const prayers = [
    { id: "fajr", name: "Fajr", time: timings.Fajr },
    { id: "sunrise", name: "Sunrise", time: timings.Sunrise },
    { id: "dhuhr", name: "Dhuhr", time: timings.Dhuhr },
    { id: "asr", name: "Asr", time: timings.Asr },
    { id: "maghrib", name: "Maghrib", time: timings.Maghrib },
    { id: "isha", name: "Isha", time: timings.Isha },
  ];

  let nextIndex = 0;
  let minDiff = Number.POSITIVE_INFINITY;

  const prayerMinutesArray = prayers.map((prayer) => {
    const [hours, minutes] = prayer.time.split(":").map(Number);
    return hours * 60 + minutes;
  });

  for (let index = 0; index < prayerMinutesArray.length; index += 1) {
    const diff = prayerMinutesArray[index] - currentMinutes;
    if (diff > 0 && diff < minDiff) {
      minDiff = diff;
      nextIndex = index;
    }
  }

  let isNextTomorrow = false;
  if (minDiff === Number.POSITIVE_INFINITY) {
    nextIndex = 0;
    minDiff = 24 * 60 - currentMinutes + prayerMinutesArray[0];
    isNextTomorrow = true;
  }

  const hoursLeft = Math.floor(minDiff / 60);
  const minsLeft = minDiff % 60;
  const countdown = `${hoursLeft > 0 ? `${hoursLeft}h ` : ""}${minsLeft}m`;

  const prevIndex = nextIndex === 0 ? prayers.length - 1 : nextIndex - 1;
  let prevMinutes = prayerMinutesArray[prevIndex];
  let nextMinutes = prayerMinutesArray[nextIndex];

  if (isNextTomorrow) {
    nextMinutes += 24 * 60;
  } else if (nextIndex === 0 && currentMinutes < prayerMinutesArray[0]) {
    prevMinutes -= 24 * 60;
  }

  const totalDuration = nextMinutes - prevMinutes;
  const elapsed = currentMinutes - prevMinutes;
  const progressPct = Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));

  const prayersList: PrayerListItem[] = prayers.map((prayer, index) => {
    let status = "future";
    if (isNextTomorrow) {
      status = "past";
    } else if (index < nextIndex) {
      status = "past";
    } else if (index === nextIndex) {
      status = "next";
    }

    return { ...prayer, status };
  });

  const nextPrayerInfo: NextPrayerInfo = {
    name: prayers[nextIndex].name,
    countdown,
    progressPct,
  };

  return { prayersList, nextPrayerInfo };
}
