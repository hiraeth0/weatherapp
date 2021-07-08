import doFetch from './fetches';
import { convertForecast, convertWeather } from './convert';
import handleError from './handleError';

const weather = {
  data: null,

  async get(name) {
    try {
      const weatherResponse = await doFetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric`, 'GET');
      const forecastResponse = await doFetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${weatherResponse.coord.lat}&lon=${weatherResponse.coord.lon}&exclude=current,minutely,hourly,alerts&units=metric`, 'GET');
      const weatherData = convertWeather(weatherResponse);
      const forecastData = convertForecast(forecastResponse);
      this.data = { current: weatherData, forecast: forecastData };
    } catch (error) {
      this.data = null;
      handleError.show('Location not found');
    }
  },
};

const savedWeather = {
  data: null,

  async get(cities) {
    const data = await Promise.allSettled(cities.map(async (city) => {
      const response = await doFetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`, 'GET');
      return response;
    }));
    const weatherData = data.map((city) => convertWeather(city.value));
    this.data = weatherData;
  },
};

export { weather, savedWeather };
