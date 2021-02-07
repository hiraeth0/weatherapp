const getWeather = async (location) => {
    try {
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=f9acc87cd1a8840a36703a0ef3c7fec8`, { mode: 'cors' });
        const weatherData = await weatherResponse.json();
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=f9acc87cd1a8840a36703a0ef3c7fec8`, { mode: 'cors' });
        const forecastData = await forecastResponse.json();
        return { weatherData, forecastData };
    } catch (err) {
        // console.log(err);
    }
};

const getFavoriteWeather = async (locations) => {
    try {
        const locationsWeatherData = await Promise.allSettled(locations.map(async (locationsItem) => { 
            const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locationsItem}&units=metric&appid=f9acc87cd1a8840a36703a0ef3c7fec8`, { mode: 'cors' }); 
            const weatherData = await weatherResponse.json();
            return weatherData;
        }));
        return locationsWeatherData;
    } catch (err) {
        // console.log(err);
    }
};

const getLocation = async () => {
    try {
        const locationResponse = await fetch('https://geo.ipify.org/api/v1?apiKey=at_64AcmkRbuGr2kmqjoVmJzJcA21TFq', { mode: 'cors' });
        const locationData = await locationResponse.json();
        return locationData;
    } catch (err) {
        // console.log(err);
    }
};

export { getWeather, getFavoriteWeather, getLocation };
