// Get API key from Environment Variables
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || "";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// High-quality mock data for standard cities if API key is not present or fails
const MOCK_CITIES = {
  "london": {
    name: "London",
    country: "GB",
    timezone: 3600,
    temp: 18.5,
    feels_like: 17.8,
    temp_min: 15.0,
    temp_max: 21.0,
    humidity: 78,
    pressure: 1012,
    wind_speed: 4.6,
    wind_deg: 240,
    visibility: 10000,
    sunrise: Math.round(new Date().setHours(5, 12) / 1000),
    sunset: Math.round(new Date().setHours(21, 5) / 1000),
    condition: "Clouds",
    description: "scattered clouds",
    icon: "03d",
    coord: { lat: 51.5074, lon: -0.1278 },
    forecast: [
      { day: "Thu", temp_min: 14, temp_max: 20, condition: "Rain", icon: "10d" },
      { day: "Fri", temp_min: 15, temp_max: 22, condition: "Clouds", icon: "02d" },
      { day: "Sat", temp_min: 16, temp_max: 24, condition: "Clear", icon: "01d" },
      { day: "Sun", temp_min: 15, temp_max: 21, condition: "Clouds", icon: "04d" },
      { day: "Mon", temp_min: 13, temp_max: 19, condition: "Rain", icon: "09d" }
    ],
    hourly: [
      { time: "08:00 AM", temp: 16, condition: "Clouds", icon: "02d", pop: 10 },
      { time: "11:00 AM", temp: 18, condition: "Clouds", icon: "03d", pop: 15 },
      { time: "02:00 PM", temp: 20, condition: "Clouds", icon: "03d", pop: 20 },
      { time: "05:00 PM", temp: 19, condition: "Rain", icon: "10d", pop: 70 },
      { time: "08:00 PM", temp: 17, condition: "Rain", icon: "10d", pop: 85 },
      { time: "11:00 PM", temp: 16, condition: "Clouds", icon: "04d", pop: 30 },
      { time: "02:00 AM", temp: 15, condition: "Clouds", icon: "04d", pop: 10 },
      { time: "05:00 AM", temp: 14, condition: "Clouds", icon: "02d", pop: 5 }
    ]
  },
  "new york": {
    name: "New York",
    country: "US",
    timezone: -14400,
    temp: 26.2,
    feels_like: 27.5,
    temp_min: 22.0,
    temp_max: 29.0,
    humidity: 65,
    pressure: 1016,
    wind_speed: 3.1,
    wind_deg: 180,
    visibility: 9600,
    sunrise: Math.round(new Date().setHours(5, 30) / 1000),
    sunset: Math.round(new Date().setHours(20, 20) / 1000),
    condition: "Clear",
    description: "clear sky",
    icon: "01d",
    coord: { lat: 40.7128, lon: -74.0060 },
    forecast: [
      { day: "Thu", temp_min: 21, temp_max: 30, condition: "Clear", icon: "01d" },
      { day: "Fri", temp_min: 23, temp_max: 32, condition: "Clouds", icon: "02d" },
      { day: "Sat", temp_min: 22, temp_max: 28, condition: "Thunderstorm", icon: "11d" },
      { day: "Sun", temp_min: 20, temp_max: 26, condition: "Rain", icon: "10d" },
      { day: "Mon", temp_min: 19, temp_max: 27, condition: "Clear", icon: "01d" }
    ],
    hourly: [
      { time: "08:00 AM", temp: 23, condition: "Clear", icon: "01d", pop: 0 },
      { time: "11:00 AM", temp: 26, condition: "Clear", icon: "01d", pop: 0 },
      { time: "02:00 PM", temp: 28, condition: "Clouds", icon: "02d", pop: 5 },
      { time: "05:00 PM", temp: 29, condition: "Clouds", icon: "02d", pop: 10 },
      { time: "08:00 PM", temp: 27, condition: "Clear", icon: "01n", pop: 0 },
      { time: "11:00 PM", temp: 25, condition: "Clear", icon: "01n", pop: 0 },
      { time: "02:00 AM", temp: 23, condition: "Clear", icon: "01n", pop: 0 },
      { time: "05:00 AM", temp: 22, condition: "Clear", icon: "01n", pop: 0 }
    ]
  },
  "tokyo": {
    name: "Tokyo",
    country: "JP",
    timezone: 32400,
    temp: 29.8,
    feels_like: 33.2,
    temp_min: 26.0,
    temp_max: 32.0,
    humidity: 70,
    pressure: 1008,
    wind_speed: 2.8,
    wind_deg: 90,
    visibility: 10000,
    sunrise: Math.round(new Date().setHours(4, 45) / 1000),
    sunset: Math.round(new Date().setHours(18, 55) / 1000),
    condition: "Rain",
    description: "moderate rain",
    icon: "10d",
    coord: { lat: 35.6762, lon: 139.6503 },
    forecast: [
      { day: "Thu", temp_min: 25, temp_max: 31, condition: "Rain", icon: "10d" },
      { day: "Fri", temp_min: 24, temp_max: 29, condition: "Thunderstorm", icon: "11d" },
      { day: "Sat", temp_min: 26, temp_max: 33, condition: "Clouds", icon: "03d" },
      { day: "Sun", temp_min: 25, temp_max: 32, condition: "Clear", icon: "01d" },
      { day: "Mon", temp_min: 24, temp_max: 30, condition: "Clouds", icon: "04d" }
    ],
    hourly: [
      { time: "08:00 AM", temp: 27, condition: "Clouds", icon: "02d", pop: 20 },
      { time: "11:00 AM", temp: 29, condition: "Rain", icon: "10d", pop: 60 },
      { time: "02:00 PM", temp: 30, condition: "Rain", icon: "10d", pop: 85 },
      { time: "05:00 PM", temp: 28, condition: "Thunderstorm", icon: "11d", pop: 90 },
      { time: "08:00 PM", temp: 27, condition: "Rain", icon: "10d", pop: 70 },
      { time: "11:00 PM", temp: 26, condition: "Clouds", icon: "04d", pop: 40 },
      { time: "02:00 AM", temp: 25, condition: "Clouds", icon: "04d", pop: 20 },
      { time: "05:00 AM", temp: 25, condition: "Clouds", icon: "03d", pop: 15 }
    ]
  },
  "paris": {
    name: "Paris",
    country: "FR",
    timezone: 7200,
    temp: 22.1,
    feels_like: 21.9,
    temp_min: 18.0,
    temp_max: 25.0,
    humidity: 55,
    pressure: 1015,
    wind_speed: 5.1,
    wind_deg: 320,
    visibility: 10000,
    sunrise: Math.round(new Date().setHours(5, 50) / 1000),
    sunset: Math.round(new Date().setHours(21, 40) / 1000),
    condition: "Clouds",
    description: "few clouds",
    icon: "02d",
    coord: { lat: 48.8566, lon: 2.3522 },
    forecast: [
      { day: "Thu", temp_min: 17, temp_max: 24, condition: "Clear", icon: "01d" },
      { day: "Fri", temp_min: 18, temp_max: 26, condition: "Clear", icon: "01d" },
      { day: "Sat", temp_min: 19, temp_max: 27, condition: "Clouds", icon: "03d" },
      { day: "Sun", temp_min: 16, temp_max: 23, condition: "Rain", icon: "10d" },
      { day: "Mon", temp_min: 15, temp_max: 21, condition: "Clouds", icon: "04d" }
    ],
    hourly: [
      { time: "08:00 AM", temp: 19, condition: "Clear", icon: "01d", pop: 0 },
      { time: "11:00 AM", temp: 22, condition: "Clouds", icon: "02d", pop: 10 },
      { time: "02:00 PM", temp: 24, condition: "Clouds", icon: "02d", pop: 10 },
      { time: "05:00 PM", temp: 25, condition: "Clouds", icon: "03d", pop: 15 },
      { time: "08:00 PM", temp: 23, condition: "Clear", icon: "01d", pop: 0 },
      { time: "11:00 PM", temp: 21, condition: "Clear", icon: "01n", pop: 0 },
      { time: "02:00 AM", temp: 19, condition: "Clear", icon: "01n", pop: 0 },
      { time: "05:00 AM", temp: 18, condition: "Clear", icon: "01n", pop: 0 }
    ]
  },
  "sydney": {
    name: "Sydney",
    country: "AU",
    timezone: 36000,
    temp: 14.3,
    feels_like: 13.5,
    temp_min: 10.0,
    temp_max: 17.0,
    humidity: 82,
    pressure: 1024,
    wind_speed: 6.2,
    wind_deg: 160,
    visibility: 9000,
    sunrise: Math.round(new Date().setHours(6, 45) / 1000),
    sunset: Math.round(new Date().setHours(17, 10) / 1000),
    condition: "Mist",
    description: "misty morning",
    icon: "50d",
    coord: { lat: -33.8688, lon: 151.2093 },
    forecast: [
      { day: "Thu", temp_min: 9, temp_max: 16, condition: "Clouds", icon: "03d" },
      { day: "Fri", temp_min: 11, temp_max: 18, condition: "Clear", icon: "01d" },
      { day: "Sat", temp_min: 12, temp_max: 19, condition: "Clear", icon: "01d" },
      { day: "Sun", temp_min: 10, temp_max: 15, condition: "Rain", icon: "09d" },
      { day: "Mon", temp_min: 9, temp_max: 16, condition: "Clouds", icon: "04d" }
    ],
    hourly: [
      { time: "08:00 AM", temp: 11, condition: "Mist", icon: "50d", pop: 10 },
      { time: "11:00 AM", temp: 14, condition: "Clouds", icon: "03d", pop: 15 },
      { time: "02:00 PM", temp: 16, condition: "Clear", icon: "01d", pop: 5 },
      { time: "05:00 PM", temp: 15, condition: "Clear", icon: "01d", pop: 0 },
      { time: "08:00 PM", temp: 13, condition: "Clear", icon: "01n", pop: 0 },
      { time: "11:00 PM", temp: 12, condition: "Clear", icon: "01n", pop: 0 },
      { time: "02:00 AM", temp: 11, condition: "Clear", icon: "01n", pop: 0 },
      { time: "05:00 AM", temp: 10, condition: "Clear", icon: "01n", pop: 0 }
    ]
  }
};

