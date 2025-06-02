// Weather functionality for ShoreSquad
class WeatherService {
    constructor() {
        this.apiKey = 'YOUR_WEATHER_API_KEY'; // Replace with actual API key
        this.baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
    }

    async getWeatherForLocation(lat, lon) {
        try {
            const response = await fetch(
                `${this.baseUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`
            );
            if (!response.ok) throw new Error('Weather data fetch failed');
            return await response.json();
        } catch (error) {
            console.error('Error fetching weather:', error);
            return null;
        }
    }

    getWeatherIcon(weatherCode) {
        const icons = {
            '01d': '☀️',
            '02d': '⛅',
            '03d': '☁️',
            '04d': '☁️',
            '09d': '🌧️',
            '10d': '🌦️',
            '11d': '⛈️',
            '13d': '❄️',
            '50d': '🌫️'
        };
        return icons[weatherCode] || '⛅';
    }

    createWeatherWidget(weatherData) {
        if (!weatherData) return '';

        const temp = Math.round(weatherData.main.temp);
        const icon = this.getWeatherIcon(weatherData.weather[0].icon);
        const description = weatherData.weather[0].description;
        
        return `
            <div class="weather-widget">
                <div class="weather-main">
                    <span class="weather-icon">${icon}</span>
                    <span class="weather-temp">${temp}°C</span>
                </div>
                <div class="weather-description">${description}</div>
            </div>
        `;
    }
}

// Initialize weather service
const weatherService = new WeatherService();

// Add weather information to event cards
document.addEventListener('DOMContentLoaded', async () => {
    const eventCards = document.querySelectorAll('.event-card');
    
    for (const card of eventCards) {
        const location = card.querySelector('.location').textContent;
        // Example coordinates - in real app, these would come from your event data
        const lat = 1.381497; // Default to Pasir Ris coordinates
        const lon = 103.955574;
        
        const weatherData = await weatherService.getWeatherForLocation(lat, lon);
        if (weatherData) {
            const weatherWidget = weatherService.createWeatherWidget(weatherData);
            card.querySelector('.location').insertAdjacentHTML('afterend', weatherWidget);
        }
    }
});