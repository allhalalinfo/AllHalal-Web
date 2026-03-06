"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getDailyInspiration } from "@/data/dailyInspiration";
import { useUserLocation } from "@/hooks/useUserLocation";
import LocationSelector from "@/components/ui/LocationSelector";

type PrayerTimes = {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
};

export default function TodayForYou({ locale }: { locale: string }) {
  const { location, isLoading: locationLoading, error: locationError, setLocation, requestGeolocation } = useUserLocation();
  const [hijriDate, setHijriDate] = useState("Loading...");
  const [prayersList, setPrayersList] = useState<Array<{ id: string, name: string, time: string, status: string }>>([]);
  const [nextPrayerInfo, setNextPrayerInfo] = useState({ name: "...", countdown: "...", progressPct: 0 });
  const [nextEvent, setNextEvent] = useState<any>(null);
  
  // Start with a safe default that matches the server
  const [inspiration, setInspiration] = useState({ type: "Hadith", text: "Loading daily inspiration...", source: "" });
  const [mounted, setMounted] = useState(false);
  const [qiblaAngle, setQiblaAngle] = useState(45);
  const [qiblaDirection, setQiblaDirection] = useState("North-East");
  const [isHadithExpanded, setIsHadithExpanded] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!location) return;
    
    // Calculate Qibla
    const getQibla = (lat: number, lng: number) => {
      const makkahLat = 21.422487 * Math.PI / 180;
      const makkahLng = 39.826206 * Math.PI / 180;
      const latRad = lat * Math.PI / 180;
      const lngRad = lng * Math.PI / 180;
      
      const y = Math.sin(makkahLng - lngRad);
      const x = Math.cos(latRad) * Math.tan(makkahLat) - Math.sin(latRad) * Math.cos(makkahLng - lngRad);
      
      let qibla = Math.atan2(y, x) * 180 / Math.PI;
      return (qibla + 360) % 360;
    };
    
    const getCompassDirection = (angle: number) => {
      const directions = ["North", "North-East", "East", "South-East", "South", "South-West", "West", "North-West"];
      const index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;
      return directions[index];
    };

    const angle = getQibla(location.latitude, location.longitude);
    setQiblaAngle(angle);
    setQiblaDirection(getCompassDirection(angle));

    const fetchPrayerData = async (lat: number, lon: number) => {
      try {
        // Fetch Prayer Times from our backend
        const prayerRes = await fetch(`https://api.allhalal.info/api/v1/prayer-times?lat=${lat}&lon=${lon}&madhhab=general`, {
          headers: { 'X-Source': 'web', 'Accept': 'application/json' }
        });
        const prayerData = await prayerRes.json();

        if (prayerData.status === "success") {
          // The API returns lowercase keys
          const times = prayerData.data.times;
          const timings: PrayerTimes = {
            Fajr: times.fajr,
            Sunrise: times.sunrise,
            Dhuhr: times.dhuhr,
            Asr: times.asr,
            Maghrib: times.maghrib,
            Isha: times.isha
          };
          
          // Format Hijri Date using native JS Intl API
          try {
            const hDate = new Intl.DateTimeFormat('en-US-u-ca-islamic', {day: 'numeric', month: 'long', year: 'numeric'}).format(new Date());
            setHijriDate(hDate);
          } catch (e) {
            setHijriDate("Islamic Date");
          }

          // Calculate Next Prayer
          calculateNextPrayer(timings);
          // Set interval to update countdown every minute
          const interval = setInterval(() => calculateNextPrayer(timings), 60000);
          
          // Also fetch calendar events and hadith in parallel
          fetchAdditionalData(lat, lon);
          
          return () => clearInterval(interval);
        }
      } catch (error) {
        console.error("Failed to fetch prayer data:", error);
      }
    };

    const fetchAdditionalData = async (lat: number, lon: number) => {
      try {
        // Fetch Hadith
        const hadithRes = await fetch(`https://api.allhalal.info/api/v1/hadith/of-the-day?language=${locale === 'ru' ? 'ru' : 'en'}`, {
          headers: { 'X-Source': 'web', 'Accept': 'application/json' }
        });
        const hadithData = await hadithRes.json();
        if (hadithData.status === "success") {
          setInspiration({
            type: "Hadith",
            text: hadithData.data.content.trim(),
            source: hadithData.data.reference || hadithData.data.source
          });
        }
        
        // Fetch Calendar Events
        const calRes = await fetch(`https://api.allhalal.info/api/v1/calendar/events?language=${locale === 'ru' ? 'ru' : 'en'}&lat=${lat}&lon=${lon}`, {
          headers: { 'X-Source': 'web', 'Accept': 'application/json' }
        });
        const calData = await calRes.json();
        if (calData.status === "success" && calData.data.events && calData.data.events.length > 0) {
          // Find the next upcoming event
          const today = new Date().toISOString().split('T')[0];
          const upcoming = calData.data.events.find((e: any) => e.date >= today);
          if (upcoming) setNextEvent(upcoming);
        }
      } catch (e) {
        console.error("Failed to fetch additional data:", e);
      }
    };

    const calculateNextPrayer = (timings: PrayerTimes) => {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      const prayers = [
        { id: 'fajr', name: "Fajr", time: timings.Fajr },
        { id: 'sunrise', name: "Sunrise", time: timings.Sunrise },
        { id: 'dhuhr', name: "Dhuhr", time: timings.Dhuhr },
        { id: 'asr', name: "Asr", time: timings.Asr },
        { id: 'maghrib', name: "Maghrib", time: timings.Maghrib },
        { id: 'isha', name: "Isha", time: timings.Isha },
      ];

      let nextIndex = 0;
      let minDiff = Infinity;

      const prayerMinutesArray = prayers.map(p => {
        const [h, m] = p.time.split(':').map(Number);
        return h * 60 + m;
      });

      for (let i = 0; i < prayerMinutesArray.length; i++) {
        const diff = prayerMinutesArray[i] - currentMinutes;
        if (diff > 0 && diff < minDiff) {
          minDiff = diff;
          nextIndex = i;
        }
      }

      // If all passed, next is Fajr tomorrow
      let isNextTomorrow = false;
      if (minDiff === Infinity) {
        nextIndex = 0; // Fajr
        minDiff = (24 * 60 - currentMinutes) + prayerMinutesArray[0];
        isNextTomorrow = true;
      }

      // Format countdown
      const hoursLeft = Math.floor(minDiff / 60);
      const minsLeft = minDiff % 60;
      const countdown = `${hoursLeft > 0 ? hoursLeft + 'h ' : ''}${minsLeft}m`;

      // Calculate progress percentage
      let prevIndex = nextIndex === 0 ? prayers.length - 1 : nextIndex - 1;
      let prevMinutes = prayerMinutesArray[prevIndex];
      let nextMinutes = prayerMinutesArray[nextIndex];
      let currentRel = currentMinutes;

      if (isNextTomorrow) {
        // We are between Isha and Midnight
        nextMinutes += 24 * 60; 
      } else if (nextIndex === 0 && currentMinutes < prayerMinutesArray[0]) {
        // We are between Midnight and Fajr
        prevMinutes -= 24 * 60;
      }

      const totalDuration = nextMinutes - prevMinutes;
      const elapsed = currentRel - prevMinutes;
      const progressPct = Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));

      // Build updated list with statuses
      const updatedPrayers = prayers.map((p, i) => {
        let status = 'future';
        if (isNextTomorrow) {
          status = 'past'; // All today's prayers are past
        } else {
          if (i < nextIndex) status = 'past';
          else if (i === nextIndex) status = 'next';
        }
        return { ...p, status };
      });

      setPrayersList(updatedPrayers);
      setNextPrayerInfo({
        name: prayers[nextIndex].name,
        countdown,
        progressPct
      });
    };

    fetchPrayerData(location.latitude, location.longitude);
  }, [location]);

  return (
    <div className="bg-accent-navy text-text-inverse rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 group">
      <div className="grid grid-cols-1 lg:grid-cols-3 relative">
        
        {/* Abstract Background Layer spanning the whole widget */}
        <div className="absolute inset-0 z-0 opacity-10 mix-blend-overlay pointer-events-none"
             style={{ backgroundImage: "url('/assets/card-bg.png')", backgroundSize: "cover", backgroundPosition: "center" }} />

        {/* COLUMN 1: PRAYER TIMES */}
        <div className="p-8 md:p-10 relative z-10 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 mb-3 text-xs font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Live Tracker
              </div>
              <LocationSelector 
                currentLocation={location}
                onLocationChange={setLocation}
                onRequestGeolocation={requestGeolocation}
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            {/* Top: Progress and Next Prayer - Modern UI */}
            <div className="mb-6 bg-gradient-to-br from-white/10 to-transparent rounded-[2rem] p-6 border border-white/10 text-center relative overflow-hidden shadow-lg group">
              {/* Animated Background Pulse */}
              <div className="absolute inset-0 bg-accent-yellow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              {/* Circular Progress Design instead of linear bar */}
              <div className="relative w-40 h-40 mx-auto mb-4">
                {/* SVG Circular Progress */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background Circle */}
                  <circle 
                    cx="50" cy="50" r="45" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="4" 
                    className="text-white/10"
                  />
                  {/* Foreground Circle (Progress) */}
                  <circle 
                    cx="50" cy="50" r="45" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="4" 
                    strokeLinecap="round"
                    className="text-accent-yellow drop-shadow-[0_0_8px_rgba(252,211,77,0.6)] transition-all duration-1000 ease-in-out"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - nextPrayerInfo.progressPct / 100)}`}
                  />
                </svg>
                
                {/* Inner Content (Timer) */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-white/60 text-[10px] font-bold uppercase tracking-wider mb-1">Starts in</span>
                  <span className="text-2xl md:text-3xl font-mono font-bold text-white tracking-tight">{nextPrayerInfo.countdown}</span>
                </div>
              </div>
              
              <div className="text-4xl md:text-5xl font-black font-display text-accent-yellow mb-1 tracking-tight drop-shadow-sm">{nextPrayerInfo.name}</div>
              <p className="text-white/40 text-[10px] font-medium uppercase tracking-widest">{nextPrayerInfo.progressPct.toFixed(0)}% elapsed</p>
            </div>

            {/* Bottom: List of prayers */}
            <div className="flex flex-col gap-1.5">
              {prayersList.map((prayer) => (
                <div key={prayer.id} className={`flex justify-between items-center px-4 py-2.5 rounded-xl transition-colors ${
                  prayer.status === 'next' ? 'bg-accent-yellow/10 border border-accent-yellow/30' : 
                  prayer.status === 'past' ? 'opacity-50' : 'bg-white/5'
                }`}>
                  <div className="flex items-center gap-3">
                    {prayer.status === 'past' ? (
                      <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    ) : prayer.status === 'next' ? (
                      <div className="w-5 h-5 rounded-full bg-accent-yellow/30 border border-accent-yellow flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-accent-yellow animate-pulse" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-white/20" />
                    )}
                    <span className={`font-medium text-sm ${prayer.status === 'next' ? 'text-accent-yellow font-bold' : 'text-white'}`}>
                      {prayer.name}
                      {prayer.id === 'sunrise' && <span className="ml-2 text-[10px] uppercase opacity-70 font-normal">(Not a prayer)</span>}
                    </span>
                  </div>
                  <div className={`font-mono text-sm font-bold ${prayer.status === 'next' ? 'text-accent-yellow' : 'text-white'}`}>
                    {prayer.time}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Link href={`/${locale}/prayer-times`} className="mt-6 text-sm font-bold text-accent-yellow hover:text-white transition-colors inline-flex items-center gap-1">
            View full prayer timetable &rarr;
          </Link>
        </div>

        {/* COLUMN 2: QIBLA & RAMADAN */}
        <div className="p-8 md:p-10 relative z-10 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between">
          <div>
            <div className="text-white/60 text-sm font-medium uppercase tracking-wider mb-2">
              Islamic Calendar
            </div>
            <div className="text-3xl font-bold font-display leading-tight mb-2">
              {hijriDate}
            </div>
            <div className="text-white/70">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            
            {nextEvent && (
              <div className="mt-6 bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-accent-yellow mb-1">
                  Upcoming Event
                </div>
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <div className="font-bold text-lg leading-tight mb-0.5">{nextEvent.emoji} {nextEvent.title}</div>
                    <div className="text-xs text-white/60">{nextEvent.title_ar}</div>
                  </div>
                  <div className="text-right whitespace-nowrap">
                    <div className="font-mono font-medium">{new Date(nextEvent.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-8 flex-1 flex flex-col justify-center">
            {location && location.city === "Makkah" && !location.isAuto ? (
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 text-center flex flex-col items-center justify-center h-full relative overflow-hidden">
                <svg className="w-8 h-8 text-white/40 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-sm text-white/70 mb-4 px-2">Allow location access to calculate Qibla direction and local prayer times accurately.</p>
                <button 
                  onClick={requestGeolocation}
                  className="bg-accent-yellow text-accent-navy px-5 py-2.5 rounded-full text-sm font-bold shadow-lg hover:scale-105 transition-transform"
                >
                  Allow Location
                </button>
                {locationError && (
                  <p className="text-red-400 text-xs mt-3 bg-red-400/10 px-3 py-1.5 rounded-lg border border-red-400/20">
                    {locationError === "User denied Geolocation" ? "Location access denied. Please enable it in your browser settings or search manually." : "Could not fetch location. Please try searching your city manually."}
                  </p>
                )}
              </div>
            ) : location && (
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10 text-center relative overflow-hidden group flex flex-col h-full">
                <div className="text-white/60 text-xs font-bold uppercase tracking-wider mb-4">
                  Qibla Direction
                </div>
                
                {/* Map visual */}
                <div className="relative w-full flex-1 min-h-[140px] rounded-xl overflow-hidden mb-4 bg-white/10 border border-white/5 opacity-90 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  {/* Iframe is scaled and shifted to hide the OpenStreetMap UI text and controls */}
                  <div className="absolute inset-0 w-[120%] h-[130%] -top-[15%] -left-[10%] pointer-events-none">
                    <iframe 
                      width="100%" 
                      height="100%" 
                      frameBorder="0" 
                      style={{ border: 0 }} 
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=${location.longitude-0.05},${location.latitude-0.05},${location.longitude+0.05},${location.latitude+0.05}&layer=mapnik`} 
                      allowFullScreen 
                    />
                  </div>
                  
                  {/* Dark overlay to make map sit better in dark mode */}
                  <div className="absolute inset-0 z-10 bg-accent-navy/40 mix-blend-multiply pointer-events-none" />
                  <div className="absolute inset-0 z-10 bg-black/20 pointer-events-none" />

                  {/* Qibla Direction Line Overlay */}
                  <div 
                    className="absolute top-1/2 left-1/2 w-[3px] h-[65px] origin-bottom z-20 transition-transform duration-1000 ease-out"
                    style={{ 
                      transform: `translate(-50%, -100%) rotate(${qiblaAngle}deg)`,
                    }}
                  >
                    <div className="w-full h-full bg-gradient-to-t from-accent-yellow to-transparent opacity-80" />
                    {/* Arrow head */}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-accent-yellow drop-shadow-[0_0_5px_rgba(252,211,77,0.8)]" />
                  </div>
                  
                  {/* Center Dot (covers the default map marker) */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-accent-yellow rounded-full z-30 border-[3px] border-accent-navy shadow-[0_0_15px_rgba(252,211,77,1)]">
                    <div className="absolute inset-0 rounded-full bg-accent-yellow animate-ping opacity-50" />
                  </div>
                </div>
                
                <div className="mt-auto">
                  <div className="text-3xl font-display font-black text-accent-yellow">
                    {qiblaAngle.toFixed(1)}°
                  </div>
                  <div className="text-xs font-bold text-white/60 uppercase tracking-widest mt-1">
                    {qiblaDirection}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* COLUMN 3: INSPIRATION OF THE DAY */}
        <div className="p-8 md:p-10 relative z-10 flex flex-col justify-between bg-gradient-to-br from-transparent to-black/20">
          <div className={`transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}>
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-yellow/20 text-accent-yellow border border-accent-yellow/30 text-xs font-bold uppercase tracking-wider">
                {inspiration.type} of the Day
              </span>
              {inspiration.source && (
                <span className="inline-flex items-center px-2 py-1 rounded-md bg-white/10 text-white/80 text-xs font-medium border border-white/5">
                  {inspiration.source}
                </span>
              )}
            </div>
            <div className="relative">
              <p className={`text-lg md:text-xl font-display font-medium leading-relaxed italic ${!isHadithExpanded ? "line-clamp-4" : ""}`}>
                "{inspiration.text}"
              </p>
              {inspiration.text.length > 150 && (
                <button 
                  onClick={() => setIsHadithExpanded(!isHadithExpanded)}
                  className="text-accent-yellow text-sm font-bold mt-2 hover:underline focus:outline-none"
                >
                  {isHadithExpanded ? "Show less" : "Read more"}
                </button>
              )}
            </div>
          </div>

          <div className="mt-8">
             <div className="bg-black/40 border border-white/10 rounded-2xl p-5 flex flex-col items-center text-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               <svg className="w-8 h-8 text-white mb-3 relative z-10" viewBox="0 0 384 512" fill="currentColor">
                 <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 24 184.5 15.6 235.1c-10.4 62.6 15.3 146.6 44.7 190.6 13 22 29.3 45.4 52.8 44.4 22.9-1 31.7-14.7 59.8-14.7 28.1 0 35.8 14.7 59.8 14.7 24.9 0 39.5-21.5 52.5-43.5 16-27.1 22.5-53.5 23-55.2-1-1-53.6-20.2-54.1-81.8zM242.1 98.4c13.7-16.7 23-40.1 20.4-63.4-20.5 1-43.6 14.1-57.8 30.6-11.9 13.9-22.6 37.9-19.6 60.5 23.3 1.8 43.6-10.9 57-27.7z"/>
               </svg>
               <h4 className="text-white font-bold text-lg mb-1 relative z-10">Get the App</h4>
               <p className="text-white/60 text-xs leading-relaxed mb-4 relative z-10">
                 Get prayer alerts, halal scanner and Islamic tools in the AllHalal app.
               </p>
               <Link href="https://apps.apple.com/us/app/allhalal-info-food-scanner/id6756242265" target="_blank" className="w-full bg-white text-black hover:bg-white/90 transition-colors text-center py-2.5 rounded-xl text-sm font-bold relative z-10">
                 Download the App
               </Link>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