// Deterministic generator to make realistic data for any city name searched offline
function generateMockData(cityName) {
  const normName = cityName.trim().toLowerCase();
  if (MOCK_CITIES[normName]) return MOCK_CITIES[normName];

  // Derive a pseudo-random hash from city name
  let hash = 0;
  for (let i = 0; i < normName.length; i++) {
    hash = normName.charCodeAt(i) + ((hash << 5) - hash);
  }
  hash = Math.abs(hash);

  const countries = ["US", "IN", "GB", "DE", "CA", "FR", "JP", "AU", "ZA", "BR"];
  const country = countries[hash % countries.length];
  
  const conditions = [
    { cond: "Clear", desc: "clear sky", icon: "01d" },
    { cond: "Clouds", desc: "few clouds", icon: "02d" },
    { cond: "Clouds", desc: "broken clouds", icon: "04d" },
    { cond: "Rain", desc: "moderate rain", icon: "10d" },
    { cond: "Rain", desc: "light intensity drizzle", icon: "09d" },
    { cond: "Thunderstorm", desc: "thunderstorm with rain", icon: "11d" },
    { cond: "Snow", desc: "light snow", icon: "13d" },
    { cond: "Mist", desc: "misty air", icon: "50d" }
  ];
  
  const baseCond = conditions[hash % conditions.length];
  
  // Realistic temp range between -5 and 35 based on hash
  const temp = Math.round((hash % 40) - 5 + (hash % 10) / 10);
  const feels_like = Math.round(temp + ((hash % 6) - 3) * 0.9);
  const temp_min = Math.round(temp - (hash % 5) - 2);
  const temp_max = Math.round(temp + (hash % 6) + 2);
  
  const humidity = 40 + (hash % 55);
  const pressure = 995 + (hash % 30);
  const wind_speed = parseFloat((1.2 + (hash % 12) * 0.8).toFixed(1));
  const wind_deg = (hash % 36) * 10;
  const visibility = (hash % 3 === 0) ? 7000 : 10000;
  
  const timezoneOptions = [-28800, -18000, -14400, 0, 3600, 7200, 19800, 28800, 32400, 36000];
  const timezone = timezoneOptions[hash % timezoneOptions.length];

  const sunrise = Math.round(new Date().setHours(5, hash % 40) / 1000);
  const sunset = Math.round(new Date().setHours(18, 20 + (hash % 38)) / 1000);
  const lat = parseFloat(((hash % 180) - 90).toFixed(4));
  const lon = parseFloat(((hash % 360) - 180).toFixed(4));

  const daysOfWeek = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];
  const forecast = Array.from({ length: 5 }, (_, index) => {
    const fHash = hash + index + 1;
    const fCond = conditions[fHash % conditions.length];
    const fTemp = Math.round(temp + (fHash % 8) - 4);
    return {
      day: daysOfWeek[index],
      temp_min: Math.round(fTemp - (fHash % 3) - 1),
      temp_max: Math.round(fTemp + (fHash % 4) + 1),
      condition: fCond.cond,
      icon: fCond.icon
    };
  });

  const hours = ["08:00 AM", "11:00 AM", "02:00 PM", "05:00 PM", "08:00 PM", "11:00 PM", "02:00 AM", "05:00 AM"];
  const hourly = hours.map((h, i) => {
    const hHash = hash + i * 7;
    const hCond = conditions[hHash % conditions.length];
    return {
      time: h,
      temp: Math.round(temp + (hHash % 6) - 3),
      condition: hCond.cond,
      icon: hCond.icon,
      pop: (hCond.cond === "Rain" || hCond.cond === "Thunderstorm") ? 40 + (hHash % 60) : hHash % 15
    };
  });

  // Capitalize name
  const name = cityName.charAt(0).toUpperCase() + cityName.slice(1);

  return {
    name,
    country,
    timezone,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    pressure,
    wind_speed,
    wind_deg,
    visibility,
    sunrise,
    sunset,
    condition: baseCond.cond,
    description: baseCond.desc,
    icon: baseCond.icon,
    coord: { lat, lon },
    forecast,
    hourly
  };
}

