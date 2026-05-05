"use client";

const LoadingUI = ({ rows = 8 }: { rows?: number }) => {
  return (
    <section className="min-h-screen bg-[#0b1120] text-white p-6">
      <div className="max-w-6xl mx-auto">

        {/* Title Skeleton */}
        <div className="h-6 w-60 mb-6 rounded bg-white/10 animate-pulse" />

        <div className="space-y-3">
          {[...Array(rows)].map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-6 items-center p-4 rounded-xl bg-white/5 relative overflow-hidden"
            >
              {/* shimmer effect */}
              <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <div className="h-4 w-6 bg-white/10 rounded" />

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-full" />
                <div className="space-y-1">
                  <div className="h-4 w-24 bg-white/10 rounded" />
                  <div className="h-3 w-12 bg-white/10 rounded" />
                </div>
              </div>

              <div className="h-4 w-16 bg-white/10 rounded" />
              <div className="h-4 w-12 bg-white/10 rounded" />
              <div className="h-4 w-20 bg-white/10 rounded" />
              <div className="h-4 w-16 bg-white/10 rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoadingUI;