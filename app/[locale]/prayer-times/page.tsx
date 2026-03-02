import { Metadata } from 'next';
import PrayerTimesClient from './PrayerTimesClient';

export const metadata: Metadata = {
  title: 'Accurate Prayer Times & Adhan | allhalal.info',
  description: 'Find accurate local prayer times (Fajr, Dhuhr, Asr, Maghrib, Isha) for any city worldwide. Get reliable namaz schedules based on your exact location.',
};

export default async function PrayerTimesPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  
  return (
    <div className="container py-32 min-h-screen">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
          Muslim Prayer Times
        </h1>
        <p className="text-xl text-text-secondary leading-relaxed">
          Accurate Salah times based on your current location. Search for any city worldwide to find the exact schedule for Fajr, Dhuhr, Asr, Maghrib, and Isha.
        </p>
      </div>

      <PrayerTimesClient />
    </div>
  );
}
