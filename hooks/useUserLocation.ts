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

    // Check if we have permission already
    if ("permissions" in navigator) {
      try {
        const permissionStatus = await navigator.permissions.query({ name: 'geolocation' as PermissionName });
        console.log("Geolocation permission status:", permissionStatus.state);
      } catch (e) {
        console.log("Cannot query permission status (iOS limitation)");
      }
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        console.log("✅ Got coordinates:", position.coords.latitude, position.coords.longitude);
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        
        try {
          // Reverse geocode to get city name
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&accept-language=en`, {
            headers: {
              'User-Agent': 'allhalal.info'
            }
          });
          const data = await res.json();
          console.log("✅ Reverse geocoding result:", data);
          
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
          console.error("❌ Reverse geocoding failed", err);
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
        console.error("❌ Geolocation error:", err.code, err.message);
        console.error("Error code meanings: 1=PERMISSION_DENIED, 2=POSITION_UNAVAILABLE, 3=TIMEOUT");
        
        let errorMessage = "Failed to get location";
        if (err.code === 1) {
          errorMessage = "Location access denied";
        } else if (err.code === 2) {
          errorMessage = "Location unavailable (check device GPS)";
        } else if (err.code === 3) {
          errorMessage = "Location request timed out";
        } else {
          errorMessage = err.message || "Failed to get location";
        }
        
        setError(errorMessage);
        setIsLoading(false);
      },
      { 
        timeout: 30000, // Increased timeout to 30 seconds for mobile
        enableHighAccuracy: false, // Use network location instead of GPS for faster response
        maximumAge: 300000 // Accept cached position up to 5 minutes old
      }
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