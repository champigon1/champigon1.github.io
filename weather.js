document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#city-select').onchange = async function () {
        try {
            const city = this.value;
            await fetchWeather(city);
        } catch (error) {
            console.log(error);
        }
    };
});

async function fetchWeather(city) {
    try {
        const weatherResponse = await fetch(`https://api.weatherapi.com/v1/current.json?key=400494431950404bb3901146240102&q=${city}&aqi=no`);
        if (!weatherResponse.ok) {
            throw new Error('Network response was not ok');
        }
        const weatherData = await weatherResponse.json();
        displayCurrentWeather(weatherData);

        const forecastResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=400494431950404bb3901146240102&q=${city}&days=7&aqi=no&alerts=no`);
        if (!forecastResponse.ok) {
            throw new Error('Network response was not ok');
        }
        const forecastData = await forecastResponse.json();
        displayForecast(forecastData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        // Display error message on the webpage
        const currentWeatherContainer = document.getElementById('current-weather');
        currentWeatherContainer.innerHTML = '<p>Failed to fetch weather data. Please try again later.</p>';
    }
}

function displayCurrentWeather(data) {
    const location = data.location.name + ', ' + data.location.region + ', ' + data.location.country;
    const temperature = data.current.temp_c + '°C';
    const condition = data.current.condition.text;
    const currentWeatherContainer = document.getElementById('current-weather');
    currentWeatherContainer.innerHTML = `
        <h2>Current Weather</h2>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Temperature:</strong> ${temperature}</p>
        <p><strong>Condition:</strong> ${condition}</p>
    `;
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = `<h2>7 Day Forecast</h2>`;
    data.forecast.forecastday.forEach(dayData => {
        const date = dayData.date;
        const temp = dayData.day.avgtemp_c;
        const condition = dayData.day.condition.text;
        forecastContainer.innerHTML += `
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Temperature:</strong> ${temp}°C</p>
            <p><strong>Condition:</strong> ${condition}</p>
        `;
    });
}
