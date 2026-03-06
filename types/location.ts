export interface UserLocation {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  isAuto: boolean; // True if acquired via Geolocation API, false if selected manually
}

export const DEFAULT_LOCATION: UserLocation = {
  city: "Makkah",
  country: "Saudi Arabia",
  latitude: 21.4225,
  longitude: 39.8262,
  isAuto: false,
};
