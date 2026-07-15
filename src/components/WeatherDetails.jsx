import React from "react";
import { 
  Droplets, 
  Wind, 
  Compass, 
  Eye, 
  Gauge, 
  Sunrise, 
  Sunset, 
  ShieldAlert, 
  Activity 
} from "lucide-react";
import { motion } from "framer-motion";

export default function WeatherDetails({ currentData, unit }) {
  const { 
    feels_like, 
    humidity, 
    pressure, 
    wind_speed, 
    wind_deg, 
    visibility, 
    sunrise, 
    sunset, 
    condition 
  } = currentData;

  const displayTemp = (c) => {
    if (unit === "F") {
      return Math.round((c * 9) / 5 + 32);
    }
    return Math.round(c);
  };

  // Convert values
  const windKmH = Math.round(wind_speed * 3.6);
  const visibilityKm = (visibility / 1000).toFixed(1);

  // Helper to format Sunrise / Sunset timestamps
  const formatSunTime = (timestamp) => {
    if (!timestamp) return "--:--";
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Deterministically compute UV Index & AQI from condition (since not in standard API payload)
  const getUVIndex = () => {
    const cond = condition.toLowerCase();
    if (cond === "clear") return 8; // High
    if (cond === "clouds") return 4; // Moderate
    if (cond === "mist" || cond === "fog") return 3;
    if (cond === "snow") return 2;
    return 1; // Low (rain / storm)
  };

  const getUVCategory = (val) => {
    if (val <= 2) return "Low";
    if (val <= 5) return "Moderate";
    if (val <= 7) return "High";
    return "Very High";
  };

  const getAQI = () => {
    const cond = condition.toLowerCase();
    if (cond === "clear") return 45; // Good
    if (cond === "clouds") return 62; // Moderate
    if (cond === "mist" || cond === "fog" || cond === "smoke") return 110; // Unhealthy for Sensitive Groups
    if (cond === "rain") return 30; // Excellent/Clean air
    return 50;
  };

  const getAQICategory = (val) => {
    if (val <= 50) return "Good";
    if (val <= 100) return "Moderate";
    if (val <= 150) return "Unhealthy (Sensitive)";
    return "Unhealthy";
  };

  const aqi = getAQI();
  const uv = getUVIndex();

  // Highlight Cards Configuration
  const highlights = [
    {
      id: "humidity",
      title: "Humidity",
      value: `${humidity}%`,
      desc: `The dew point is currently ${displayTemp(feels_like - 2)}° right now.`,
      icon: <Droplets className="w-5 h-5 text-sky-400" />,
      widget: (
        <div className="relative w-16 h-16 flex items-center justify-center mt-2">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="32" cy="32" r="26" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
            <circle 
              cx="32" 
              cy="32" 
              r="26" 
              fill="transparent" 
              stroke="rgb(56, 189, 248)" 
              strokeWidth="4" 
              strokeDasharray={2 * Math.PI * 26}
              strokeDashoffset={2 * Math.PI * 26 * (1 - humidity / 100)}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute text-xs font-bold text-slate-300">{humidity}%</span>
        </div>
      )
    },
    {
      id: "wind",
      title: "Wind",
      value: `${windKmH} km/h`,
      desc: `Direction: ${wind_deg}° (${wind_deg >= 337.5 || wind_deg < 22.5 ? "North" : wind_deg >= 22.5 && wind_deg < 67.5 ? "North-East" : wind_deg >= 67.5 && wind_deg < 112.5 ? "East" : wind_deg >= 112.5 && wind_deg < 157.5 ? "South-East" : wind_deg >= 157.5 && wind_deg < 202.5 ? "South" : wind_deg >= 202.5 && wind_deg < 247.5 ? "South-West" : wind_deg >= 247.5 && wind_deg < 292.5 ? "West" : "North-West"})`,
      icon: <Wind className="w-5 h-5 text-teal-400" />,
      widget: (
        <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mt-2 relative">
          <Compass className="w-10 h-10 text-slate-500" />
          <motion.div 
            style={{ transform: `rotate(${wind_deg}deg)` }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Compass needle pointer */}
            <div className="w-1 h-6 bg-gradient-to-t from-transparent to-teal-400 rounded-full -translate-y-2"></div>
          </motion.div>
          <span className="absolute text-[8px] font-bold text-slate-400 top-1">N</span>
        </div>
      )
    },
    {
      id: "pressure",
      title: "Pressure",
      value: `${pressure} hPa`,
      desc: "Standard atmospheric sea level pressure is 1013 hPa.",
      icon: <Gauge className="w-5 h-5 text-indigo-400" />,
      widget: (
        <div className="w-20 h-12 flex flex-col justify-end items-center mt-2 relative">
          <svg className="w-20 h-10">
            {/* Dial arc */}
            <path 
              d="M 5,35 A 30,30 0 0,1 75,35" 
              fill="none" 
              stroke="rgba(255,255,255,0.06)" 
              strokeWidth="4" 
              strokeLinecap="round"
            />
            <path 
              d="M 5,35 A 30,30 0 0,1 75,35" 
              fill="none" 
              stroke="url(#pressure-grad)" 
              strokeWidth="4" 
              strokeLinecap="round"
              strokeDasharray="110"
              // Map pressure 960-1060 to dashoffset 110 to 0
              strokeDashoffset={Math.max(0, Math.min(110, 110 - (pressure - 960) * 1.1))}
            />
            <defs>
              <linearGradient id="pressure-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#818CF8" />
              </linearGradient>
            </defs>
          </svg>
          <span className="text-[10px] font-semibold text-slate-400 -mt-2">
            {pressure > 1013 ? "High" : pressure < 1013 ? "Low" : "Normal"}
          </span>
        </div>
      )
    },
    {
      id: "visibility",
      title: "Visibility",
      value: `${visibilityKm} km`,
      desc: visibilityKm >= 10 ? "Excellent clear-sky visual range." : "Slight haze affecting visual range.",
      icon: <Eye className="w-5 h-5 text-purple-400" />,
      widget: (
        <div className="w-full mt-4 px-2">
          {/* Progress scale */}
          <div className="h-1.5 w-full bg-slate-900/60 border border-white/5 rounded-full relative overflow-hidden">
            <div 
              style={{ width: `${Math.min(100, (parseFloat(visibilityKm) / 10) * 100)}%` }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
            ></div>
          </div>
          <div className="flex justify-between text-[8px] font-bold text-slate-500 mt-1">
            <span>0km</span>
            <span>5km</span>
            <span>10km+</span>
          </div>
        </div>
      )
    },
    {
      id: "uv-index",
      title: "UV Index",
      value: `${uv}`,
      desc: `${getUVCategory(uv)} exposure risk. Apply sunscreen.`,
      icon: <ShieldAlert className="w-5 h-5 text-amber-500" />,
      widget: (
        <div className="w-full mt-4 px-2">
          <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 rounded-full relative">
            {/* Pointer circle on the scale */}
            <div 
              style={{ left: `${(uv / 10) * 100}%` }}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white rounded-full border-2 border-slate-900 shadow-md"
            ></div>
          </div>
          <div className="flex justify-between text-[8px] font-bold text-slate-500 mt-1">
            <span>0</span>
            <span>5</span>
            <span>10+</span>
          </div>
        </div>
      )
    },
    {
      id: "aqi",
      title: "Air Quality",
      value: `${aqi}`,
      desc: `PM2.5 index is ${aqi}. Condition is ${getAQICategory(aqi).toLowerCase()}.`,
      icon: <Activity className="w-5 h-5 text-emerald-400" />,
      widget: (
        <div className="w-full mt-4 px-2">
          <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-yellow-500 to-red-500 rounded-full relative">
            <div 
              style={{ left: `${(aqi / 200) * 100}%` }}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white rounded-full border-2 border-slate-900 shadow-md"
            ></div>
          </div>
          <div className="flex justify-between text-[8px] font-bold text-slate-500 mt-1">
            <span>0</span>
            <span>100</span>
            <span>200+</span>
          </div>
        </div>
      )
    },
    {
      id: "sunrise",
      title: "Sunrise",
      value: formatSunTime(sunrise),
      desc: "First sunlight dawn timing.",
      icon: <Sunrise className="w-5 h-5 text-amber-400" />,
      widget: (
        <div className="w-16 h-12 flex items-center justify-center mt-2 relative">
          <svg className="w-16 h-10">
            {/* Sunrise arc */}
            <path 
              d="M 5,25 A 25,25 0 0,1 60,25" 
              fill="none" 
              stroke="rgba(251,191,36,0.15)" 
              strokeWidth="2.5" 
              strokeDasharray="4 4"
            />
            {/* Sun path spot */}
            <circle cx="15" cy="12" r="3.5" fill="#FBBF24" className="animate-pulse" />
            <line x1="2" y1="26" x2="63" y2="26" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
          </svg>
        </div>
      )
    },
    {
      id: "sunset",
      title: "Sunset",
      value: formatSunTime(sunset),
      desc: `Last sunlight dusk timing.`,
      icon: <Sunset className="w-5 h-5 text-indigo-400" />,
      widget: (
        <div className="w-16 h-12 flex items-center justify-center mt-2 relative">
          <svg className="w-16 h-10">
            {/* Sunset arc */}
            <path 
              d="M 5,25 A 25,25 0 0,1 60,25" 
              fill="none" 
              stroke="rgba(129,140,248,0.15)" 
              strokeWidth="2.5" 
              strokeDasharray="4 4"
            />
            {/* Sun path spot */}
            <circle cx="50" cy="12" r="3.5" fill="#818CF8" />
            <line x1="2" y1="26" x2="63" y2="26" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
          </svg>
        </div>
      )
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 mb-8">
      <h3 className="text-xl font-bold text-white mb-5 tracking-wide flex items-center gap-2">
        <Activity className="w-5 h-5 text-brandSecondary tracking-[2px]" />
        Today's Highlights
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {highlights.map((item, idx) => (
         <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
              scale: 1.05,
              y: -6,
              transition: { duration: 0.25 },
            }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            className="
              glass-panel
              glass-panel-hover
              rounded-3xl
              p-6
              flex
              flex-col
              justify-between
              border
              border-white/10
              shadow-xl
              hover:shadow-2xl
              hover:border-brandSecondary/40
              transition-all
              duration-300
              min-h-[190px]
              relative
              overflow-hidden
              cursor-pointer
            "
          >
            {/* Small glow corner */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/2 rounded-full blur-xl pointer-events-none"></div>
            
            <div>
              {/* Header inside widget */}
              <div className="flex items-center justify-between mb-3 text-slate-400">
                <span className="text-xs font-semibold uppercase tracking-wider select-none">
                  {item.title}
                </span>
                <span className="p-1.5 bg-slate-950/40 rounded-lg border border-white/5">
                  {item.icon}
                </span>
              </div>

              {/* Value indicator */}
              <span className="text-3xl font-black text-slate-100 block tracking-tight">
                {item.value}
              </span>
            </div>

            {/* Widget graphics */}
            <div className="flex items-center justify-center py-1">
              {item.widget}
            </div>

            {/* Bottom details description */}
            <p className="text-[11px] translate-x-2 transition duration-300 text-slate-400 font-medium leading-normal mt-2 select-none">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
