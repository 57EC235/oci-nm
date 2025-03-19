// Set your OpenWeatherMap API key here
const apiKey = 'YOUR_API_KEY';

// Select HTML elements
const cityInput = document.getElementById('cityInput');
const getWeatherButton = document.getElementById('getWeatherButton');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');

// Add event listener to the button
getWeatherButton.addEventListener('click', getWeather);

// Function to get weather data
function getWeather() {
  const city = cityInput.value.trim();
  if (city === '') {
    alert('Please enter a city name');
    return;
  }

  // Fetch weather data from OpenWeatherMap API
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      if (data.cod === '404') {
        alert('City not found!');
        return;
      }

      // Update UI with the weather data
      cityName.textContent = data.name;
      temperature.textContent = `Temperature: ${data.main.temp}°C`;
      description.textContent = `Condition: ${data.weather[0].description}`;
      humidity.textContent = `Humidity: ${data.main.humidity}%`;
      windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      alert('Failed to fetch weather data.');
    });
}
