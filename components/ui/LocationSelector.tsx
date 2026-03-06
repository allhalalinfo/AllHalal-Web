"use client";

import { useState, useRef, useEffect } from "react";
import { UserLocation } from "@/types/location";
import { useUserLocation } from "@/hooks/useUserLocation";

interface LocationSelectorProps {
  currentLocation: UserLocation | null;
  onLocationChange: (loc: UserLocation) => void;
  onRequestGeolocation: () => void;
}

export default function LocationSelector({ currentLocation, onLocationChange, onRequestGeolocation }: LocationSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length < 3) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&accept-language=en&limit=5`);
      const data = await res.json();
      setSearchResults(data);
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setIsSearching(false);
    }
  };

  const selectLocation = (result: any) => {
    // Attempt to extract city/town from display name (usually the first part before comma)
    const parts = result.display_name.split(',');
    const city = parts[0].trim();
    const country = parts.length > 1 ? parts[parts.length - 1].trim() : "";

    onLocationChange({
      city,
      country,
      latitude: parseFloat(result.lat),
      longitude: parseFloat(result.lon),
      isAuto: false
    });
    setIsOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleAutoLocation = () => {
    onRequestGeolocation();
    setIsOpen(false);
  };

  return (
    <div className="relative z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 text-xl font-bold opacity-90 hover:opacity-100 transition-opacity"
      >
        <svg className="w-5 h-5 text-accent-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span>{currentLocation ? currentLocation.city : "Select Location"}</span>
        <svg className={`w-4 h-4 opacity-50 transition-transform ${isOpen ? 'rotate-180' : 'group-hover:translate-y-0.5'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div ref={modalRef} className="absolute top-full left-0 mt-2 w-72 md:w-80 bg-bg-elevated border border-border rounded-2xl shadow-xl overflow-hidden text-text-primary">
          <div className="p-4 border-b border-border">
            <button 
              onClick={handleAutoLocation}
              className="w-full flex items-center gap-3 bg-primary/10 hover:bg-primary/20 text-primary px-4 py-3 rounded-xl transition-colors text-sm font-bold"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
              </svg>
              Use My Current Location
            </button>
            
            <div className="mt-4 relative">
              <input
                type="text"
                placeholder="Search city..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full bg-bg-subtle border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors text-text-primary placeholder:text-text-muted"
              />
              <svg className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div className="max-h-60 overflow-y-auto">
            {isSearching ? (
              <div className="p-4 text-center text-sm text-text-muted">Searching...</div>
            ) : searchResults.length > 0 ? (
              <ul className="py-2">
                {searchResults.map((result) => (
                  <li key={result.place_id}>
                    <button
                      onClick={() => selectLocation(result)}
                      className="w-full text-left px-4 py-2.5 hover:bg-bg-subtle transition-colors text-sm"
                    >
                      <div className="font-medium text-text-primary truncate">{result.display_name.split(',')[0]}</div>
                      <div className="text-xs text-text-muted truncate mt-0.5">{result.display_name}</div>
                    </button>
                  </li>
                ))}
              </ul>
            ) : searchQuery.length >= 3 ? (
              <div className="p-4 text-center text-sm text-text-muted">No cities found.</div>
            ) : (
              <div className="p-4 text-center text-sm text-text-muted">Type at least 3 characters.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}