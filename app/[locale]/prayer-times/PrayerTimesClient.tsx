"use client";

import { useState, useEffect, FormEvent } from "react";
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

export default function PrayerTimesClient() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [times, setTimes] = useState<PrayerTimes | null>(null);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Fetch times using lat and lon
  const fetchPrayerTimes = async (lat: number, lon: number, cityName?: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://api.allhalal.info/api/v1/prayer-times?lat=${lat}&lon=${lon}`);
      if (!res.ok) throw new Error("Failed to fetch prayer times");
      const json = await res.json();
      
      if (json.status === "success" && json.data) {
        setTimes(json.data.times);
        // If we searched by city, use that name, otherwise use API's reverse geocoded name
        setLocation({
          city: cityName || json.data.location?.city || "Unknown City",
          country: json.data.location?.country || ""
        });
      } else {
        throw new Error(json.error || "Unknown error occurred");
      }
    } catch (err: any) {
      console.error(err);
      setError("Could not load prayer times for this location. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Get user location on mount
  useEffect(() => {
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
  }, []);

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
        await fetchPrayerTimes(lat, lon, shortName);
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
          className="absolute right-2 top-2 bottom-2 bg-primary text-white px-6 rounded-xl font-bold hover:bg-primary-dark transition-colors disabled:opacity-50"
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
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">
              {location?.city}
            </h2>
            {location?.country && (
              <p className="text-text-secondary text-lg">{location.country}</p>
            )}
            <p className="text-text-muted mt-2">Times for today • Muslim World League calculation</p>
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
        <h3 className="text-2xl font-bold text-text-primary mb-3">Never Miss a Prayer</h3>
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
