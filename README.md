# 🌦️ NimbusX

> **Beautiful weather. Intelligent forecasts.**

NimbusX is a modern weather application built with **React**, **Tailwind CSS**, and **Framer Motion** that delivers real-time weather updates through a clean, responsive, and visually engaging interface. It provides current weather conditions, hourly forecasts, weekly forecasts, and detailed atmospheric insights with a premium glassmorphism-inspired design.

---

## ✨ Features

- 🌍 Search weather for any city worldwide
- 📍 Current location weather
- 🌤️ Real-time weather conditions
- 🌡️ Temperature in Celsius & Fahrenheit
- ⏰ Hourly weather forecast
- 📅 7-Day weather forecast
- 💨 Wind speed information
- 💧 Humidity monitoring
- 🌫️ Visibility details
- 📊 Atmospheric pressure
- 🌅 Sunrise & Sunset timings
- 🎨 Modern glassmorphism interface
- ⚡ Smooth animations with Framer Motion
- 📱 Fully responsive design
- 🌙 Premium dark theme

---

## 📸 Preview

> Add screenshots after uploading them to your GitHub repository.

```text
assets/
├── home.png
├── forecast.png
└── search.png
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React | Frontend Framework |
| Vite | Build Tool |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| Lucide React | Icons |
| OpenWeather API | Weather Data |

---

## 📂 Project Structure

```text
NimbusX/
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Installation

Clone the repository

```bash
git clone https://github.com/your-username/NimbusX.git
```

Navigate to the project directory

```bash
cd NimbusX
```

Install dependencies

```bash
npm install
```

Start the development server

```bash
npm run dev
```

Build for production

```bash
npm run build
```

---

## 🔑 API Configuration

NimbusX uses the **OpenWeather API** to fetch live weather data.

Create a `.env` file in the project root and add your API key:

```env
VITE_OPENWEATHER_API_KEY=YOUR_API_KEY
```

Access it in your application:

```javascript
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
```

---

## 🌍 Weather Information

NimbusX provides:

- Current Weather
- Feels Like Temperature
- Hourly Forecast
- 7-Day Forecast
- Wind Speed
- Humidity
- Atmospheric Pressure
- Visibility
- Sunrise & Sunset Times

---

## 🎨 UI Highlights

- Premium dark theme
- Glassmorphism-inspired cards
- Smooth animations and transitions
- Responsive layout
- Interactive weather illustrations
- Clean typography
- Modern search experience

---

## 📱 Responsive Design

NimbusX is optimized for:

- 💻 Desktop
- 🖥️ Laptop
- 📱 Mobile
- 📟 Tablet

---

## 📦 Core Dependencies

```json
{
  "react": "^19",
  "vite": "^7",
  "tailwindcss": "^4",
  "framer-motion": "^12",
  "lucide-react": "^0.x"
}
```

---

## 🌟 Future Improvements

- 🗺️ Weather Maps
- 🌫️ Air Quality Index
- ☀️ UV Index
- 🌧️ Rain Probability
- ❤️ Favorite Cities
- 🚨 Weather Alerts
- 📡 Radar Maps
- 🎨 Theme Customization
- 📱 Progressive Web App (PWA)
- 💾 Offline Weather Cache

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/AmazingFeature
```

3. Commit your changes

```bash
git commit -m "Add AmazingFeature"
```

4. Push to your branch

```bash
git push origin feature/AmazingFeature
```

5. Open a Pull Request

---

## 👨‍💻 Author

**Sachin**

---

## ⭐ Support

If you enjoyed this project:

- ⭐ Star the repository
- 🍴 Fork the project
- 🐛 Report issues
- 💡 Suggest new features

---

## 🤖 AI Assistance

NimbusX was developed with the assistance of AI tools to enhance productivity, improve code quality, refine the user interface, and streamline development.

### ChatGPT (OpenAI)

- React component development
- Tailwind CSS styling assistance
- Framer Motion animation suggestions
- JavaScript debugging and optimization
- Code refactoring and best practices
- UI/UX brainstorming
- Feature implementation guidance
- README and documentation assistance

### Antigravity

- UI/UX inspiration
- Layout and component design ideas
- Visual hierarchy improvements
- Spacing and typography refinement
- Interface polish and design exploration

### Disclaimer

AI tools were used as development assistants for brainstorming, coding support, debugging, design exploration, and documentation. All project architecture, implementation, customization, testing, and final decisions were completed and reviewed by the project author.

---

