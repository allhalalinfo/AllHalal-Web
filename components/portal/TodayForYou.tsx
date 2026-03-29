"use client";

import { useEffect, useRef, useState } from "react";
import { useUserLocation } from "@/hooks/useUserLocation";
import LocationSelector from "@/components/ui/LocationSelector";
import {
  buildPrayerState,
  locationsMatch,
  normalizeCalculationMethod,
  type PrayerListItem,
  type PrayerTimes,
  type TodayForYouInitialData,
} from "@/lib/todayForYou";

const METHOD_OPTIONS = [
  { value: 0, label: "Auto by location" },
  { value: 1, label: "University of Islamic Sciences, Karachi" },
  { value: 2, label: "Islamic Society of North America (ISNA)" },
  { value: 3, label: "Muslim World League (MWL)" },
  { value: 4, label: "Umm Al-Qura University, Makkah" },
  { value: 5, label: "Egyptian General Authority of Survey" },
  { value: 13, label: "Diyanet (Turkey)" },
  { value: 14, label: "Spiritual Administration of Muslims of Russia (DUM RF)" },
];

async function readJsonResponse(response: Response) {
  const contentType = response.headers.get("content-type") || "";
  const bodyText = await response.text();

  if (!response.ok || !contentType.includes("application/json")) {
    throw new Error(`Expected JSON, got ${response.status} ${contentType || "unknown content type"}: ${bodyText.slice(0, 120)}`);
  }

  return JSON.parse(bodyText);
}

function getQibla(lat: number, lng: number) {
  const makkahLat = 21.422487 * Math.PI / 180;
  const makkahLng = 39.826206 * Math.PI / 180;
  const latRad = lat * Math.PI / 180;
  const lngRad = lng * Math.PI / 180;

  const y = Math.sin(makkahLng - lngRad);
  const x = Math.cos(latRad) * Math.tan(makkahLat) - Math.sin(latRad) * Math.cos(makkahLng - lngRad);

  const qibla = Math.atan2(y, x) * 180 / Math.PI;
  return (qibla + 360) % 360;
}

function getCompassDirection(angle: number) {
  const directions = ["North", "North-East", "East", "South-East", "South", "South-West", "West", "North-West"];
  const index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;
  return directions[index];
}

