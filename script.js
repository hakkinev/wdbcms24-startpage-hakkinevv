async function getWeatherData() {
    const apiKey = '2bf199fd9ebdd79cb3063ef01c197cb4';
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=Helsinki&appid=${apiKey}`;
    
    try {
        const resp = await fetch(apiUrl);
        const data = await resp.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

async function updateWeatherWidget() {
    const weatherWidget = document.getElementById('weather-widget');
    const weatherData = await getWeatherData();
    if (weatherData) {
        // Konverterar temperaturen till celsius och avrundar till två decimaler
        const temperatureCelsius = (weatherData.main.temp - 273.15).toFixed(1);
        const weatherHtml = `
            <h2>Weather in Helsinki</h2>
            <p>Temperature: ${temperatureCelsius}°C</p>
            <p>Description: ${weatherData.weather[0].description}</p>
        `;
        weatherWidget.innerHTML = weatherHtml;
    } else {
        weatherWidget.innerHTML = '<p>Failed to fetch weather data</p>';
    }

}

window.onload = function () {
    updateWeatherWidget();
};