/**
 * Fetch weather and forecast details for a city
 * @param {string|object} query - The city name string, or { lat, lon } coordinates
 * @returns {Promise<object>} Weather data structure
 */
export async function getWeatherData(query) {
  const isCoords = typeof query === "object" && query.lat !== undefined && query.lon !== undefined;
  
  // If API key is empty, run in Mock Demo Mode
  if (!API_KEY || API_KEY.trim() === "" || API_KEY === "YOUR_API_KEY_HERE") {
    // Add artificial delay to simulate network latency for loading state verification
    await new Promise(resolve => setTimeout(resolve, 600));
    
    let cityName = "New York";
    if (isCoords) {
      cityName = "New York"; // Fallback demo city for coordinate lookup
    } else {
      cityName = query;
    }
    
    const formattedCity = cityName.trim().toLowerCase();
    const mock = generateMockData(formattedCity);
    
    // Check if the mock city represents a "fake" city designed to trigger an error
    if (formattedCity === "error" || formattedCity === "timeout") {
      throw new Error("Network timeout. Please try again.");
    }
    
    if (formattedCity === "notfound" || formattedCity === "unknown") {
      const err = new Error("City not found");
      err.status = 404;
      throw err;
    }

    return {
      source: "demo",
      current: {
        name: isCoords ? "Your Location" : mock.name,
        country: mock.country,
        timezone: mock.timezone,
        temp: mock.temp,
        feels_like: mock.feels_like,
        temp_min: mock.temp_min,
        temp_max: mock.temp_max,
        humidity: mock.humidity,
        pressure: mock.pressure,
        wind_speed: mock.wind_speed,
        wind_deg: mock.wind_deg,
        visibility: mock.visibility,
        sunrise: mock.sunrise,
        sunset: mock.sunset,
        condition: mock.condition,
        description: mock.description,
        icon: mock.icon,
        coord: isCoords ? query : mock.coord,
      },
      forecast: mock.forecast,
      hourly: mock.hourly
    };
  }

  try {
    let currentUrl, forecastUrl;
    if (isCoords) {
      currentUrl = `${BASE_URL}/weather?lat=${query.lat}&lon=${query.lon}&appid=${API_KEY}&units=metric`;
      forecastUrl = `${BASE_URL}/forecast?lat=${query.lat}&lon=${query.lon}&appid=${API_KEY}&units=metric`;
    } else {
      currentUrl = `${BASE_URL}/weather?q=${encodeURIComponent(query)}&appid=${API_KEY}&units=metric`;
      forecastUrl = `${BASE_URL}/forecast?q=${encodeURIComponent(query)}&appid=${API_KEY}&units=metric`;
    }

    // Fetch current weather and 5-day forecast in parallel
    const [currentRes, forecastRes] = await Promise.all([
      fetch(currentUrl),
      fetch(forecastUrl)
    ]);

    if (!currentRes.ok) {
      if (currentRes.status === 404) {
        const err = new Error("City not found. Please enter a valid city.");
        err.status = 404;
        throw err;
      }
      throw new Error(`Server returned error: ${currentRes.status}`);
    }

    if (!forecastRes.ok) {
      throw new Error(`Forecast request failed: ${forecastRes.status}`);
    }

    const currentData = await currentRes.json();
    const forecastData = await forecastRes.json();

    const parsedForecast = processForecastData(forecastData.list);
    
    // Format the first 8 forecast points as the hourly forecast
    const hourlyForecast = forecastData.list.slice(0, 8).map(item => {
      const timeObj = new Date(item.dt * 1000);
      const options = { hour: 'numeric', minute: '2-digit', hour12: true };
      const timeFormatted = new Intl.DateTimeFormat('en-US', options).format(timeObj);
      
      return {
        time: timeFormatted,
        temp: item.main.temp,
        condition: item.weather[0].main,
        icon: item.weather[0].icon,
        pop: Math.round((item.pop || 0) * 100)
      };
    });

    return {
      source: "api",
      current: {
        name: currentData.name,
        country: currentData.sys?.country || "",
        timezone: currentData.timezone,
        temp: currentData.main.temp,
        feels_like: currentData.main.feels_like,
        temp_min: currentData.main.temp_min,
        temp_max: currentData.main.temp_max,
        humidity: currentData.main.humidity,
        pressure: currentData.main.pressure,
        wind_speed: currentData.wind.speed,
        wind_deg: currentData.wind.deg || 0,
        visibility: currentData.visibility,
        sunrise: currentData.sys.sunrise,
        sunset: currentData.sys.sunset,
        condition: currentData.weather[0].main,
        description: currentData.weather[0].description,
        icon: currentData.weather[0].icon,
        coord: currentData.coord,
      },
      forecast: parsedForecast,
      hourly: hourlyForecast
    };
  } catch (error) {
    if (error.message.includes("Failed to fetch")) {
      const netErr = new Error("Network connection failed. Check your internet connectivity.");
      netErr.status = 503;
      throw netErr;
    }
    throw error;
  }
}

