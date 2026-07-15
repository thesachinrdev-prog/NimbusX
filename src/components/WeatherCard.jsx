import React from "react";
import { formatCurrentDateTime } from "../utils/dateFormatter";
import { Thermometer, Wind, Droplets, ArrowUp, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

// High-fidelity vector weather illustrations that float and glow
export function WeatherIllustration({ condition, className = "w-44 h-44" }) {
  const normCond = condition ? condition.trim().toLowerCase() : "";

  // 1. Clear / Sunny
  if (normCond === "clear") {
    return (
      <div className="relative flex items-center justify-center">
        {/* Glow */}
        <div className="absolute w-36 h-36 rounded-full bg-amber-500/15 blur-2xl animate-pulse-slow"></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="url(#sun-grad)"
          strokeWidth="1"
          className={`${className} filter drop-shadow-[0_0_30px_rgba(245,158,11,0.35)]`}
        >
          <defs>
            <linearGradient id="sun-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
            <radialGradient id="sun-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="12" cy="12" r="5" fill="url(#sun-glow)" strokeWidth="1.5" />
          <path
            strokeLinecap="round"
            d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
            strokeWidth="1.8"
          />
        </svg>
      </div>
    );
  }

  // 2. Clouds / Overcast
  if (normCond === "clouds") {
    return (
      <div className="relative flex items-center justify-center">
        <div className="absolute w-36 h-36 rounded-full bg-slate-500/10 blur-2xl"></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="url(#cloud-grad)"
          strokeWidth="1"
          className={`${className} filter drop-shadow-[0_0_20px_rgba(148,163,184,0.25)]`}
        >
          <defs>
            <linearGradient id="cloud-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#64748B" />
            </linearGradient>
          </defs>
          {/* Overlapping clouds */}
          <path
            fill="rgba(148, 163, 184, 0.15)"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 16.9A5 5 0 0018 7h-1.26A8 8 0 103 16.25c0 .2.02.4.05.6A4 4 0 007 20h10a4 4 0 002-3.1z"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    );
  }

  // 3. Rain / Drizzle
  if (normCond === "rain" || normCond === "drizzle") {
    return (
      <div className="relative flex items-center justify-center">
        <div className="absolute w-36 h-36 rounded-full bg-blue-500/10 blur-2xl"></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="url(#rain-grad)"
          strokeWidth="1"
          className={`${className} filter drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]`}
        >
          <defs>
            <linearGradient id="rain-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#93C5FD" />
              <stop offset="100%" stopColor="#1E3A8A" />
            </linearGradient>
          </defs>
          <path
            fill="rgba(59, 130, 246, 0.1)"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 16.9A5 5 0 0018 7h-1.26A8 8 0 103 16.25c0 .2.02.4.05.6A4 4 0 007 20h10a4 4 0 002-3.1z"
            strokeWidth="1.5"
          />
          {/* Falling raindrops */}
          <line x1="8" y1="21" x2="6" y2="25" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="22" x2="10" y2="26" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
          <line x1="16" y1="21" x2="14" y2="25" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  // 4. Thunderstorm
  if (normCond === "thunderstorm") {
    return (
      <div className="relative flex items-center justify-center">
        <div className="absolute w-36 h-36 rounded-full bg-violet-600/15 blur-2xl"></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="url(#storm-grad)"
          strokeWidth="1"
          className={`${className} filter drop-shadow-[0_0_25px_rgba(129,140,248,0.35)]`}
        >
          <defs>
            <linearGradient id="storm-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C084FC" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>
          <path
            fill="rgba(71, 85, 105, 0.2)"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 16.9A5 5 0 0018 7h-1.26A8 8 0 103 16.25c0 .2.02.4.05.6A4 4 0 007 20h10a4 4 0 002-3.1z"
            strokeWidth="1.5"
          />
          <path
            d="M13 16h-3l2-4.5H9.5L12 7"
            stroke="#FBBF24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="#FBBF24"
          />
        </svg>
      </div>
    );
  }

  // 5. Snow
  if (normCond === "snow") {
    return (
      <div className="relative flex items-center justify-center">
        <div className="absolute w-36 h-36 rounded-full bg-sky-300/10 blur-2xl"></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="url(#snow-grad)"
          strokeWidth="1"
          className={`${className} filter drop-shadow-[0_0_20px_rgba(224,242,254,0.3)]`}
        >
          <defs>
            <linearGradient id="snow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#BAE6FD" />
              <stop offset="100%" stopColor="#E0F2FE" />
            </linearGradient>
          </defs>
          <path
            fill="rgba(224, 242, 254, 0.05)"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 16.9A5 5 0 0018 7h-1.26A8 8 0 103 16.25c0 .2.02.4.05.6A4 4 0 007 20h10a4 4 0 002-3.1z"
            strokeWidth="1.5"
          />
          <circle cx="8" cy="21" r="1" fill="#BAE6FD" />
          <circle cx="12" cy="23" r="1" fill="#BAE6FD" />
          <circle cx="16" cy="21" r="1" fill="#BAE6FD" />
        </svg>
      </div>
    );
  }

  // 6. Mist / Fog
  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute w-36 h-36 rounded-full bg-teal-500/10 blur-2xl"></div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="url(#mist-grad)"
        strokeWidth="1.5"
        className={`${className} filter drop-shadow-[0_0_20px_rgba(45,212,191,0.25)]`}
      >
        <defs>
          <linearGradient id="mist-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2DD4BF" />
            <stop offset="100%" stopColor="#0D9488" />
          </linearGradient>
        </defs>
        <line x1="4" y1="8" x2="20" y2="8" strokeLinecap="round" />
        <line x1="6" y1="12" x2="18" y2="12" strokeLinecap="round" />
        <line x1="3" y1="16" x2="21" y2="16" strokeLinecap="round" />
        <line x1="5" y1="20" x2="19" y2="20" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default function WeatherCard({ currentData, unit }) {
  const { name, country, temp, feels_like, temp_min, temp_max, condition, description, timezone } = currentData;

  const displayTemp = (c) => {
    if (unit === "F") {
      return Math.round((c * 9) / 5 + 32);
    }
    return Math.round(c);
  };

  const formattedDate = formatCurrentDateTime(timezone);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-5xl mx-auto glass-panel rounded-4xl p-8 md:p-10 mb-8 border-gradient-blue shadow-2xl relative overflow-hidden"
    >
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-brandPrimary/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Side Details */}
        <div className="text-center md:text-left flex-grow">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-none">
              {name}
            </h2>
            <span className="px-3 py-1 text-[11px] font-black uppercase tracking-wider rounded-lg bg-sky-500/10 border border-sky-400/20 text-sky-400">
              {country}
            </span>
          </div>

          <p className="text-sm text-slate-400 font-medium tracking-wide mb-6">
            {formattedDate}
          </p>

          <div className="flex items-baseline justify-center md:justify-start gap-1 mb-4">
            <motion.span
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-8px font-black tracking-tighter text-white select-none text-[80px]"
            >
              {displayTemp(temp)}
            </motion.span>
            <span className="text-3xl md:text-4xl font-light text-sky-400 select-none">
              °{unit}
            </span>
          </div>

          <p className="text-lg text-slate-100 font-bold capitalize mb-6 flex items-center justify-center md:justify-start gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brandSecondary animate-ping"></span>
            {description}
          </p>

          {/* Quick status bar */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-5 pt-5 border-t border-white/5 text-sm text-slate-400">
            <span className="flex items-center gap-1.5 font-medium">
              <Thermometer className="w-4 h-4 text-orange-400" />
              Feels like: <strong className="text-slate-200 font-semibold">{displayTemp(feels_like)}°</strong>
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <ArrowUp className="w-4 h-4 text-emerald-400" />
              High: <strong className="text-slate-200 font-semibold">{displayTemp(temp_max)}°</strong>
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <ArrowDown className="w-4 h-4 text-sky-400" />
              Low: <strong className="text-slate-200 font-semibold">{displayTemp(temp_min)}°</strong>
            </span>
          </div>
        </div>

        {/* Right Side Illustration */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="flex-shrink-0"
        >
          <WeatherIllustration condition={condition} />
        </motion.div>
      </div>
    </motion.div>
  );
}
