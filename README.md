# Final Project — Web Utilities Suite

A solo-built collection of four mini web apps: a Calculator, a Russian Work Calendar, a Stopwatch, and a Weather Dashboard. Each app is built with vanilla HTML/CSS/JavaScript and runs locally in the browser.

- Project Type: Solo project
- Description: A set of small, practical web utilities demonstrating DOM manipulation, user interaction, localStorage, and API integration.

## Overview
- Calculator: Safe arithmetic evaluation with keyboard support.
- Russian Work Calendar: Year view with holidays, weekends, short workdays, and stats.
- Stopwatch: Precise timer with start/stop/reset and HH:MM:SS.CS display.
- Weather Dashboard: Current conditions + 5-day forecast via OpenWeather, with theme and units toggle.

## Quick Access
- Calculator: [calculator/index.html](calculator/index.html)
- Russian Calendar: [russian-calendar/index.html](russian-calendar/index.html)
- Stopwatch: [stopwatch/index.html](stopwatch/index.html)
- Weather Dashboard: [weather-api/index.html](weather-api/index.html)

## Main Features
- Calculator: digits/operators input, `Enter` evaluate, `Backspace` delete, `Escape` clear, safe expression handling.
- Calendar: holiday/weekend/short-day coloring, tooltips, year navigation, date/month search, dark mode persistence.
- Stopwatch: millisecond updates, clear state management, Start/Stop toggle, Reset disabled while running.
- Weather: metric/imperial units, light/dark mode persistence, loading skeletons, error feedback, day/night badge.

## APIs Used
### OpenWeather API
- Name: OpenWeather (Current Weather + 5-Day/3-Hour Forecast)
- Base URLs:
  - Current: https://api.openweathermap.org/data/2.5/weather
  - Forecast: https://api.openweathermap.org/data/2.5/forecast
- Endpoints:
  - `weather` — current conditions
  - `forecast` — 5-day / 3-hour forecast
- Common query parameters:
  - `q` (string): city name (e.g., `London`)
  - `appid` (string): your API key
  - `units` (string, optional): `metric` for °C/m/s or `imperial` for °F/mph
- Authentication: API key via `appid` query parameter
- Example requests:
  - Current: https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY&units=metric
  - Forecast: https://api.openweathermap.org/data/2.5/forecast?q=London&appid=YOUR_API_KEY&units=metric
- Implementation: see `weather-api/script.js`

## Technologies Used
- HTML5
- CSS3 (flex/grid, responsive styles, gradients, themes)
- Vanilla JavaScript (DOM, events, localStorage, fetch)

## Getting Started
### 1) Clone or Download
```bash
# Clone the repository
git clone https://github.com/supetranrichielyn/final-project-elec3.git
cd final-project-elec3
# Or download the ZIP from your repo host and extract it
```

### 2) Run the Project Locally
Option A — Open directly in a browser (simplest):
- Navigate into a subfolder and open its `index.html`:
  - calculator/index.html
  - russian-calendar/index.html
  - stopwatch/index.html
  - weather-api/index.html

Option B — Use VS Code Live Server (recommended):
- Install the “Live Server” extension in VS Code.
- Open the folder, right-click `index.html` in a sub-app and choose “Open with Live Server”.

### 3) Weather API Key Setup (required for weather app)
- Sign up at https://openweathermap.org/api to get a free API key.
- In `weather-api/script.js`, set your key at the top:
```javascript
const API_KEY = "YOUR_API_KEY_HERE";
```
- Reload `weather-api/index.html` and search for a city.

## Screenshots
(Add your screenshots to a `screenshots/` folder and update the paths.)
- Calculator: screenshots/calculator.png
- Calendar: screenshots/calendar.png
- Stopwatch: screenshots/stopwatch.png
- Weather: screenshots/weather.png

## Credits / API Attribution
- Weather data provided by OpenWeather (https://openweathermap.org/)
- Holiday dates for the calendar are hardcoded based on common Russian public holidays and typical pre-holiday short workdays.

## Repo Structure
- calculator/ — Calculator app (HTML/CSS/JS)
- russian-calendar/ — Calendar app with holidays and stats
- stopwatch/ — Stopwatch app
- weather-api/ — Weather dashboard using OpenWeather

## Notes for Instructors
- Each app is self-contained and opens directly in a browser.
- No frameworks; code is organized per app with clear separation of concerns.
- LocalStorage used for theme persistence in Calendar and Weather.
- Weather app demonstrates `fetch`, error handling, and basic data transformation (daily summary from 3-hour forecast).
