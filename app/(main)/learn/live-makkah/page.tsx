import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  alternates: { canonical: "/learn/live-makkah" },
  title: 'Watch Makkah & Madinah Live Stream 24/7 | allhalal.info',
  description: 'Watch the live broadcast from Masjid al-Haram in Makkah and Al-Masjid an-Nabawi in Madinah. High-quality 24/7 live stream.',
};

export default async function LiveStreamsPage(props: { params: Promise<{}> }) {
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
      <Link href={`/learn`} className="text-primary hover:underline mb-8 inline-block">&larr; Back to Learn Islam</Link>
      
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-display text-text-primary mb-4">Makkah & Madinah Live</h1>
        <p className="text-xl text-text-secondary max-w-2xl">
          Watch the 24/7 live broadcasts from the Holy Mosques.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-16">
        {streams.map((stream: any) => {
          const isChannel = stream.video_id?.startsWith('UC');
          return (
          <div key={stream.id} className="bg-bg-card border border-border rounded-3xl overflow-hidden shadow-sm flex flex-col">
            {/* 16:9 Aspect Ratio Container for YouTube iFrame */}
            <div className="relative w-full pb-[56.25%] bg-black flex items-center justify-center">
              {!isChannel ? (
                <iframe 
                  src={`https://www.youtube.com/embed/${stream.video_id}?autoplay=0&mute=0&rel=0`}
                  title={stream.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full border-0"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/80 p-6 text-center">
                  <svg className="w-12 h-12 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                  <p className="mb-4">Трансляция временно недоступна в плеере.</p>
                  <a 
                    href={`https://www.youtube.com/channel/${stream.video_id}/live`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Смотреть на YouTube
                  </a>
                </div>
              )}
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold font-display text-text-primary mb-2 flex items-center gap-3">
                <span className={`w-3 h-3 rounded-full ${!isChannel ? 'bg-red-500 animate-pulse' : 'bg-gray-400'}`}></span>
                {stream.title}
              </h2>
              <p className="text-text-secondary text-sm">
                Live broadcast from {stream.title?.includes('Makkah') ? 'Masjid al-Haram' : 'Al-Masjid an-Nabawi'}.
              </p>
            </div>
          </div>
        )})}
      </div>
    </div>
  );
}