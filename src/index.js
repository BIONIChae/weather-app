let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
let hours = now.getHours();
let mins = now.getMinutes();
let h2 = document.querySelector("h2");

if (mins < 10) {
  mins = mins.toString().padStart(2, "0");
}
if (hours < 10) {
  hours = hours.toString().padStart(2, "0");
}

if (hours < 23 && hours > 18) {
  let backdrop = document.querySelector(".container");
  let tempColor = document.querySelector("#temperature");
  let button = document.querySelector("#button");
  let search = document.querySelector("#display-city");
  backdrop.style.background = `url("https://dthezntil550i.cloudfront.net/5b/latest/5b2110212135019430022214799/de7639eb-1734-4ec1-802d-4eb0454055a1.png")`;
  backdrop.style.backgroundSize = "cover";
  symbol.setAttribute(
    "src",
    `https://em-content.zobj.net/source/telegram/358/full-moon_1f315.webp`
  );
  tempColor.style.color = `rgb(38, 0, 125)`;
  button.style.backgroundColor = `black`;
  search.style.backgroundColor = `grey`;
  search.style.color = "white";
}
h2.innerHTML = `${day} | ${hours}:${mins}`;

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
  let symbol = document.querySelector("img");
  celsiusTemp = response.data.main.temp;

  if (response.data.weather[0].description === "light rain") {
    symbol.setAttribute(
      "src",
      `https://em-content.zobj.net/source/microsoft-teams/363/sun-behind-rain-cloud_1f326-fe0f.png`
    );
  }

  if (response.data.weather[0].description === "clear sky") {
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
      `https://em-content.zobj.net/source/microsoft-teams/363/sun-behind-large-cloud_1f325-fe0f.png`
    );
  }
  if (response.data.weather[0].description === "haze") {
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
  windspeed.innerHTML = `Wind: ${response.data.wind.speed}`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}`;
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
  let temp = document.querySelector("#temperature");
  temp.innerHTML = Math.round(celsiusTemp);
}
let celsius = document.querySelector("#cels");
celsius.addEventListener("click", convertToCels);

function convertToFahr(event) {
  event.preventDefault();
  let temper = document.querySelector("#temperature");
  let displayfahr = Math.round((celsiusTemp * 9) / 5 + 32);
  temper.innerHTML = displayfahr;
}
let fahrenheit = document.querySelector("#fahr");
fahrenheit.addEventListener("click", convertToFahr);

let celsiusTemp = null;

function weeklyForecast(list) {
  let days = list.temp.day;
  let day = document.querySelector("#text");
  day.innerHTML = days;
}

