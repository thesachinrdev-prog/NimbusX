import React from "react";

export default function Error({ message }) {
  return (
    <div className="flex flex-col items-center text-center p-8 glass-panel rounded-2xl max-w-md mx-auto w-full border-red-500/20 shadow-lg animate-fade-in">
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-500/10 border border-red-500/30 text-red-400 mb-4 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-slate-100 mb-1">
        Request Failed
      </h3>
      <p className="text-slate-300 text-sm leading-relaxed mb-4">
        {message || "We couldn't retrieve the weather data for this location."}
      </p>
      <div className="text-xs text-left bg-slate-900/40 border border-white/5 rounded-lg p-3 text-slate-400 w-full space-y-1">
        <span className="font-semibold text-slate-300 block mb-1">Troubleshooting Tips:</span>
        <p>• Verify the city spelling and try "City, Country" (e.g., "Paris, FR").</p>
        <p>• Ensure your API key is correctly configured in your <code className="bg-slate-950 px-1 py-0.5 rounded text-sky-300">.env</code>.</p>
        <p>• Check your internet connection and try again.</p>
      </div>
    </div>
  );
}
