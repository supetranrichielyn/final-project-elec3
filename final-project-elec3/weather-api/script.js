const API_KEY = "12d0e4d91e4847e87e69ea25d228d658";

// OpenWeather endpoints
const CURRENT_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

const form = document.getElementById("weatherForm");
const result = document.getElementById("result");
const cityInput = document.getElementById("city");
const unitsSelect = document.getElementById("units");
const searchBtn = document.getElementById("searchBtn");
const themeToggle = document.getElementById("themeToggle");

// ========= THEME =========
// Load saved theme
const savedTheme = localStorage.getItem("weatherTheme") || "dark";
if (savedTheme === "light") {
  document.body.classList.add("light");
  themeToggle.checked = false;
} else {
  themeToggle.checked = true;
}

themeToggle.addEventListener("change", () => {
  if (themeToggle.checked) {
    // Dark mode (checked = dark)
    document.body.classList.remove("light");
    localStorage.setItem("weatherTheme", "dark");
  } else {
    // Light mode (unchecked = light)
    document.body.classList.add("light");
    localStorage.setItem("weatherTheme", "light");
  }
});

// ========= HELPERS =========
function unitLabel(units) {
  return units === "metric" ? "°C" : "°F";
}

function windLabel(units) {
  return units === "metric" ? "m/s" : "mph";
}

function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, (m) => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  }[m]));
}

function setLoading() {
  result.innerHTML = `
    <div class="loading" aria-label="Loading">
      <div class="shimmer lg"></div>
      <div class="shimmer md"></div>
      <div class="shimmer md"></div>
      <div class="shimmer sm"></div>
    </div>
  `;
}

function setError(message) {
  result.innerHTML = `<div class="error">❌ ${escapeHTML(message)}</div>`;
}

function dayNameFromDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, { weekday: "short" });
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

// Pick 5 daily entries from the 3-hour forecast.
// Strategy: for each date, pick the item closest to 12:00 (noon).
function pickDailyForecast(list) {
  const byDate = new Map();

  for (const item of list) {
    const dt = new Date(item.dt_txt);
    const dateKey = dt.toISOString().slice(0, 10);

    if (!byDate.has(dateKey)) byDate.set(dateKey, []);
    byDate.get(dateKey).push(item);
  }

  const days = [];
  for (const [dateKey, items] of byDate.entries()) {
    // choose closest to 12:00
    const target = new Date(dateKey + "T12:00:00");
    let best = items[0];
    let bestDiff = Math.abs(new Date(items[0].dt_txt) - target);

    for (const it of items) {
      const diff = Math.abs(new Date(it.dt_txt) - target);
      if (diff < bestDiff) {
        best = it;
        bestDiff = diff;
      }
    }

    // compute high/low for that day
    let hi = -Infinity;
    let lo = Infinity;
    for (const it of items) {
      hi = Math.max(hi, it.main.temp_max);
      lo = Math.min(lo, it.main.temp_min);
    }

    days.push({
      dateKey,
      dt_txt: best.dt_txt,
      icon: best.weather?.[0]?.icon,
      desc: best.weather?.[0]?.description ?? "",
      hi,
      lo
    });
  }

  // Sort by date and take next 5 (skip "today" if you want—here we include it)
  days.sort((a, b) => a.dateKey.localeCompare(b.dateKey));
  return days.slice(0, 5);
}

function isDaytime(iconCode) {
  // OpenWeather icon ends with "d" or "n"
  return String(iconCode).endsWith("d");
}

// ========= RENDER =========
function renderWeather(current, forecastDays, units) {
  const city = current.name;
  const country = current.sys?.country ?? "";
  const temp = Math.round(current.main.temp);
  const feels = Math.round(current.main.feels_like);
  const humidity = current.main.humidity;
  const wind = current.wind.speed;
  const desc = current.weather?.[0]?.description ?? "—";
  const icon = current.weather?.[0]?.icon ?? "01d";

  const badge = isDaytime(icon) ? "Day" : "Night";
  const u = unitLabel(units);
  const wU = windLabel(units);

  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  const forecastHTML = forecastDays.map(d => {
    const day = dayNameFromDate(d.dt_txt);
    const date = formatDate(d.dt_txt);
    const fIconUrl = d.icon ? `https://openweathermap.org/img/wn/${d.icon}@2x.png` : "";
    return `
      <div class="forecast-item">
        <div class="day">${escapeHTML(day)}</div>
        <div class="small">${escapeHTML(date)}</div>
        ${fIconUrl ? `<img src="${fIconUrl}" alt="${escapeHTML(d.desc)}" />` : ""}
        <div><span class="hi">${Math.round(d.hi)}${u}</span> <span class="lo">${Math.round(d.lo)}${u}</span></div>
        <div class="small">${escapeHTML(d.desc)}</div>
      </div>
    `;
  }).join("");

  result.innerHTML = `
    <section class="card">
      <div class="row">
        <div>
          <strong style="font-size:1.05rem;">${escapeHTML(city)}${country ? ", " + escapeHTML(country) : ""}</strong>
          <div class="desc">Updated now • ${escapeHTML(desc)}</div>
        </div>
        <span class="badge">${badge}</span>
      </div>

      <div class="current">
        <div class="tempWrap">
          <div class="iconBox">
            <img src="${iconUrl}" alt="${escapeHTML(desc)}" />
          </div>
          <div>
            <p class="temp">${temp}${u}</p>
            <p class="desc">Feels like <strong>${feels}${u}</strong></p>
          </div>
        </div>

        <div class="stats">
          <div class="stat"><span>Humidity</span><strong>${humidity}%</strong></div>
          <div class="stat"><span>Wind</span><strong>${wind} ${wU}</strong></div>
          <div class="stat"><span>Pressure</span><strong>${current.main.pressure} hPa</strong></div>
        </div>
      </div>

      <div style="margin-top:14px;">
        <div class="row" style="margin-bottom:10px;">
          <strong>5-Day Forecast</strong>
          <span class="desc">Daily summary</span>
        </div>
        <div class="forecast-grid">
          ${forecastHTML}
        </div>
      </div>
    </section>
  `;
}

// ========= FETCH =========
async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) {
    // Try to extract OpenWeather error message
    let msg = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      if (data?.message) msg = data.message;
    } catch {}
    throw new Error(msg);
  }
  return res.json();
}

async function getWeather(city, units) {
  const q = encodeURIComponent(city);

  const currentUrl = `${CURRENT_URL}?q=${q}&appid=${API_KEY}&units=${units}`;
  const forecastUrl = `${FORECAST_URL}?q=${q}&appid=${API_KEY}&units=${units}`;

  const [current, forecast] = await Promise.all([
    fetchJSON(currentUrl),
    fetchJSON(forecastUrl),
  ]);

  const forecastDays = pickDailyForecast(forecast.list);
  return { current, forecastDays };
}

// ========= FORM =========
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const city = cityInput.value.trim();
  const units = unitsSelect.value;

  // Input validation
  if (!city) return setError("Please enter a city name.");
  if (!API_KEY || API_KEY === "YOUR_API_KEY_HERE") {
    return setError("Missing API key. Add your OpenWeather API key in script.js.");
  }

  // Disable button while loading
  searchBtn.disabled = true;
  searchBtn.textContent = "Loading…";
  setLoading();

  try {
    const { current, forecastDays } = await getWeather(city, units);
    renderWeather(current, forecastDays, units);
  } catch (err) {
    setError(err.message || "Something went wrong. Please try again.");
  } finally {
    searchBtn.disabled = false;
    searchBtn.textContent = "Search";
  }
});
