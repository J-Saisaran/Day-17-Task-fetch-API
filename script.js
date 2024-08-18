// Your OpenWeatherMap API key
const apiKey = "5161ca36e4cc40d073f078182305c686";

// Fetch all countries' data from the RestCountries API
var res = fetch("https://restcountries.com/v3.1/all");
res.then((data) => {
  return data.json();
})
  .then((data1) => foo(data1))
  .catch((error) => console.log(error));

// Create a container and a row for Bootstrap layout
var container = document.createElement("div");
container.className = "container";

var row = document.createElement("div");
row.className = "row";

// Function to create Bootstrap cards and integrate weather data on button click
function foo(data1) {
  for (var i = 0; i < data1.length; i++) {
    var x = data1[i];
    
    // Create a column for each card
    var col = document.createElement("div");
    col.className = "col-lg-4 col-sm-12";

    // Create a card for each country
    col.innerHTML = `<div class="card" style="width: 18rem;">
      <h5 class="card-title">${x.name.common}</h5>
      <img src="${x.flags.png}" class="card-img-top" alt="Flag of ${x.name.common}">
      <div class="card-body">
        <p>Capital: ${x.capital ? x.capital[0] : 'N/A'}</p>
        <p>Region: ${x.region}</p>
        <p>Country-Code: ${x.cca3}</p>
        <p>Latlng: ${x.latlng ? x.latlng.join(' : ') : 'N/A'}</p>
        <div id="weather-${i}"></div>
        <button class="btn btn-primary" onclick="getWeather(${i}, '${x.capital ? x.capital[0] : x.name.common}')">Weather</button>
      </div>
    </div>`;

    row.append(col);
  }
  container.append(row);
  document.body.append(container);
}

// Function to fetch and display weather data
function getWeather(index, city) {
  const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  fetch(weatherApiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((weatherData) => {
      const weatherDiv = document.getElementById(`weather-${index}`);
      weatherDiv.innerHTML = `
        <p><strong>Temperature:</strong> ${(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
        <p><strong>Weather:</strong> ${weatherData.weather[0].description}</p>
      `;
    })
    .catch((error) => console.error("Error fetching weather data:", error));
}
