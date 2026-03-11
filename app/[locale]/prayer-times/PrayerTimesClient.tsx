"use client";

import { useState, useEffect, FormEvent, useCallback } from "react";
import AppPromoMini from "@/components/ui/AppPromoMini";

type PrayerTimes = {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
};

type LocationData = {
  city: string;
  country: string;
};

const fallbackTimes = {
  fajr: "05:15",
  sunrise: "06:30",
  dhuhr: "12:15",
  asr: "15:30",
  maghrib: "18:00",
  isha: "19:15"
};

export default function PrayerTimesClient() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [times, setTimes] = useState<PrayerTimes | null>(null);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Settings states
  const [coords, setCoords] = useState<{lat: number, lon: number} | null>(null);
  const [selectedDay, setSelectedDay] = useState<"today" | "tomorrow">("today");
  const [selectedMethod, setSelectedMethod] = useState<number>(0);
  const [selectedMadhhab, setSelectedMadhhab] = useState<"general" | "hanafi">("general");
  const [currentCityName, setCurrentCityName] = useState<string | undefined>(undefined);
  const [calculationMethodName, setCalculationMethodName] = useState<string>("Muslim World League");

  // Fetch times using lat and lon
  const fetchPrayerTimes = useCallback(async (
    lat: number, 
    lon: number, 
    cityName?: string, 
    day: "today" | "tomorrow" = "today",
    method: number = 0,
    madhhab: "general" | "hanafi" = "general"
  ) => {
    setLoading(true);
    setError(null);
    setCoords({ lat, lon });
    if (cityName) setCurrentCityName(cityName);

    try {
      // First try our internal proxy API (which bypasses CORS and fetches from the real backend)
      let url = `/api/prayer-times?lat=${lat}&lon=${lon}`;
      if (day === "tomorrow") {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        url += `&date=${tomorrow.toISOString().split('T')[0]}`;
      }
      if (method !== 0) {
        url += `&method=${method}`;
      }
      if (madhhab !== "general") {
        url += `&madhhab=${madhhab}`;
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error("API returned an error");
      const json = await res.json();
      
      if (json.status === "success" && json.data) {
        setTimes(json.data.times);
        // If we searched by city, use that name, otherwise use API's reverse geocoded name
        setLocation({
          city: cityName || json.data.location?.city || "Unknown City",
          country: json.data.location?.country || ""
        });
        if (json.data.calculation_method?.name) {
          setCalculationMethodName(json.data.calculation_method.name);
        }
      } else {
        throw new Error(json.error || "Unknown error occurred");
      }
    } catch (err: any) {
      console.error("Prayer times fetch error:", err);
      // If the API fails (e.g. CORS or offline), use Aladhan API as a fallback
      try {
        const date = new Date();
        if (day === "tomorrow") date.setDate(date.getDate() + 1);
        
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const aladhanRes = await fetch(`https://api.aladhan.com/v1/calendar/${year}/${month}?latitude=${lat}&longitude=${lon}&method=${method === 0 ? 2 : method}`);
        const aladhanData = await aladhanRes.json();
        
        if (aladhanData.code === 200 && aladhanData.data) {
          // Find the date in the calendar
          const targetDate = date.getDate() - 1; // 0-indexed array
          const todayTimes = aladhanData.data[targetDate].timings;
          
          setTimes({
            fajr: todayTimes.Fajr.split(' ')[0],
            sunrise: todayTimes.Sunrise.split(' ')[0],
            dhuhr: todayTimes.Dhuhr.split(' ')[0],
            asr: todayTimes.Asr.split(' ')[0],
            maghrib: todayTimes.Maghrib.split(' ')[0],
            isha: todayTimes.Isha.split(' ')[0],
          });
          
          setLocation({
            city: cityName || "Your Location",
            country: ""
          });
          setCalculationMethodName("Fallback API");
        } else {
          throw new Error("Fallback API failed");
        }
      } catch (fallbackErr) {
        console.error("Fallback API also failed:", fallbackErr);
        // Absolute fallback so the user sees something
        setTimes(fallbackTimes);
        setLocation({
          city: cityName || "Estimated Times",
          country: "Could not connect to server"
        });
        setCalculationMethodName("Offline estimation");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Get user location on mount
  useEffect(() => {
    // Only run on mount
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchPrayerTimes(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.log("Geolocation error/denied:", error);
          // Default to New York if denied
          fetchPrayerTimes(40.7128, -74.0060, "New York");
        }
      );
    } else {
      // Default to New York if geolocation is not supported
      fetchPrayerTimes(40.7128, -74.0060, "New York");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-fetch when settings change, if we have coordinates
  useEffect(() => {
    if (coords) {
      fetchPrayerTimes(coords.lat, coords.lon, currentCityName, selectedDay, selectedMethod, selectedMadhhab);
    }
  }, [selectedDay, selectedMethod, selectedMadhhab, fetchPrayerTimes, currentCityName]); // omitting coords intentionally to not loop

  // Search for city using Nominatim (OpenStreetMap)
  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setError(null);
    
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`);
      const data = await res.json();
      
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        // Use the display name up to the first comma as the city name
        const shortName = data[0].display_name.split(",")[0];
        await fetchPrayerTimes(lat, lon, shortName, selectedDay, selectedMethod, selectedMadhhab);
      } else {
        setError("City not found. Please try a different search term.");
      }
    } catch (err) {
      setError("Search failed. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const formatTime = (time24: string) => {
    if (!time24) return "";
    const [hours, minutes] = time24.split(":");
    let h = parseInt(hours, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12;
    h = h ? h : 12; // the hour '0' should be '12'
    return `${h}:${minutes} ${ampm}`;
  };

  return (
    <div className="w-full">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-12 max-w-xl mx-auto relative">
        <input
          type="text"
          placeholder="Search for any city (e.g. London, Dubai, Toronto)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-bg-card border border-border rounded-2xl px-6 py-4 text-text-primary placeholder-text-muted focus:outline-none focus:border-primary transition-colors shadow-sm"
        />
        <button
          type="submit"
          disabled={isSearching || !searchQuery.trim()}
          className="absolute right-2 top-2 bottom-2 bg-gradient-gold text-[#4A3319] hover:bg-gradient-gold-hover px-6 rounded-xl font-bold shadow-[0_4px_15px_rgba(176,144,98,0.3)] transition-all disabled:opacity-50"
        >
          {isSearching ? "Searching..." : "Search"}
        </button>
      </form>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-2xl mb-8 text-center">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
        </div>
      ) : times ? (
        <div className="animate-fade-in">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-text-primary mb-2">
              {location?.city}
            </h2>
            {location?.country && (
              <p className="text-text-secondary text-lg">{location.country}</p>
            )}
            <p className="text-text-muted mt-2">Times for {selectedDay === 'today' ? 'today' : 'tomorrow'} • {calculationMethodName}</p>
          </div>

          {/* Settings Controls */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <div className="flex bg-bg-card border border-border rounded-xl overflow-hidden p-1 shadow-sm">
              <button 
                onClick={() => setSelectedDay("today")}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${selectedDay === "today" ? "bg-primary text-primary-foreground shadow-sm" : "text-text-secondary hover:text-text-primary"}`}
              >
                Today
              </button>
              <button 
                onClick={() => setSelectedDay("tomorrow")}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${selectedDay === "tomorrow" ? "bg-primary text-primary-foreground shadow-sm" : "text-text-secondary hover:text-text-primary"}`}
              >
                Tomorrow
              </button>
            </div>
            
            <div className="flex bg-bg-card border border-border rounded-xl overflow-hidden p-1 shadow-sm">
              <button 
                onClick={() => setSelectedMadhhab("general")}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${selectedMadhhab === "general" ? "bg-primary text-primary-foreground shadow-sm" : "text-text-secondary hover:text-text-primary"}`}
              >
                Standard Asr
              </button>
              <button 
                onClick={() => setSelectedMadhhab("hanafi")}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${selectedMadhhab === "hanafi" ? "bg-primary text-primary-foreground shadow-sm" : "text-text-secondary hover:text-text-primary"}`}
              >
                Hanafi Asr
              </button>
            </div>

            <div className="flex items-center bg-bg-card border border-border rounded-xl px-3 shadow-sm">
              <select 
                value={selectedMethod}
                onChange={(e) => setSelectedMethod(Number(e.target.value))}
                className="bg-transparent text-sm text-text-primary py-2 outline-none cursor-pointer max-w-[200px] md:max-w-xs truncate"
              >
                <option value={0}>Auto (Recommended)</option>
                <option value={1}>University of Islamic Sciences, Karachi</option>
                <option value={2}>Islamic Society of North America (ISNA)</option>
                <option value={3}>Muslim World League (MWL)</option>
                <option value={4}>Umm Al-Qura University, Makkah</option>
                <option value={5}>Egyptian General Authority of Survey</option>
                <option value={13}>Diyanet (Turkey)</option>
                <option value={14}>Spiritual Administration of Muslims of Russia (ДУМ РФ)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
            <PrayerCard name="Fajr" time={formatTime(times.fajr)} icon="🌅" />
            <PrayerCard name="Sunrise" time={formatTime(times.sunrise)} icon="☀️" isSecondary />
            <PrayerCard name="Dhuhr" time={formatTime(times.dhuhr)} icon="🌞" />
            <PrayerCard name="Asr" time={formatTime(times.asr)} icon="🌤️" />
            <PrayerCard name="Maghrib" time={formatTime(times.maghrib)} icon="🌇" />
            <PrayerCard name="Isha" time={formatTime(times.isha)} icon="🌙" />
          </div>
        </div>
      ) : null}

      <div className="bg-bg-card border border-border p-8 rounded-3xl text-center max-w-2xl mx-auto shadow-glow-sm">
        <div className="text-4xl mb-4">📱</div>
        <h3 className="text-2xl font-bold font-display text-text-primary mb-3">Never Miss a Prayer</h3>
        <p className="text-text-secondary mb-6">
          Get precise adhan notifications, customizable widgets, and Qibla direction based on your exact GPS location.
        </p>
        <AppPromoMini />
      </div>
    </div>
  );
}

function PrayerCard({ name, time, icon, isSecondary = false }: { name: string, time: string, icon: string, isSecondary?: boolean }) {
  return (
    <div className={`p-6 rounded-3xl text-center border transition-all hover:scale-105 ${
      isSecondary 
        ? "bg-bg-secondary border-border/50 opacity-80" 
        : "bg-bg-card border-border hover:border-primary shadow-sm hover:shadow-glow-sm"
    }`}>
      <div className="text-3xl mb-3">{icon}</div>
      <div className="text-text-secondary text-sm font-medium uppercase tracking-wider mb-1">{name}</div>
      <div className={`font-bold ${isSecondary ? "text-xl text-text-primary/70" : "text-2xl text-text-primary"}`}>{time}</div>
    </div>
  );
}
