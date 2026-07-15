import { useState, useEffect, useCallback } from "react";
import { getWeatherData } from "../services/weatherApi";

const LOCAL_STORAGE_KEY = "nimbusx_last_city";
const DEFAULT_CITY = "New York";

export function useWeather() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState(() => {
    return localStorage.getItem("nimbusx_unit") || "C";
  });

  const toggleUnit = useCallback(() => {
    setUnit(prev => {
      const next = prev === "C" ? "F" : "C";
      localStorage.setItem("nimbusx_unit", next);
      return next;
    });
  }, []);

  const fetchWeather = useCallback(async (query) => {
    const isCoords = typeof query === "object" && query?.lat !== undefined && query?.lon !== undefined;
    if (!isCoords && (!query || query.trim() === "")) {
      setError("Please enter a valid city name.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await getWeatherData(query);
      setWeatherData(data);
      // Save last searched city to localStorage
      if (data.current.name && data.current.name !== "Your Location") {
        localStorage.setItem(LOCAL_STORAGE_KEY, data.current.name);
      }
    } catch (err) {
      console.error("Error fetching weather data:", err);
      if (err.status === 404) {
        setError("City not found. Please enter a valid city.");
      } else if (err.status === 503) {
        setError("Network failure. Please check your internet connection.");
      } else {
        setError(err.message || "An unexpected error occurred. Please try again.");
      }
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchMyLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather({ lat: latitude, lon: longitude });
      },
      (err) => {
        console.error("Geolocation error:", err);
        setError("Location access denied. Using manual search.");
        // Fall back to last saved city or default
        const lastCity = localStorage.getItem(LOCAL_STORAGE_KEY) || DEFAULT_CITY;
        fetchWeather(lastCity);
      },
      { timeout: 10000 }
    );
  }, [fetchWeather]);

  // Load last searched city or default on mount
  useEffect(() => {
    const lastCity = localStorage.getItem(LOCAL_STORAGE_KEY) || DEFAULT_CITY;
    fetchWeather(lastCity);
  }, [fetchWeather]);

  return {
    weatherData,
    loading,
    error,
    unit,
    toggleUnit,
    searchCity: fetchWeather,
    searchMyLocation,
  };
}
