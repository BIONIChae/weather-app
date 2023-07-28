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
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=19c7ece9cbe1e26fac07b59544664499`;
  axios.get(apiUrl).then(showTemp);
}

function getCurrentLocationWeather() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let locationButton = document.querySelector("#location");
locationButton.addEventListener("click", getCurrentLocationWeather);
