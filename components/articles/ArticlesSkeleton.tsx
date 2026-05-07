"use client";

/**
 * Skeleton loader for Articles section
 * Prevents CLS by reserving space while data loads
 */
export default function ArticlesSkeleton() {
  return (
    <div className="w-full animate-pulse">
      {/* Header skeleton */}
      <div className="mb-6 flex items-center justify-between">
        <div className="h-6 w-40 bg-gray-200 rounded"></div>
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
      </div>

      {/* Articles grid skeleton */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-2xl border border-[rgba(47,37,30,0.08)] bg-white/72 p-5 shadow-[0_16px_48px_rgba(43,34,24,0.06)]">
            <div className="h-40 w-full bg-gray-300 rounded-xl mb-4"></div>
            <div className="h-5 w-full bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded mb-3"></div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-16 bg-gray-200 rounded"></div>
              <div className="h-3 w-20 bg-gray-200 rounded"></div>
            </div>
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
