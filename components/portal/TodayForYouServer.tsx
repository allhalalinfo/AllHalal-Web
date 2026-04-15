import { unstable_cache } from "next/cache";
import TodayForYouClient from "@/components/portal/TodayForYou";
import {
  normalizeCalculationMethod,
  type PrayerTimes,
  type TodayForYouInitialData,
} from "@/lib/todayForYou";
import { DEFAULT_LOCATION } from "@/types/location";

// 🔧 OPTIMIZATION (Phase 2): Wrap in unstable_cache for cross-request deduplication
// Multiple requests to homepage within same time window will reuse same data
// Saves 3-5% of Fast Origin Transfer
const getCachedPrayerData = unstable_cache(
  async (locale: string): Promise<TodayForYouInitialData | null> => {
    try {
      const language = locale === "ru" ? "ru" : "en";
      const prayerUrl = new URL("https://api.allhalal.info/api/v1/prayer-times");
      prayerUrl.searchParams.set("lat", String(DEFAULT_LOCATION.latitude));
      prayerUrl.searchParams.set("lon", String(DEFAULT_LOCATION.longitude));
      const tomorrowPrayerUrl = new URL("https://api.allhalal.info/api/v1/prayer-times");
      tomorrowPrayerUrl.searchParams.set("lat", String(DEFAULT_LOCATION.latitude));
      tomorrowPrayerUrl.searchParams.set("lon", String(DEFAULT_LOCATION.longitude));
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrowPrayerUrl.searchParams.set("date", tomorrow.toISOString().split("T")[0]);
      const calendarUrl = new URL("https://api.allhalal.info/api/v1/calendar/events");
      calendarUrl.searchParams.set("language", language);
      calendarUrl.searchParams.set("lat", String(DEFAULT_LOCATION.latitude));
      calendarUrl.searchParams.set("lon", String(DEFAULT_LOCATION.longitude));

      const [prayerResponse, tomorrowPrayerResponse, calendarResponse] = await Promise.allSettled([
        fetch(prayerUrl.toString(), {
          headers: { Accept: "application/json", "X-Source": "web" },
          next: { revalidate: 3600 },
        }).then((response) => response.json()),
        fetch(tomorrowPrayerUrl.toString(), {
          headers: { Accept: "application/json", "X-Source": "web" },
          next: { revalidate: 3600 },
        }).then((response) => response.json()),
        fetch(calendarUrl.toString(), {
          headers: { Accept: "application/json", "X-Source": "web" },
          next: { revalidate: 3600 },
        }).then((response) => response.json()),
      ]);

      if (prayerResponse.status !== "fulfilled" || prayerResponse.value?.status !== "success") {
        return null;
      }

      const times = prayerResponse.value.data?.times;
      if (!times) {
        return null;
      }

      const timings: PrayerTimes = {
        Fajr: times.fajr,
        Sunrise: times.sunrise,
        Dhuhr: times.dhuhr,
        Asr: times.asr,
        Maghrib: times.maghrib,
        Isha: times.isha,
      };

      let tomorrowTimings: PrayerTimes | null = null;
      const tomorrowTimes = tomorrowPrayerResponse.status === "fulfilled" ? tomorrowPrayerResponse.value?.data?.times : null;
      if (tomorrowPrayerResponse.status === "fulfilled" && tomorrowPrayerResponse.value?.status === "success" && tomorrowTimes) {
        tomorrowTimings = {
          Fajr: tomorrowTimes.fajr,
          Sunrise: tomorrowTimes.sunrise,
          Dhuhr: tomorrowTimes.dhuhr,
          Asr: tomorrowTimes.asr,
          Maghrib: tomorrowTimes.maghrib,
          Isha: tomorrowTimes.isha,
        };
      }

      let nextEvent: TodayForYouInitialData["nextEvent"] = null;
      let upcomingEvents: TodayForYouInitialData["upcomingEvents"] = [];
      if (calendarResponse.status === "fulfilled" && calendarResponse.value?.status === "success") {
        const today = new Date().toISOString().split("T")[0];
        upcomingEvents = (calendarResponse.value.data?.events || []).filter(
          (event: { date: string }) => event.date >= today
        );
        nextEvent = upcomingEvents[0] || null;
      }

      return {
        location: DEFAULT_LOCATION,
        timings,
        tomorrowTimings,
        calculationMethod: normalizeCalculationMethod(
          prayerResponse.value.data?.calculation_method?.name
        ),
        nextEvent,
        upcomingEvents,
      };
    } catch {
      return null;
    }
  },
  ['today-for-you-data'], // Cache key
  {
    revalidate: 3600, // 1 hour
    tags: ['prayer-times', 'calendar-events'],
  }
);

async function fetchInitialTodayForYouData(locale: string): Promise<TodayForYouInitialData | null> {
  return getCachedPrayerData(locale);
}

export default async function TodayForYouServer({ locale }: { locale: string }) {
  const initialData = await fetchInitialTodayForYouData(locale);

  return <TodayForYouClient locale="en" initialData={initialData} />;
}
