import React from "react";
import { WeatherIllustration } from "./WeatherCard";
import { Clock, Calendar, CloudRain } from "lucide-react";
import { motion } from "framer-motion";

export default function Forecast({ forecastData, hourlyData, unit }) {
  const displayTemp = (celsius) => {
    if (unit === "F") {
      return Math.round((celsius * 9) / 5 + 32);
    }
    return Math.round(celsius);
  };

  // 1. Calculate absolute ranges for the 5-day graph
  const allMaxs = forecastData ? forecastData.map(d => d.temp_max) : [];
  const allMins = forecastData ? forecastData.map(d => d.temp_min) : [];
  const absMax = allMaxs.length > 0 ? Math.max(...allMaxs) : 40;
  const absMin = allMins.length > 0 ? Math.min(...allMins) : -10;
  const absRange = absMax - absMin || 1;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 mb-12 space-y-8">
      {/* 24 HOUR HOURLY FORECAST MODULE */}
      {hourlyData && hourlyData.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-white mb-5 tracking-wide flex items-center gap-2 select-none">
            <Clock className="w-5 h-5 text-sky-400" />
            24-Hour Forecast
          </h3>

          <div className="flex gap-4 overflow-x-auto custom-scrollbar pb-4 snap-x scroll-smooth">
            {hourlyData.map((hour, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className="glass-panel glass-panel-hover flex flex-col items-center justify-between p-4 rounded-2xl min-w-[100px] snap-align-start border border-white/5 shadow-md gap-3 relative overflow-hidden"
              >
                {/* Time */}
                <span className="text-xs font-semibold text-slate-400">
                  {hour.time.replace(":00", "")}
                </span>

                {/* Weather Illustration Icon */}
                <WeatherIllustration
                  condition={hour.condition}
                  className="w-10 h-10 filter drop-shadow-[0_2px_8px_rgba(56,189,248,0.2)]"
                />

                {/* Rain probability badge */}
                <div className="flex items-center gap-0.5 min-h-[16px]">
                  {hour.pop > 0 ? (
                    <span className="text-[10px] font-bold text-sky-400 flex items-center gap-0.5">
                      <CloudRain className="w-3 h-3 text-sky-400/80" />
                      {hour.pop}%
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-500 font-medium select-none">Dry</span>
                  )}
                </div>

                {/* Temperature */}
                <span className="text-md font-bold text-slate-100">
                  {displayTemp(hour.temp)}°
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* 5-DAY WEEKLY FORECAST MODULE */}
      {forecastData && forecastData.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-white mb-5 tracking-wide flex items-center gap-2 select-none">
            <Calendar className="w-5 h-5 text-brandSecondary" />
            5-Day Forecast
          </h3>

          <div className="glass-panel rounded-3xl p-6 border border-white/5 shadow-xl relative overflow-hidden">
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-brandSecondary/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="space-y-4 divide-y divide-white/5">
              {forecastData.map((dayForecast, idx) => {
                // Calculate position offsets for visual graph bar
                const leftPercent = ((dayForecast.temp_min - absMin) / absRange) * 100;
                const widthPercent = ((dayForecast.temp_max - dayForecast.temp_min) / absRange) * 100;

                return (
                  <motion.div
  key={idx}
  initial={{ opacity: 0, x: -10 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.4, delay: idx * 0.05 }}
  className={`
    flex items-center justify-between gap-4
    py-3.5 px-3 rounded-xl
    transition-colors duration-200
    hover:bg-white/5
    active:bg-white/10
    ${idx > 0 ? "pt-4" : ""}
  `}
>
                    {/* Day Column */}
                    <span className="text-sm font-bold text-slate-200 w-16 text-left">
                      {dayForecast.day}
                    </span>

                    {/* Condition Column */}
                    

                    {/* Temperature Graph / Slider Column */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      {/* Min Temp */}
                      <span className="text-xs font-bold text-slate-400 w-8 text-right">
                        {displayTemp(dayForecast.temp_min)}°
                      </span>

                      {/* Apple-style visual range slider bar */}
                      <div className="w-24 sm:w-36 h-2 bg-slate-950/60 rounded-full relative overflow-hidden border border-white/5">
                        <div
                          style={{
                            left: `${leftPercent}%`,
                            width: `${Math.max(12, widthPercent)}%`
                          }}
                          className="absolute inset-y-0 bg-gradient-to-r from-sky-400 to-amber-400 rounded-full"
                        ></div>
                      </div>

                      {/* Max Temp */}
                      <span className="text-xs font-bold text-slate-100 w-8 text-left">
                        {displayTemp(dayForecast.temp_max)}°
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
