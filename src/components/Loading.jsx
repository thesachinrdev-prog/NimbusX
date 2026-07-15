import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 glass-panel rounded-2xl max-w-md mx-auto w-full animate-fade-in">
      <div className="relative w-16 h-16">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-4 border-sky-400/20 border-t-sky-400 animate-spin"></div>
        {/* Inner Ring (Counter-rotating) */}
        <div className="absolute inset-2 rounded-full border-4 border-indigo-400/10 border-b-indigo-400 animate-[spin_1.5s_linear_infinite_reverse]"></div>
      </div>
      <p className="mt-6 text-lg font-medium text-slate-200 tracking-wide animate-pulse">
        Fetching weather...
      </p>
      <p className="text-xs text-sky-300/60 mt-1">
        Gathering atmospheric metrics
      </p>
    </div>
  );
}
