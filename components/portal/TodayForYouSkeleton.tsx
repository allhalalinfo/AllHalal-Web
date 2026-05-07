"use client";

/**
 * Skeleton loader for TodayForYou widget
 * Prevents CLS by reserving space while data loads
 */
export default function TodayForYouSkeleton() {
  return (
    <div className="w-full rounded-[2.4rem] border border-[rgba(47,37,30,0.08)] bg-white/72 p-6 shadow-[0_24px_64px_rgba(43,34,24,0.08)] backdrop-blur-xl animate-pulse">
      {/* Location skeleton */}
      <div className="mb-6">
        <div className="h-4 w-32 bg-gray-200 rounded"></div>
      </div>

      {/* Prayer times grid skeleton */}
      <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-xl border border-[rgba(47,37,30,0.06)] bg-white/60 p-3">
            <div className="h-3 w-12 bg-gray-200 rounded mb-2"></div>
            <div className="h-5 w-16 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>

      {/* Calendar event skeleton */}
      <div className="rounded-xl border border-[rgba(47,37,30,0.06)] bg-white/60 p-4">
        <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
        <div className="h-3 w-full bg-gray-200 rounded"></div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}
