'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface Stream {
  id: number | string;
  title: string;
  subtitle?: string;
  video_id: string;
  fallback_video_ids?: string[];
}

async function readJsonResponse(response: Response) {
  const contentType = response.headers.get('content-type') || '';
  const bodyText = await response.text();

  if (!response.ok || !contentType.includes('application/json')) {
    throw new Error(`Expected JSON, got ${response.status} ${contentType || 'unknown content type'}: ${bodyText.slice(0, 120)}`);
  }

  return JSON.parse(bodyText);
}

export default function LiveStreamWidget({ locale }: { locale: string }) {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchStreams = useCallback(async () => {
    try {
      const res = await fetch('/api/live-streams');
      const json = await readJsonResponse(res);
      const data: Stream[] = json.data?.streams || [];
      if (data.length > 0) {
        setStreams(data);
      }
    } catch {
      // silent fail — keep fallback
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStreams();
  }, [fetchStreams]);

  const activeStream = streams[activeTab];
  const videoId = activeStream?.video_id;
  const isChannel = videoId?.startsWith('UC');
  const thumbnailUrl = videoId && !isChannel
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : null;

  if (loading) {
    return (
      <div className="bg-[linear-gradient(180deg,#102432,#0C1A24)] text-white rounded-[1.75rem] p-5 shadow-[0_18px_40px_rgba(14,24,32,0.26)] flex flex-col relative overflow-hidden border border-[#284556]">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-sm font-bold uppercase tracking-wider text-white/70">Live</span>
        </div>
        <div className="aspect-video rounded-xl bg-white/5 animate-pulse" />
      </div>
    );
  }

  if (streams.length === 0) {
    return (
      <Link
        href={`/learn/live-makkah`}
        className="bg-[linear-gradient(180deg,#102432,#0C1A24)] text-white rounded-[1.75rem] p-5 shadow-[0_18px_40px_rgba(14,24,32,0.26)] flex flex-col relative overflow-hidden border border-[#284556] group hover:border-[#35586E] transition-colors"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-sm font-bold uppercase tracking-wider text-white/70">Live 24/7</span>
        </div>
        <p className="text-white/90 font-display font-bold text-lg">Makkah & Madinah</p>
        <p className="text-white/50 text-sm mt-1">Watch live broadcasts from the Holy Mosques</p>
        <span className="mt-3 text-accent-yellow text-sm font-medium group-hover:underline">Watch now &rarr;</span>
      </Link>
    );
  }

  return (
    <div className="bg-[linear-gradient(180deg,#102432,#0C1A24)] text-white rounded-[1.75rem] shadow-[0_18px_40px_rgba(14,24,32,0.26)] flex flex-col relative overflow-hidden border border-[#284556]">
      {/* Tabs */}
      <div className="flex border-b border-white/10">
        {streams.map((stream, i) => (
          <button
            key={stream.id}
            onClick={() => { setActiveTab(i); setIsPlaying(false); }}
            className={`flex-1 px-4 py-3 text-[11px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
              activeTab === i
                ? 'text-white bg-white/6'
                : 'text-white/50 hover:text-white/70 hover:bg-white/[0.02]'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${activeTab === i ? 'bg-red-500 animate-pulse' : 'bg-white/20'}`} />
            {stream.title?.replace(' Live', '')}
          </button>
        ))}
      </div>

      {/* Player / Thumbnail */}
      <div className="relative aspect-video bg-black/20">
        {isPlaying && !isChannel ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0&modestbranding=1`}
            title={activeStream?.title || 'Live Stream'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        ) : (
          <button
            onClick={() => !isChannel && setIsPlaying(true)}
            className="absolute inset-0 w-full h-full group/play cursor-pointer focus:outline-none"
          >
            {thumbnailUrl ? (
              <Image
                src={thumbnailUrl}
                alt={activeStream?.title || 'Live stream thumbnail'}
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-neutral-900 to-neutral-800" />
            )}
            
            <div className="absolute inset-0 bg-black/30 group-hover/play:bg-black/40 transition-colors" />
            
            {!isChannel ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-2xl group-hover/play:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="mt-3 text-white/80 text-sm font-medium">
                  {activeStream?.subtitle || 'Tap to watch live'}
                </span>
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <p className="text-white/70 text-sm mb-3 text-center">Stream temporarily unavailable in player</p>
                <a
                  href={`https://www.youtube.com/channel/${videoId}/live`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Watch on YouTube
                </a>
              </div>
            )}
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 flex items-center justify-between border-t border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-white/60 text-xs font-medium uppercase tracking-wider">Live 24/7</span>
        </div>
        <Link
          href={`/learn/live-makkah`}
          className="text-accent-yellow text-xs font-semibold hover:underline"
        >
          Full screen &rarr;
        </Link>
      </div>
    </div>
  );
}
