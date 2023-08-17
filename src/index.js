function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let mins = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  if (mins < 10) {
    mins = mins.toString().padStart(2, "0");
  }
  if (hours < 10) {
    hours = hours.toString().padStart(2, "0");
  }

  if (hours >= 18 && hours <= 23) {
    let backdrop = document.querySelector(".container");
    let tempColor = document.querySelector("#temperature");
    let button = document.querySelector("#button");
    let search = document.querySelector("#display-city");
    let column = document.querySelector(".col-2");
    let symbol = document.querySelector("#symbol");
    let moon = document.querySelector(".weather");
    let cityName = document.querySelector("#city-name");
    let dateTime = document.querySelector("#time-date");
    let maxTemp = document.querySelector(".max");
    let minTemp = document.querySelector(".min");
    backdrop.style.background = `url("https://4kwallpapers.com/images/wallpapers/full-moon-forest-night-dark-starry-sky-5k-8k-2560x2560-1684.jpg")`;
    backdrop.style.backgroundSize = "cover";
    symbol.setAttribute(
      "src",
      `https://em-content.zobj.net/source/telegram/358/full-moon_1f315.webp`
    );
    tempColor.style.color = `rgb(255, 242, 0)`;
    button.style.backgroundColor = `black`;
    search.style.backgroundColor = `grey`;
    search.style.color = "white";
    column.style.backgroundImage = `linear-gradient(
    to bottom,
    rgb(0, 7, 136),
    rgb(0, 0, 0)
  )`;
    moon.setAttribute(
      "src",
      "https://em-content.zobj.net/source/twitter/348/new-moon_1f311.png"
    );
    cityName.style.color = `white`;
    dateTime.style.color = `white`;
    minTemp.style.color = `white`;
    maxTemp.style.color = `white`;
  }
  let day = days[date.getDay()];
  return `${day} ${hours}:${mins}`;
}

