import React, { useState, useEffect } from "react";
import { useWeather } from "./hooks/useWeather";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import WeatherDetails from "./components/WeatherDetails";
import Forecast from "./components/Forecast";
import Loading from "./components/Loading";
import Error from "./components/Error";
import { Navigation, Sun, Cloud, CloudRain, CloudLightning, Snowflake ,Calendar, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const { weatherData, loading, error, unit, toggleUnit, searchCity, searchMyLocation } = useWeather();
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const offset = weatherData ? weatherData.current.timezone : 0;
      const utc = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
      const destDate = new Date(utc + offset * 1000);
      
      setLocalTime(destDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [weatherData]);

  const getHeaderDate = () => {
    const offset = weatherData ? weatherData.current.timezone : 0;
    const utc = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
    const destDate = new Date(utc + offset * 1000);
    
    return destDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const getCondition = () => {
    return weatherData?.current?.condition?.toLowerCase() || "";
  };

  // Weather-dependent Background Overlays
  const renderWeatherOverlay = () => {
    if (!weatherData || loading || error) return null;
    const cond = getCondition();

    if (cond === "clear") {
      return <div className="absolute inset-0 sunny-glow-bg pointer-events-none transition-all duration-1000"></div>;
    }
    if (cond === "rain" || cond === "drizzle") {
      return <div className="rain-particles transition-all duration-1000"></div>;
    }
    if (cond === "clouds") {
      return <div className="moving-clouds transition-all duration-1000"></div>;
    }
    if (cond === "thunderstorm") {
      return (
        <>
          <div className="rain-particles opacity-30 transition-all duration-1000"></div>
          <div className="lightning-flash"></div>
        </>
      );
    }
    if (cond === "snow") {
      return <div className="snow-particles transition-all duration-1000"></div>;
    }
    return null;
  };

  return (
    <div className="luxury-bg min-h-screen w-full py-8 px-4 flex flex-col justify-between relative overflow-hidden">
      {/* Layered Background Elements */}
      <div className="noise-overlay"></div>
      
      {/* Blurred Floating Circles */}
      

      {/* Weather Overlay Particles */}
      {renderWeatherOverlay()}

      {/* Main Layout Area */}
      <div className="relative z-10 w-full">
        {/* HEADER */}
        <header className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 mb-10 px-4">
          {/* Logo on Left */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl  flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)] border border-white/10 ">
             <img src={'/src/assets/fav.png'}></img>
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-[4px] bg-gradient-to-r from-sky-400 via-indigo-200 to-white bg-clip-text text-transparent">
                NIMBUSX
              </h1>
              <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500 -mt-1">
                Atmospheric Intelligence
              </p>
            </div>
          </div>

          {/* Location details, Clock and Unit switch on Right */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-slate-300 text-sm font-semibold">
            {/* Geolocation Button */}
            <button
              onClick={searchMyLocation}
              title="Detect my location"
              className="glass-panel p-2.5 rounded-xl hover:bg-white/10 border border-white/10 active:scale-95 transition-all text-sky-400"
            >
              <Navigation className="w-4 h-4" />
            </button>

            {/* Date and Time widgets */}
            <div className="glass-panel px-4 py-2.5 rounded-xl border border-white/10 flex items-center gap-1.5 select-none text-xs">
              <span className="text-slate-400">{getHeaderDate()}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
              <span className="text-sky-400 font-mono font-bold tracking-wide min-w-[70px] text-center">
                {localTime || "--:--:--"}
              </span>
            </div>

            {/* Temp toggle */}
            <button
              onClick={toggleUnit}
              className="glass-panel px-4 py-2.5 rounded-xl hover:bg-white/10 border border-white/10 active:scale-95 transition-all flex items-center gap-1.5 text-xs text-slate-200"
            >
              <span>Unit:</span>
              <strong className="text-sky-400 font-extrabold">°{unit}</strong>
            </button>
          </div>
        </header>

        {/* SEARCH BAR */}
        <SearchBar onSearch={searchCity} isLoading={loading} />

        {/* CONTENT LAYOUT */}
        <main className="max-w-5xl mx-auto min-h-[500px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Loading />
              </motion.div>
            )}

            {!loading && error && (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Error message={error} />
              </motion.div>
            )}

            {!loading && !error && weatherData && (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full space-y-8"
              >
                {/* Hero section: Spans full width on desktop */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                  {/* Left Column: Hero Weather Card */}
                  <div className="lg:col-span-3">
                    <WeatherCard currentData={weatherData.current} unit={unit} />
                  </div>
                  
                  {/* Right Column: Mini calendar/location overview panel */}
                  <div className="lg:col-span-1 glass-panel rounded-4xl p-6 border-gradient-blue shadow-xl h-full flex flex-col justify-between min-h-[300px] relative overflow-hidden">
                    <div className="absolute -top-12 -left-12 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
                    <div>
                      <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest block mb-2">Location overview</span>
                      <h4 className="text-2xl font-black text-white truncate">{weatherData.current.name}</h4>
                      <p className="text-xs text-slate-400 font-medium capitalize mt-1 mb-4">{weatherData.current.description}</p>
                      
                      <div className="space-y-3 text-xs text-slate-300 font-semibold border-t border-white/5 pt-4">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Latitude:</span>
                          <span className="font-mono">{weatherData.current.coord.lat.toFixed(2)}°</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Longitude:</span>
                          <span className="font-mono">{weatherData.current.coord.lon.toFixed(2)}°</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">TimeZone:</span>
                          <span className="font-mono">UTC {weatherData.current.timezone >= 0 ? "+" : ""}{weatherData.current.timezone / 3600}h</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-3 bg-slate-950/40 rounded-2xl border border-white/5 flex items-center gap-3">
                      <Calendar className="w-8 h-8 text-sky-400/80 flex-shrink-0" />
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500 block">Current Day</span>
                        <span className="text-xs font-bold text-slate-200">{getHeaderDate()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Forecast 
                  forecastData={weatherData.forecast} 
                  hourlyData={weatherData.hourly} 
                  unit={unit} 
                />

                
                <WeatherDetails currentData={weatherData.current} unit={unit} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* FOOTER */}
      <footer className="max-w-5xl mx-auto w-full text-center mt-16 pt-6  relative z-10">
        
<div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10 pt-4 mt-4 text-xs text-slate-400">
  <span>© 2026 NimbusX. All rights reserved.</span>

  <span>Weather information updated in real time.</span>

  <span>v1.0</span>
</div>

      </footer>
    </div>
  );
}
