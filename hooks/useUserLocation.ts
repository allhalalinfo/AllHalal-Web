"use client";

import { useState, useEffect, useCallback } from "react";
import { UserLocation, DEFAULT_LOCATION } from "@/types/location";

const LOCATION_STORAGE_KEY = "user_location_pref";

export function useUserLocation() {
  const [location, setLocationState] = useState<UserLocation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check local storage on mount
    const stored = localStorage.getItem(LOCATION_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setLocationState(parsed);
        setIsLoading(false);
        return;
      } catch (e) {
        console.error("Failed to parse stored location", e);
      }
    }
    
    // If no stored location, we default to Makkah but we can prompt later
    setLocationState(DEFAULT_LOCATION);
    setIsLoading(false);
  }, []);

  const setLocation = useCallback((newLocation: UserLocation) => {
    setLocationState(newLocation);
    localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(newLocation));
  }, []);

  const requestGeolocation = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    if (!("geolocation" in navigator)) {
      setError("Geolocation is not supported by your browser");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        
        try {
          // Reverse geocode to get city name
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&accept-language=en`);
          const data = await res.json();
          
          const city = data.address?.city || data.address?.town || data.address?.state || "Your Location";
          const country = data.address?.country || "";
          
          setLocation({
            city,
            country,
            latitude: lat,
            longitude: lon,
            isAuto: true,
          });
        } catch (err) {
          console.error("Reverse geocoding failed", err);
          // Fallback just coordinates if reverse geocoding fails
          setLocation({
            city: "Current Location",
            country: "",
            latitude: lat,
            longitude: lon,
            isAuto: true,
          });
        } finally {
          setIsLoading(false);
        }
      },
      (err) => {
        setError(err.message || "Failed to get location");
        setIsLoading(false);
      },
      { timeout: 10000 }
    );
  }, [setLocation]);

  return {
    location,
    isLoading,
    error,
    setLocation,
    requestGeolocation,
  };
}