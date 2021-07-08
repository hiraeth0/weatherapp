import { weather } from './weather';
import storage from './storage';
import loader from './loader';

const renderCurrent = (current) => {
  const location = document.querySelector('.location');
  const weatherStatus = document.querySelector('.weather__status');
  const temp = document.querySelector('.weather__temp');
  const tempFeeling = document.querySelector('.weather__feel-temp');

  location.textContent = current.name;
  weatherStatus.textContent = current.description;
  temp.textContent = current.temp.currentUnits;
  tempFeeling.textContent = current.tempFeeling.currentUnits;

  temp.setAttribute('data-celsius', current.temp.celsius);
  temp.setAttribute('data-fahrenheit', current.temp.fahrenheit);
  tempFeeling.setAttribute('data-celsius', current.tempFeeling.celsius);
  tempFeeling.setAttribute('data-fahrenheit', current.tempFeeling.fahrenheit);
};

const renderForecast = (forecast) => {
  const weekDay = document.querySelectorAll('.day__week-day');
  const tempDay = document.querySelectorAll('.day__temp-day');
  const tempNight = document.querySelectorAll('.day__temp-night');
  const status = document.querySelectorAll('.day__status');

  for (let i = 0; i < 7; i += 1) {
    weekDay[i].textContent = forecast[i].weekDay;
    tempDay[i].textContent = forecast[i].tempDay.currentUnits;
    tempNight[i].textContent = forecast[i].tempNight.currentUnits;
    status[i].textContent = forecast[i].description;

    tempDay[i].setAttribute('data-celsius', forecast[i].tempDay.celsius);
    tempDay[i].setAttribute('data-fahrenheit', forecast[i].tempDay.fahrenheit);
    tempNight[i].setAttribute('data-celsius', forecast[i].tempNight.celsius);
    tempNight[i].setAttribute('data-fahrenheit', forecast[i].tempNight.fahrenheit);
  }
};

const renderForecastDetails = (forecast) => {
  const forecastContainers = document.querySelectorAll('.details');
  const wind = document.querySelectorAll('.details__wind');
  const pressure = document.querySelectorAll('.details__pressure');
  const humidity = document.querySelectorAll('.details__humidity');
  const ultraviolet = document.querySelectorAll('.details__uvi');
  const morning = document.querySelectorAll('.details__temp-morning');
  const day = document.querySelectorAll('.details__temp-day');
  const evening = document.querySelectorAll('.details__temp-evening');
  const night = document.querySelectorAll('.details__temp-night');

  for (let i = 0; i < forecastContainers.length; i += 1) {
    wind[i].textContent = forecast[i].wind;
    pressure[i].textContent = forecast[i].pressure;
    humidity[i].textContent = forecast[i].humidity;
    ultraviolet[i].textContent = forecast[i].uvi;
    morning[i].textContent = forecast[i].tempMorning.currentUnits;
    day[i].textContent = forecast[i].tempDay.currentUnits;
    evening[i].textContent = forecast[i].tempEvening.currentUnits;
    night[i].textContent = forecast[i].tempNight.currentUnits;

    morning[i].setAttribute('data-celsius', forecast[i].tempMorning.celsius);
    morning[i].setAttribute('data-fahrenheit', forecast[i].tempMorning.fahrenheit);
    day[i].setAttribute('data-celsius', forecast[i].tempDay.celsius);
    day[i].setAttribute('data-fahrenheit', forecast[i].tempDay.fahrenheit);
    evening[i].setAttribute('data-celsius', forecast[i].tempEvening.celsius);
    evening[i].setAttribute('data-fahrenheit', forecast[i].tempEvening.fahrenheit);
    night[i].setAttribute('data-celsius', forecast[i].tempNight.celsius);
    night[i].setAttribute('data-fahrenheit', forecast[i].tempNight.fahrenheit);
  }
};

const moveBackground = (position) => {
  const background = document.querySelector('.background');
  background.style.backgroundPosition = position;
};

const toggleButton = (name) => {
  const button = document.querySelector('.weather__switch-favorite');
  if (storage.isIncluded(name)) button.textContent = 'remove city';
  else button.textContent = 'save city';
};

const renderWeather = (data) => {
  renderCurrent(data.current);
  renderForecast(data.forecast);
  renderForecastDetails(data.forecast);
  toggleButton(data.current.name);
  moveBackground(data.current.position);
};

const renderStorage = (favoritesWeather) => {
  for (let i = 0; i < favoritesWeather.length; i += 1) {
    const container = document.querySelector('.favorites');
    const city = document.createElement('article');
    const cityWeather = document.createElement('div');
    const name = document.createElement('span');
    const temperature = document.createElement('span');
    const status = document.createElement('div');

    name.textContent = favoritesWeather[i].name;
    temperature.textContent = favoritesWeather[i].temp.currentUnits;
    status.textContent = favoritesWeather[i].description;

    city.classList.add('city');
    cityWeather.classList.add('city__weather');
    name.classList.add('city__name');
    temperature.classList.add('city__temp', 'unit');
    status.classList.add('city__status');

    city.setAttribute('data-city', favoritesWeather[i].name);
    city.setAttribute('tabindex', '0');
    temperature.setAttribute('data-celsius', favoritesWeather[i].temp.celsius);
    temperature.setAttribute('data-fahrenheit', favoritesWeather[i].temp.fahrenheit);

    container.appendChild(city);
    city.appendChild(cityWeather);
    cityWeather.appendChild(name);
    cityWeather.appendChild(temperature);
    city.appendChild(status);

    city.addEventListener('click', async () => {
      loader.mount();

      await weather.get(favoritesWeather[i].name);
      if (weather.data) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
        const forecastDays = document.querySelectorAll('.day');
        forecastDays.forEach((element) => element.classList.remove('day--expand'));
        renderWeather(weather.data);
      }

      loader.unmount();
    });
  }
};

export { renderWeather, renderStorage, toggleButton };
