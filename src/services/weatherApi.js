const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function getWeatherData(query) {
  let url;

  if (typeof query === "object" && query.lat && query.lon) {
    url = `${BASE_URL}?lat=${query.lat}&lon=${query.lon}&appid=${API_KEY}&units=metric`;
  } else {
    url = `${BASE_URL}?q=${encodeURIComponent(query)}&appid=${API_KEY}&units=metric`;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch weather");
  }

  const data = await response.json();

  return {
    current: {
      name: data.name,
      country: data.sys.country,

      coord: {
        lat: data.coord.lat,
        lon: data.coord.lon,
      },

      timezone: data.timezone,

      temp: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      visibility: data.visibility,

      windSpeed: data.wind.speed,

      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,

      condition: data.weather[0].main,
      weather: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
    },

    forecast: [],
    hourly: [],
  };
}