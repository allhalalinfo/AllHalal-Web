import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Watch Makkah & Madinah Live Stream 24/7 | allhalal.info',
  description: 'Watch the live broadcast from Masjid al-Haram in Makkah and Al-Masjid an-Nabawi in Madinah. High-quality 24/7 live stream.',
};

export default async function LiveStreamsPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  let streams = [];
  
  try {
    // Fetch live stream IDs from the backend API
    const res = await fetch("https://api.allhalal.info/api/v1/config/live-streams", {
      headers: {
        'X-Source': 'web'
      },
      next: { revalidate: 3600 }
    });
    
    if (res.ok) {
      const json = await res.json();
      streams = json.data?.streams || [];
    }
  } catch (e) {
    console.error("Failed to fetch live streams", e);
  }

  // Fallback to known good streams if API fails or doesn't have the data yet
  if (streams.length === 0) {
    streams = [
      { id: "makkah_live", title: "Makkah Live", video_id: "Cm1v4bteXbI" },
      { id: "madinah_live", title: "Madinah Live", video_id: "9A1S0xAPVIs" }
    ];
  }

  return (
    <div className="container py-32 max-w-5xl mx-auto min-h-screen">
      <Link href={`/${params.locale}/learn`} className="text-primary hover:underline mb-8 inline-block">&larr; Back to Learn Islam</Link>
      
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-display text-text-primary mb-4">Makkah & Madinah Live</h1>
        <p className="text-xl text-text-secondary max-w-2xl">
          Watch the 24/7 live broadcasts from the Holy Mosques.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-16">
        {streams.map((stream: any) => (
          <div key={stream.id} className="bg-bg-card border border-border rounded-3xl overflow-hidden shadow-sm flex flex-col">
            {/* 16:9 Aspect Ratio Container for YouTube iFrame */}
            <div className="relative w-full pb-[56.25%] bg-black">
              <iframe 
                src={`https://www.youtube.com/embed/${stream.video_id}?autoplay=0&mute=0&rel=0`}
                title={stream.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full border-0"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold font-display text-text-primary mb-2 flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
                {stream.title}
              </h2>
              <p className="text-text-secondary text-sm">
                Live broadcast from {stream.title.includes('Makkah') ? 'Masjid al-Haram' : 'Al-Masjid an-Nabawi'}.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}