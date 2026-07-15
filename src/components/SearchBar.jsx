import React, { useState, useRef, useEffect } from "react";
import { Search, Loader2, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const POPULAR_CITIES = [
  { name: "London", country: "GB" },
  { name: "New York", country: "US" },
  { name: "Tokyo", country: "JP" },
  { name: "Paris", country: "FR" },
  { name: "Sydney", country: "AU" }
];

export default function SearchBar({ onSearch, isLoading }) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef(null);

  // Close suggestions dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed && !isLoading) {
      onSearch(trimmed);
      setIsFocused(false);
    }
  };

  const handleSuggestionClick = (cityName) => {
    setQuery(cityName);
    onSearch(cityName);
    setIsFocused(false);
  };

  const filteredSuggestions = query.trim() 
    ? POPULAR_CITIES.filter(city => 
        city.name.toLowerCase().includes(query.toLowerCase())
      )
    : POPULAR_CITIES;

  return (
    <div className="w-full max-w-2xl mx-auto mb-10 px-4 relative z-50" ref={dropdownRef}>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative flex items-center gap-3">
          <div className="relative flex-grow">
            {/* Search Icon on left */}
            <div className="relative group w-full">
  {/* Search Icon */}
  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 transition-all duration-300 group-focus-within:text-sky-400 group-focus-within:scale-110">
    <Search className="w-5 h-5" />
  </span>

  <input
    type="text"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    onFocus={() => setIsFocused(true)}
    placeholder="Search for a city..."
    disabled={isLoading}
    className="
      w-full
      h-16
      pl-14
      pr-14
      rounded-2xl

      bg-white/5
      backdrop-blur-xl
      border border-white/10

      text-white
      placeholder:text-slate-400
      text-[15px]
      font-medium
      tracking-wide

      transition-all
      duration-300


     

      shadow-xl
      disabled:opacity-60
      disabled:cursor-not-allowed
    "
  />

  {/* Glow */}
  <div className="absolute inset-0 rounded-2xl bg-sky-500/5 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
</div>
            {/* Keyboard hint inside input */}
            <span className="hidden md:flex absolute inset-y-0 right-4 items-center pointer-events-none">
              <kbd className="px-2 py-1 text-[10px] font-semibold text-slate-500 bg-slate-950/60 border border-white/5 rounded-md">
                Enter
              </kbd>
            </span>
          </div>

          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className={`h-[60px] px-8 rounded-2xl font-semibold text-white tracking-wide transition-all duration-300 transform active:scale-95 shadow-md flex items-center justify-center gap-2 group ${
              isLoading || !query.trim()
                ? "bg-slate-900/40 text-slate-500 border border-white/5 cursor-not-allowed"
                : "bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 border border-sky-400/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            }`}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <span className="group-hover:translate-x-0.5 transition-transform">Search</span>
            )}
          </button>
        </div>
      </form>

      {/* Autocomplete Dropdown suggestions list with Framer Motion */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-4 right-4 mt-2.5 glass-panel rounded-2xl overflow-hidden shadow-2xl border border-white/10 z-50 py-3"
          >
            <div className="px-4 py-1 text-[10px] uppercase font-bold tracking-widest text-slate-500 border-b border-white/5 mb-2">
              {query.trim() ? "Matches" : "Popular Locations"}
            </div>
            
            {filteredSuggestions.length > 0 ? (
              <div className="space-y-0.5 max-h-[220px] overflow-y-auto custom-scrollbar">
                {filteredSuggestions.map((city, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSuggestionClick(city.name)}
                    className="w-full px-4 py-2.5 flex items-center gap-3 text-left text-slate-300 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium"
                  >
                    <MapPin className="w-4 h-4 text-sky-400/80" />
                    <span>{city.name}</span>
                    <span className="ml-auto text-[10px] font-bold text-slate-500 bg-white/5 border border-white/5 px-2 py-0.5 rounded-md uppercase">
                      {city.country}
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-4 py-3 text-sm text-slate-400 text-center">
                No matching cities found
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
