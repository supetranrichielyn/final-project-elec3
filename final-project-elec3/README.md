# Final Project Web Utilities

A collection of four solo-built mini web apps: a calculator, a Russian work calendar, a stopwatch, and a weather dashboard powered by OpenWeather. Each app is vanilla HTML/CSS/JavaScript and runs locally in the browser.

## Projects

### 1) Calculator
- Basic arithmetic with safe expression evaluation
- Keyboard support (digits, operators, Enter, Backspace, Escape)
- Error handling for invalid expressions
- File: [calculator/index.html](calculator/index.html)

### 2) Russian Work Calendar
- Full-year calendar with Russian public holidays and shortened workdays
- Work/holiday/weekend color coding, stats, and tooltips
- Year navigation, date search (year/month/day), and month/day highlighting
- Light/Dark mode with persistence
- File: [russian-calendar/index.html](russian-calendar/index.html)

### 3) Stopwatch
- Millisecond-resolution timer (HH:MM:SS.CS)
- Start/stop toggle and reset
- Button state management to prevent invalid actions
- File: [stopwatch/index.html](stopwatch/index.html)

### 4) Weather Dashboard
- Current weather + 5-day forecast cards
- Unit toggle (metric/imperial)
- Light/Dark theme toggle with persistence
- Loading skeletons and error messages
- File: [weather-api/index.html](weather-api/index.html)

## APIs Used

### OpenWeather API
- Name: OpenWeather (Current Weather + 5-Day/3-Hour Forecast)
- Base URL: `https://api.openweathermap.org/data/2.5/`
- Endpoints:
  - `weather` — current conditions
  - `forecast` — 5-day / 3-hour forecast
- Required parameters:
  - `q` (string): city name (e.g., `London`)
  - `appid` (string): your API key
  - `units` (string, optional): `metric` for °C/m/s or `imperial` for °F/mph
- Authentication: API key via `appid` query parameter
- Implementation file: [weather-api/script.js](weather-api/script.js)

## Tech Stack
- HTML5
- CSS3 (flex/grid, responsive, gradients, themes)
- Vanilla JavaScript (DOM, events, localStorage, fetch)

## Getting Started

### 1) Clone or Download
```bash
# Clone the repo
git clone <repo-url>
cd final-project-elec3

# Or download ZIP and extract
```

### 2) Run Locally (any project)
- Open the desired HTML file in a browser:
  - [calculator/index.html](calculator/index.html)
  - [russian-calendar/index.html](russian-calendar/index.html)
  - [stopwatch/index.html](stopwatch/index.html)
  - [weather-api/index.html](weather-api/index.html)
- No build step required. Any modern browser works.

### 3) Weather API Key Setup (required for weather app)
- Sign up at https://openweathermap.org/api to get a free API key.
- In [weather-api/script.js](weather-api/script.js), replace the `API_KEY` value at the top with your key:
```javascript
const API_KEY = "YOUR_API_KEY_HERE";
```
- Save the file and reload [weather-api/index.html](weather-api/index.html).

## Screenshots
_Add your screenshots here_
- Calculator: `./screenshots/calculator.png`
- Calendar: `./screenshots/calendar.png`
- Stopwatch: `./screenshots/stopwatch.png`
- Weather: `./screenshots/weather.png`

## Credits / Attribution
- Weather data provided by [OpenWeather](https://openweathermap.org/)
- Holiday set in the calendar uses standard Russian public holidays (hardcoded)

## Notes for Instructors
- Each app is self-contained and can be opened directly in the browser.
- JavaScript is framework-free and organized per app.
- Dark mode/localStorage used in the calendar and weather apps.