function city(event) {
  event.preventDefault();
  let city = document.querySelector("#display-city");
  let h1 = document.querySelector("h1");
  h1.innerHTML = city.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=19c7ece9cbe1e26fac07b59544664499`;
  axios.get(apiUrl).then(showTemp);
}

let search = document.querySelector("#search-city");
search.addEventListener("submit", city);

function showTemp(response) {
  console.log(response.data);
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(response.data.main.temp);
  let dateElement = document.querySelector("#time-date");
  let symbol = document.querySelector("img");
  celsiusTemp = response.data.main.temp;

  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  if (response.data.weather[0].description === "light rain") {
    symbol.setAttribute(
      "src",
      `https://em-content.zobj.net/source/microsoft-teams/363/sun-behind-rain-cloud_1f326-fe0f.png`
    );
  }
  if (
    response.data.weather[0].icon === "01n" &&
    response.data.weather[0].description === "clear sky"
  ) {
    symbol.setAttribute(
      "src",
      `https://em-content.zobj.net/source/telegram/358/full-moon_1f315.webp`
    );
  } else if (
    response.data.weather[0].description === "clear sky" &&
    response.data.weather[0].icon === "01d"
  ) {
    symbol.setAttribute(
      "src",
      `https://em-content.zobj.net/source/microsoft-teams/363/sun_2600-fe0f.png`
    );
  }
  if (response.data.weather[0].description === "few clouds") {
    symbol.setAttribute(
      "src",
      `https://em-content.zobj.net/source/microsoft-teams/363/sun-behind-small-cloud_1f324-fe0f.png`
    );
  }
  if (
    response.data.weather[0].description === "overcast clouds" ||
    response.data.weather[0].description === "scattered clouds"
  ) {
    symbol.setAttribute(
      "src",
      `https://em-content.zobj.net/source/microsoft-teams/363/cloud_2601-fe0f.png`
    );
  }
  if (response.data.weather[0].description === "broken clouds") {
    symbol.setAttribute(
      "src",
      `https://em-content.zobj.net/source/microsoft-teams/363/cloud_2601-fe0f.png`
    );
  }
  if (
    response.data.weather[0].description === "haze" ||
    response.data.weather[0].description === "mist" ||
    response.data.weather[0].description === "fog"
  ) {
    symbol.setAttribute(
      "src",
      `https://em-content.zobj.net/source/microsoft-teams/363/fog_1f32b-fe0f.png`
    );
  }
  if (response.data.weather[0].description === "shower rain") {
    symbol.setAttribute(
      "src",
      `https://em-content.zobj.net/source/microsoft-teams/363/cloud-with-rain_1f327-fe0f.png`
    );
  }
  if (response.data.weather[0].description === "snow") {
    symbol.setAttribute(
      "src",
      `https://em-content.zobj.net/source/microsoft-teams/363/cloud-with-snow_1f328-fe0f.png`
    );
  }
  if (response.data.weather[0].description === "thunderstorm") {
    symbol.setAttribute(
      "src",
      `https://em-content.zobj.net/source/microsoft-teams/363/cloud-with-lightning-and-rain_26c8-fe0f.png`
    );
  }

  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");

  description.innerHTML = response.data.weather[0].description;
  windspeed.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  getForecast(response.data.coord);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "1a2b7258ebd456c01aef9175dfe8b709";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(weeklyForecast);
}
function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=19c7ece9cbe1e26fac07b59544664499`;
  axios.get(apiUrl).then(showTemp);
}

function getCurrentLocationWeather() {
  navigator.geolocation.getCurrentPosition(handlePosition);
  axios.get(apiUrl).then(city);
}

let locationButton = document.querySelector("#location");
locationButton.addEventListener("click", getCurrentLocationWeather);

function convertToCels(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  let temp = document.querySelector("#temperature");
  temp.innerHTML = Math.round(celsiusTemp);
}
let celsius = document.querySelector("#cels");
celsius.addEventListener("click", convertToCels);

function convertToFahr(event) {
  event.preventDefault();
  fahrenheit.classList.add("active");
  cels.classList.remove("active");
  let temper = document.querySelector("#temperature");
  let displayfahr = Math.round((celsiusTemp * 9) / 5 + 32);
  temper.innerHTML = displayfahr;
}
let fahrenheit = document.querySelector("#fahr");
fahrenheit.addEventListener("click", convertToFahr);

let celsiusTemp = null;

function weeklyForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
          <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
          <img
          class="weather"
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt="sun"
          width="60"
        />
        <div class="temps">
          <span class="max">${Math.round(forecastDay.temp.max)}°</span>
          <span class="min">${Math.round(forecastDay.temp.min)}°</span>
        </div>
      </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function darkness(event) {
  event.preventDefault();
  let backdrop = document.querySelector(".container");
  let tempColor = document.querySelector("#temperature");
  let button = document.querySelector("#button");
  let search = document.querySelector("#display-city");
  let column = document.querySelector(".col-2");
  let symbol = document.querySelector("#symbol");
  let cityName = document.querySelector("#city-name");
  let dateTime = document.querySelector("#time-date");
  let maxTemp = document.querySelector(".max");
  let minTemp = document.querySelector(".min");
  backdrop.style.background = `url("https://4kwallpapers.com/images/wallpapers/full-moon-forest-night-dark-starry-sky-5k-8k-2560x2560-1684.jpg")`;
  backdrop.style.backgroundSize = "cover";
  symbol.setAttribute(
    "src",
    `https://em-content.zobj.net/source/telegram/358/full-moon_1f315.webp`
  );
  tempColor.style.color = `rgb(255, 242, 0)`;
  button.style.backgroundColor = `black`;
  search.style.backgroundColor = `grey`;
  search.style.color = "white";
  column.style.backgroundImage = `linear-gradient(
    to bottom,
    rgb(0, 7, 136),
    rgb(0, 0, 0)
  )`;
  cityName.style.color = `white`;
  dateTime.style.color = `white`;
  minTemp.style.color = `white`;
  maxTemp.style.color = `white`;
}

let nightMode = document.querySelector("#night-time");
nightMode.addEventListener("click", darkness);