/**
 * Groups and filters OpenWeatherMap 5-day/3-hour forecast API response into 5 daily summaries
 * @param {Array} list - 40 forecast records
 * @returns {Array} List of 5 daily forecast summaries
 */
function processForecastData(list) {
  const daysMap = {};

  list.forEach(item => {
    const dateStr = item.dt_txt.split(" ")[0];
    
    if (!daysMap[dateStr]) {
      daysMap[dateStr] = {
        temps: [],
        conditions: [],
        timestamps: []
      };
    }
    
    daysMap[dateStr].temps.push(item.main.temp);
    daysMap[dateStr].conditions.push({
      condition: item.weather[0].main,
      icon: item.weather[0].icon,
      dt: item.dt,
      timeStr: item.dt_txt.split(" ")[1]
    });
  });

  const sortedDates = Object.keys(daysMap).sort();
  const forecast = [];
  const todayStr = new Date().toISOString().split("T")[0];

  for (const dateStr of sortedDates) {
    if (dateStr === todayStr) continue;
    
    const dayData = daysMap[dateStr];
    const temp_min = Math.round(Math.min(...dayData.temps));
    const temp_max = Math.round(Math.max(...dayData.temps));
    
    let selectedCond = dayData.conditions.find(c => c.timeStr.startsWith("12:00:00"));
    if (!selectedCond) {
      selectedCond = dayData.conditions[Math.floor(dayData.conditions.length / 2)];
    }
    
    const dateObj = new Date(selectedCond.dt * 1000);
    const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(dateObj);

    forecast.push({
      day: dayName,
      temp_min,
      temp_max,
      condition: selectedCond.condition,
      icon: selectedCond.icon
    });

    if (forecast.length === 5) break;
  }

  if (forecast.length < 5) {
    const lastDate = forecast.length > 0 ? new Date(list[list.length - 1].dt * 1000) : new Date();
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    while (forecast.length < 5) {
      lastDate.setDate(lastDate.getDate() + 1);
      const nextDayName = daysOfWeek[lastDate.getDay()];
      forecast.push({
        day: nextDayName,
        temp_min: Math.round(forecast[forecast.length - 1]?.temp_min || 15),
        temp_max: Math.round(forecast[forecast.length - 1]?.temp_max || 22),
        condition: forecast[forecast.length - 1]?.condition || "Clouds",
        icon: forecast[forecast.length - 1]?.icon || "02d"
      });
    }
  }

  return forecast;
}
