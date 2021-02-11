import { getWeather, getFavoriteWeather, getLocation } from './get-weather';
import { updateCityList, renderFavorite } from './render-favorites';
import switchUnits from './switch-units';
import { renderWeather, updateToggleButton } from './render-weather';
import { convertWeather, convertForecast } from './handle-data';

const showError = (message) => {
    const errorText = document.querySelector('.root__error');
    errorText.textContent = message;
    errorText.style.visibility = 'visible';
    errorText.style.opacity = '1';
};

const hideError = () => {
    const errorText = document.querySelector('.root__error');
    errorText.style.opacity = '0';
    setTimeout(() => {
        errorText.style.visibility = 'hidden';
    }, 505);
};

const removeExpandModifier = () => {
    const allDays = document.querySelectorAll('.forecast__day');
    setTimeout(() => {
        for (let i = 0; i < allDays.length; i++) {
            allDays[i].classList.remove('forecast__day--expand');
        } 
    }, 505);
};

const addCityListeners = () => {
    const cities = document.querySelectorAll('article[data-listener="none"]');
    for (let i = 0; i < cities.length; i++) {
        cities[i].setAttribute('data-listener', 'added');
        cities[i].addEventListener('click', async () => {
            const cityName = cities[i].dataset.city;
            const response = await getWeather(cityName);
            const weatherData = convertWeather(response.weatherData);
            console.log(weatherData);
            const forecastData = convertForecast(response.forecastData);
            renderWeather(weatherData, forecastData);
            removeExpandModifier();
            hideError();
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 300);
        });
    }
};

(() => {
    const allDays = document.querySelectorAll('.forecast__day');
    for (let i = 0; i < allDays.length; i++) {
        allDays[i].addEventListener('click', () => {
            if (!allDays[i].classList.contains('forecast__day--expand')) {
                for (let f = 0; f < allDays.length; f++) {
                    allDays[f].classList.remove('forecast__day--expand');
                }
            }
            allDays[i].classList.toggle('forecast__day--expand');
        });
    }
})();

(() => {
    const unitSwitchButton = document.querySelector('.current-info__switch-units');
    unitSwitchButton.addEventListener('click', switchUnits);
})();

(() => {
    const locationInput = document.querySelector('.root__input-location');
    locationInput.addEventListener('keydown', async (event) => {
        if (event.key === 'Enter') {
            try {
                const response = await getWeather(locationInput.value);
                const weatherData = convertWeather(response.weatherData);
                const forecastData = convertForecast(response.forecastData);
                renderWeather(weatherData, forecastData);
                removeExpandModifier();
                hideError();
            } catch (err) {
                showError('location not found');
            }
            locationInput.value = '';
        }
    });
})();

(() => {
    const favoriteSwitchButton = document.querySelector('.current-info__switch-favorite');
    favoriteSwitchButton.addEventListener('click', async () => {
        updateCityList();
        updateToggleButton();

        const favoriteCities = JSON.parse(window.localStorage.getItem('favoriteCities'));
        let renderedCitites = Array.from(document.querySelectorAll('.favorites__city'));
        renderedCitites = renderedCitites.map((node) => node.dataset.city);
        const cititesToRender = favoriteCities.filter((city) => !renderedCitites.includes(city));

        const response = await getFavoriteWeather(cititesToRender);
        const citiesData = response.map((city) => convertWeather(city.value));
        renderFavorite(citiesData);
        addCityListeners();
    });
})();

(() => {
    const savedCities = JSON.parse(window.localStorage.getItem('favoriteCities'));
    if (savedCities === null) {
        const defaultCities = JSON.stringify(['Perth', 'London', 'Yakutsk']);
        localStorage.setItem('favoriteCities', defaultCities);
    }
})();

(async () => {
    const savedCities = JSON.parse(window.localStorage.getItem('favoriteCities'));
    if (savedCities === null || savedCities === []) return; 

    const response = await getFavoriteWeather(savedCities);
    const citiesData = response.map((city) => convertWeather(city.value));
    renderFavorite(citiesData);
    addCityListeners();
})();

(async () => {
    try {
        const locationResponse = await getLocation();
        const response = await getWeather(locationResponse.location.city);
        const weatherData = convertWeather(response.weatherData);
        const forecastData = convertForecast(response.forecastData);
        renderWeather(weatherData, forecastData);
    } catch (err) {
        showError('could not get location by IP address');
    }
})();
