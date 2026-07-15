import { useState, useEffect, useCallback } from "react";
import { getWeatherData } from "../services/weatherApi";

const LOCAL_STORAGE_KEY = "nimbusx_last_city";
const DEFAULT_CITY = "New York";

export function useWeather() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState(
    localStorage.getItem("nimbusx_unit") || "C"
  );

  const toggleUnit = () => {
    const next = unit === "C" ? "F" : "C";
    setUnit(next);
    localStorage.setItem("nimbusx_unit", next);
  };

  const fetchWeather = useCallback(async (query) => {
    setLoading(true);
    setError(null);

    try {
      const data = await getWeatherData(query);
      setWeatherData(data);

      if (data.current?.name) {
        localStorage.setItem(LOCAL_STORAGE_KEY, data.current.name);
      }
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const city =
      localStorage.getItem(LOCAL_STORAGE_KEY) || DEFAULT_CITY;
    fetchWeather(city);
  }, [fetchWeather]);

  const searchMyLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      fetchWeather({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      });
    });
  };

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