export default function TodayForYou({
  locale,
  initialData,
}: {
  locale: string;
  initialData?: TodayForYouInitialData | null;
}) {
  const { location, error: locationError, setLocation, requestGeolocation } = useUserLocation();
  const [hijriDate, setHijriDate] = useState("Loading...");
  const initialPrayerState = initialData?.timings ? buildPrayerState(initialData.timings) : null;
  const [prayersList, setPrayersList] = useState(initialPrayerState?.prayersList || []);
  const [nextPrayerInfo, setNextPrayerInfo] = useState(
    initialPrayerState?.nextPrayerInfo || { name: "Loading prayer times", countdown: "--", progressPct: 0 }
  );
  const [tomorrowPrayersList, setTomorrowPrayersList] = useState<PrayerListItem[]>(
    initialData?.tomorrowTimings
      ? [
          { id: "fajr", name: "Fajr", time: initialData.tomorrowTimings.Fajr, status: "future" },
          { id: "sunrise", name: "Sunrise", time: initialData.tomorrowTimings.Sunrise, status: "future" },
          { id: "dhuhr", name: "Dhuhr", time: initialData.tomorrowTimings.Dhuhr, status: "future" },
          { id: "asr", name: "Asr", time: initialData.tomorrowTimings.Asr, status: "future" },
          { id: "maghrib", name: "Maghrib", time: initialData.tomorrowTimings.Maghrib, status: "future" },
          { id: "isha", name: "Isha", time: initialData.tomorrowTimings.Isha, status: "future" },
        ]
      : []
  );
  const [nextEvent, setNextEvent] = useState<any>(initialData?.nextEvent || null);
  const [upcomingEvents, setUpcomingEvents] = useState(initialData?.upcomingEvents || []);
  const [qiblaDirection, setQiblaDirection] = useState("North-East");
  const [currentTime, setCurrentTime] = useState("");
  const [gregorianDate, setGregorianDate] = useState("");
  const [nextEventCountdown, setNextEventCountdown] = useState("");
  const [calculationMethod, setCalculationMethod] = useState(initialData?.calculationMethod || "Umm Al-Qura");
  const [prayerLoading, setPrayerLoading] = useState(!initialData?.timings);
  const [selectedMethod, setSelectedMethod] = useState<number>(0);
  const [methodMenuOpen, setMethodMenuOpen] = useState(false);
  const localeCode = locale === "ru" ? "ru-RU" : "en-US";
  const hasConsumedInitialData = useRef(Boolean(initialData?.timings));
  const prefetchedTimings = initialData?.timings;
  const prefetchedTomorrowTimings = initialData?.tomorrowTimings;
  const prefetchedLocation = initialData?.location;
  const prefetchedCalculationMethod = initialData?.calculationMethod;
  const prefetchedNextEvent = initialData?.nextEvent;
  const prefetchedUpcomingEvents = initialData?.upcomingEvents;
  const initialNextEventDate = initialData?.nextEvent?.date;

  useEffect(() => {
    try {
      const hDate = new Intl.DateTimeFormat("en-US-u-ca-islamic", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date());
      setHijriDate(hDate);
    } catch {
      setHijriDate("Islamic Date");
    }

    setCurrentTime(
      new Intl.DateTimeFormat(localeCode, {
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date())
    );

    setGregorianDate(
      new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date())
    );

    if (initialNextEventDate) {
      const now = new Date();
      const target = new Date(initialNextEventDate);
      const diffDays = Math.max(0, Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
      setNextEventCountdown(diffDays === 0 ? "Today" : `In ${diffDays} day${diffDays === 1 ? "" : "s"}`);
    }
  }, [initialNextEventDate, localeCode]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentTime(
        new Intl.DateTimeFormat(localeCode, {
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date())
      );
    }, 30000);

    return () => window.clearInterval(interval);
  }, [localeCode]);

  useEffect(() => {
    if (!location) return;

    const angle = getQibla(location.latitude, location.longitude);
    setQiblaDirection(getCompassDirection(angle));

    let countdownInterval: number | null = null;

    const fetchWidgetData = async (lat: number, lon: number, method: number) => {
      const language = locale === "ru" ? "ru" : "en";
      setPrayerLoading(true);
      setNextEvent(null);

      let prayerUrl = `/api/prayer-times?lat=${lat}&lon=${lon}`;
      let tomorrowPrayerUrl = `/api/prayer-times?lat=${lat}&lon=${lon}`;
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrowPrayerUrl += `&date=${tomorrow.toISOString().split("T")[0]}`;
      if (method !== 0) {
        prayerUrl += `&method=${method}`;
        tomorrowPrayerUrl += `&method=${method}`;
      }

      const [prayerResult, tomorrowPrayerResult, calendarResult] = await Promise.allSettled([
        fetch(prayerUrl).then(readJsonResponse),
        fetch(tomorrowPrayerUrl).then(readJsonResponse),
        fetch(`/api/calendar-events?language=${language}&lat=${lat}&lon=${lon}`).then(readJsonResponse),
      ]);

      if (prayerResult.status === "fulfilled" && prayerResult.value.status === "success") {
        const times = prayerResult.value.data.times;
        const timings: PrayerTimes = {
          Fajr: times.fajr,
          Sunrise: times.sunrise,
          Dhuhr: times.dhuhr,
          Asr: times.asr,
          Maghrib: times.maghrib,
          Isha: times.isha,
        };

        setCalculationMethod(normalizeCalculationMethod(prayerResult.value.data.calculation_method?.name));

        const snapshot = buildPrayerState(timings, new Date());
        setPrayersList(snapshot.prayersList);
        setNextPrayerInfo(snapshot.nextPrayerInfo);
        countdownInterval = window.setInterval(() => {
          const nextSnapshot = buildPrayerState(timings, new Date());
          setPrayersList(nextSnapshot.prayersList);
          setNextPrayerInfo(nextSnapshot.nextPrayerInfo);
        }, 60000);
      } else if (prayerResult.status === "rejected") {
        console.error("Failed to fetch prayer data:", prayerResult.reason);
        setPrayersList([]);
        setNextPrayerInfo({
          name: "Prayer times unavailable",
          countdown: "--",
          progressPct: 0,
        });
      }

      if (tomorrowPrayerResult.status === "fulfilled" && tomorrowPrayerResult.value.status === "success") {
        const tomorrowTimes = tomorrowPrayerResult.value.data.times;
        setTomorrowPrayersList([
          { id: "fajr", name: "Fajr", time: tomorrowTimes.fajr, status: "future" },
          { id: "sunrise", name: "Sunrise", time: tomorrowTimes.sunrise, status: "future" },
          { id: "dhuhr", name: "Dhuhr", time: tomorrowTimes.dhuhr, status: "future" },
          { id: "asr", name: "Asr", time: tomorrowTimes.asr, status: "future" },
          { id: "maghrib", name: "Maghrib", time: tomorrowTimes.maghrib, status: "future" },
          { id: "isha", name: "Isha", time: tomorrowTimes.isha, status: "future" },
        ]);
      } else {
        setTomorrowPrayersList([]);
      }

      if (calendarResult.status === "fulfilled" && calendarResult.value.status === "success" && calendarResult.value.data.events?.length > 0) {
        const today = new Date().toISOString().split("T")[0];
        const upcomingList = calendarResult.value.data.events.filter((event: any) => event.date >= today);
        setUpcomingEvents(upcomingList.slice(0, 6));
        const upcoming = upcomingList[0];
        if (upcoming) {
          setNextEvent(upcoming);
          const diffDays = Math.max(
            0,
            Math.ceil((new Date(upcoming.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
          );
          setNextEventCountdown(diffDays === 0 ? "Today" : `In ${diffDays} day${diffDays === 1 ? "" : "s"}`);
        }
      } else if (calendarResult.status === "fulfilled") {
        setUpcomingEvents([]);
        setNextEvent(null);
        setNextEventCountdown("");
      } else if (calendarResult.status === "rejected") {
        console.error("Failed to fetch calendar events:", calendarResult.reason);
      }

      setPrayerLoading(false);
    };

    if (
      hasConsumedInitialData.current &&
      prefetchedTimings &&
      locationsMatch(location, prefetchedLocation) &&
      selectedMethod === 0
    ) {
      const snapshot = buildPrayerState(prefetchedTimings, new Date());
      setPrayersList(snapshot.prayersList);
      setNextPrayerInfo(snapshot.nextPrayerInfo);
      if (prefetchedTomorrowTimings) {
        setTomorrowPrayersList([
          { id: "fajr", name: "Fajr", time: prefetchedTomorrowTimings.Fajr, status: "future" },
          { id: "sunrise", name: "Sunrise", time: prefetchedTomorrowTimings.Sunrise, status: "future" },
          { id: "dhuhr", name: "Dhuhr", time: prefetchedTomorrowTimings.Dhuhr, status: "future" },
          { id: "asr", name: "Asr", time: prefetchedTomorrowTimings.Asr, status: "future" },
          { id: "maghrib", name: "Maghrib", time: prefetchedTomorrowTimings.Maghrib, status: "future" },
          { id: "isha", name: "Isha", time: prefetchedTomorrowTimings.Isha, status: "future" },
        ]);
      } else {
        setTomorrowPrayersList([]);
      }
      setCalculationMethod(prefetchedCalculationMethod || "Umm Al-Qura");
      setNextEvent(prefetchedNextEvent || null);
      setUpcomingEvents(prefetchedUpcomingEvents || []);
      if (prefetchedNextEvent?.date) {
        const diffDays = Math.max(
          0,
          Math.ceil((new Date(prefetchedNextEvent.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
        );
        setNextEventCountdown(diffDays === 0 ? "Today" : `In ${diffDays} day${diffDays === 1 ? "" : "s"}`);
      } else {
        setNextEventCountdown("");
      }
      setPrayerLoading(false);
      hasConsumedInitialData.current = false;

      countdownInterval = window.setInterval(() => {
        const nextSnapshot = buildPrayerState(prefetchedTimings);
        setPrayersList(nextSnapshot.prayersList);
        setNextPrayerInfo(nextSnapshot.nextPrayerInfo);
      }, 60000);

      return () => {
        if (countdownInterval) {
          window.clearInterval(countdownInterval);
        }
      };
    }

    fetchWidgetData(location.latitude, location.longitude, selectedMethod);

    return () => {
      if (countdownInterval) {
        window.clearInterval(countdownInterval);
      }
    };
  }, [
    locale,
    location,
    prefetchedCalculationMethod,
    prefetchedLocation,
    prefetchedNextEvent,
    prefetchedUpcomingEvents,
    prefetchedTimings,
    prefetchedTomorrowTimings,
    selectedMethod,
  ]);

  const hasPrayerData = prayersList.length > 0;
  const tomorrowTimesByPrayer = new Map(tomorrowPrayersList.map((prayer) => [prayer.id, prayer.time]));

  return (
    <div className="mx-auto w-full max-w-[1180px] max-w-full rounded-[2rem] border border-white/10 bg-accent-navy text-text-inverse shadow-2xl relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 opacity-10 mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: "url('/assets/card-bg.png')", backgroundSize: "cover", backgroundPosition: "center" }}
      />

      <div className="relative z-10 p-4 md:p-5">
        <div className="mb-3 rounded-[1.15rem] border border-white/10 bg-white/5 px-4 py-3">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-[1.15fr_1fr_1fr_auto] xl:items-center">
            <div className="min-w-0 xl:pr-5">
              <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/45 mb-1.5">
                Location
              </div>
              <LocationSelector
                currentLocation={location}
                onLocationChange={setLocation}
                onRequestGeolocation={requestGeolocation}
              />
              <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80">
                <span className="h-2 w-2 rounded-full bg-accent-yellow" />
                Now {currentTime || "--:--"}
              </div>
            </div>

            <div className="min-w-0 xl:border-l xl:border-white/10 xl:pl-5">
              <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/45 mb-1.5">
                Prayer Method
              </div>
              <div className="text-sm md:text-base font-display font-bold leading-tight text-white truncate">
                {calculationMethod}
              </div>
              <button
                type="button"
                onClick={() => setMethodMenuOpen((open) => !open)}
                className="mt-2 inline-flex text-xs font-bold text-accent-yellow hover:text-white transition-colors"
              >
                Change
              </button>
              {methodMenuOpen && (
                <div className="mt-3 rounded-xl border border-white/10 bg-[#294655] p-2 shadow-xl">
                  <select
                    value={selectedMethod}
                    onChange={(event) => {
                      setSelectedMethod(Number(event.target.value));
                      setMethodMenuOpen(false);
                    }}
                    className="w-full rounded-lg bg-transparent px-2 py-2 text-sm text-white outline-none"
                  >
                    {METHOD_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value} className="bg-[#294655] text-white">
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="min-w-0 xl:border-l xl:border-white/10 xl:pl-5">
              <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/45 mb-1.5">
                Islamic Calendar
              </div>
              <div className="text-sm md:text-base font-display font-bold leading-tight text-white">
                {hijriDate}
              </div>
              <div className="mt-2 text-xs text-white/65">
                {gregorianDate || "Today"}
              </div>
            </div>

            {location && location.city === "Makkah" && !location.isAuto ? (
              <div className="xl:justify-self-end xl:border-l xl:border-white/10 xl:pl-5">
                <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/45 mb-1.5">
                  Qibla
                </div>
                <button
                  onClick={requestGeolocation}
                  className="bg-accent-yellow text-accent-navy px-4 py-2 rounded-full text-sm font-bold shadow-lg hover:scale-105 transition-transform"
                >
                  Allow location
                </button>
              </div>
            ) : location && (
              <div className="xl:justify-self-end xl:border-l xl:border-white/10 xl:pl-5">
                <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/45 mb-1.5">
                  Qibla Bearing
                </div>
                <div className="text-xl md:text-2xl font-display font-black text-accent-yellow">
                  {getQibla(location.latitude, location.longitude).toFixed(1)}°
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/60 mt-1">
                  {qiblaDirection}
                </div>
              </div>
            )}
          </div>
        </div>

        {locationError && (
          <div className="mb-3 rounded-xl border border-red-300/20 bg-red-300/10 px-4 py-3 text-sm text-red-200">
            <div className="font-semibold mb-1">{locationError}</div>
            {locationError.includes("denied") && (
              <div className="text-xs text-red-200/80 mt-2">
                On iPhone: Settings → Safari → Location → Allow for this site
              </div>
            )}
            {locationError.includes("unavailable") && (
              <div className="text-xs text-red-200/80 mt-2">
                Check if Location Services are enabled in device Settings
              </div>
            )}
            {locationError.includes("timed out") && (
              <div className="text-xs text-red-200/80 mt-2">
                GPS took too long to respond. Try searching your city manually.
              </div>
            )}
            <div className="text-xs text-red-200/70 mt-2">
              You can still search your city manually below.
            </div>
          </div>
        )}

        <div className="grid gap-3 xl:grid-cols-[1.55fr_0.95fr]">
          <div className="rounded-[1.35rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-4 md:p-5">
            <div className="grid gap-4 md:grid-cols-[8rem_1fr] md:items-center">
              <div className="relative w-32 h-32 md:w-[8.5rem] md:h-[8.5rem] mx-auto">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="4" className="text-white/10" />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    className="text-accent-yellow drop-shadow-[0_0_8px_rgba(252,211,77,0.55)] transition-all duration-1000 ease-in-out"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - nextPrayerInfo.progressPct / 100)}`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-white/55 text-[10px] font-bold uppercase tracking-wider mb-1">Starts in</span>
                  <span className="text-2xl font-mono font-bold text-white tracking-tight">{nextPrayerInfo.countdown}</span>
                </div>
              </div>

              <div className="text-center md:text-left">
                <div className="inline-flex items-center rounded-full border border-accent-yellow/25 bg-accent-yellow/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-accent-yellow mb-3">
                  {prayerLoading ? "Loading" : "Next prayer"}
                </div>
                <div className="text-3xl md:text-4xl font-black font-display text-accent-yellow tracking-tight">
                  {nextPrayerInfo.name}
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-1.5">
              {hasPrayerData && (
                <div className="flex items-center px-3 pb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40 sm:px-4">
                  <span className="flex-1">Prayer</span>
                  <div className="ml-auto grid w-[8.5rem] grid-cols-2 gap-x-3 text-[9px] sm:w-[11rem] sm:gap-x-6 sm:text-[10px] md:w-[12rem] md:gap-x-8">
                    <span className="text-left">Today</span>
                    <span className="text-left">Tomorrow</span>
                  </div>
                </div>
              )}
              {hasPrayerData ? (
                prayersList.map((prayer) => (
                  <div
                    key={prayer.id}
                    className={`flex items-center px-3 py-2.5 rounded-xl transition-colors sm:px-4 ${
                      prayer.status === "next"
                        ? "bg-accent-yellow/10 border border-accent-yellow/30"
                        : prayer.status === "past"
                          ? "opacity-50"
                          : "bg-white/5"
                    }`}
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
                      {prayer.status === "past" ? (
                        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      ) : prayer.status === "next" ? (
                        <div className="w-5 h-5 rounded-full bg-accent-yellow/30 border border-accent-yellow flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-accent-yellow animate-pulse" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-white/20" />
                      )}
                      <span
                        className={`min-w-0 text-xs sm:text-sm ${prayer.status === "next" ? "font-bold text-accent-yellow" : "font-medium text-white"}`}
                      >
                        {prayer.name}
                        {prayer.id === "sunrise" && (
                          <span className="ml-1 text-[9px] uppercase opacity-70 font-normal sm:ml-2 sm:text-[10px]">
                            (Not a prayer)
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="ml-2 grid w-[8.5rem] shrink-0 grid-cols-2 gap-x-3 sm:ml-auto sm:w-[11rem] sm:gap-x-6 md:w-[12rem] md:gap-x-8">
                      <div
                        className={`text-left font-mono text-xs font-bold tabular-nums sm:text-sm ${prayer.status === "next" ? "text-accent-yellow" : "text-white"}`}
                      >
                        {prayer.time}
                      </div>
                      <div className="text-left font-mono text-xs font-bold tabular-nums text-white/75 sm:text-sm">
                        {tomorrowTimesByPrayer.get(prayer.id) || "--"}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/70">
                  {prayerLoading
                    ? "Loading local prayer times..."
                  : "Prayer times could not be loaded right now. Try switching city or reloading."}
                </div>
              )}
            </div>
          </div>

          <div className="rounded-[1.35rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-4 md:p-5">
            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/45 mb-3">
              Islamic Calendar
            </div>

            {nextEvent ? (
              <div className="rounded-[1.1rem] border border-white/10 bg-white/5 p-4">
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent-yellow mb-2">
                  Next Islamic event
                </div>
                <div className="text-lg font-semibold leading-snug text-white">
                  {nextEvent.title}
                </div>
                <div className="mt-2 flex items-center justify-between gap-3 text-sm text-white/70">
                  <span>
                    {new Date(nextEvent.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80">
                    {nextEventCountdown || "Upcoming"}
                  </span>
                </div>
              </div>
            ) : (
              <div className="mt-5 rounded-[1.1rem] border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                Upcoming Islamic dates will appear here for your region.
              </div>
            )}

            {upcomingEvents.length > 1 && (
              <div className="mt-5 rounded-[1.1rem] border border-white/10 bg-white/5 p-4">
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/45 mb-3">
                  Upcoming Islamic dates
                </div>
                <div className="space-y-3">
                  {upcomingEvents.slice(1, 6).map((event: any) => (
                    <div key={`${event.date}-${event.title}`} className="flex items-start justify-between gap-3 border-b border-white/5 pb-3 last:border-b-0 last:pb-0">
                      <div className="min-w-0 text-sm text-white/85">{event.title}</div>
                      <div className="whitespace-nowrap text-sm text-white/60">
                        {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
