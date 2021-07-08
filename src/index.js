import { weather, savedWeather } from './weather';
import storage from './storage';
import { convertTemp } from './convert';
import { renderWeather, renderStorage, toggleButton } from './render';
import handleError from './handleError';
import loader from './loader';

(function addEventListeners() {
  const forecastDays = document.querySelectorAll('.day');
  const unitSwitchButton = document.querySelector('.weather__switch-units');
  const locationInput = document.querySelector('.search__input');
  const favoriteSwitchButton = document.querySelector('.weather__switch-favorite');

  forecastDays.forEach((element) => element.addEventListener('click', () => element.classList.toggle('day--expand')));

  unitSwitchButton.addEventListener('click', () => {
    const switchButton = document.querySelector('.weather__switch-units');
    const unitNodes = document.querySelectorAll('.unit');

    convertTemp.switchUnits();

    if (convertTemp.units === 'c') {
      switchButton.textContent = 'celsius';
      unitNodes.forEach((node) => { node.textContent = node.dataset.celsius; });
    } else if (convertTemp.units === 'f') {
      switchButton.textContent = 'fahrenheit';
      unitNodes.forEach((node) => { node.textContent = node.dataset.fahrenheit; });
    }
  });

  locationInput.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter') {
      const city = locationInput.value.trim();
      locationInput.value = '';

      if (city.length < 1) {
        handleError.show('No empty queries!');
        return;
      }

      handleError.hide();
      loader.mount();

      await weather.get(city);
      if (weather.data) {
        forecastDays.forEach((element) => element.classList.remove('day--expand'));
        renderWeather(weather.data);
      }

      loader.unmount();
    }
  });

  favoriteSwitchButton.addEventListener('click', async () => {
    const city = weather.data.current.name;

    if (storage.isIncluded(city)) {
      storage.remove(city);
      const node = document.querySelector(`article[data-city="${city}"]`);
      node.remove();
    } else {
      storage.add(city);
      await savedWeather.get([city]);
      if (savedWeather.data) renderStorage(savedWeather.data);
    }

    toggleButton(city);
  });
})();

(async function initialize() {
  loader.mount();

  await weather.get('Saint Petersburg');
  if (weather.data) renderWeather(weather.data);

  await savedWeather.get(storage.cities);
  if (savedWeather.data) renderStorage(savedWeather.data);

  loader.unmount();
})();
