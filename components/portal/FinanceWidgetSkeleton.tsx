"use client";

/**
 * Skeleton loader for Finance widget
 * Prevents CLS by reserving space while data loads
 */
export default function FinanceWidgetSkeleton() {
  return (
    <div className="w-full rounded-[2.4rem] border border-[rgba(47,37,30,0.08)] bg-white/72 p-6 shadow-[0_24px_64px_rgba(43,34,24,0.08)] backdrop-blur-xl animate-pulse">
      {/* Header skeleton */}
      <div className="mb-6 flex items-center justify-between">
        <div className="h-6 w-40 bg-gray-200 rounded"></div>
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
      </div>

      {/* Finance cards grid skeleton */}
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-xl border border-[rgba(47,37,30,0.06)] bg-white/60 p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
              <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
            </div>
            <div className="h-7 w-24 bg-gray-300 rounded mb-1"></div>
            <div className="h-3 w-20 bg-gray-200 rounded"></div>
          </div>
        ))}
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
