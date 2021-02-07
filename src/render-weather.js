import { convertTemp } from './switch-units';

const getWeekDay = (unixTime) => {
    const week = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    return week[(Math.floor((unixTime / 86400) + 4) % 7)];
};

const renderWeatherInfo = (current) => {
    const location = document.querySelector('.weather__location');
    const weatherStatus = document.querySelector('.current-info__status');
    const temp = document.querySelector('.current-info__temp');
    const tempFeeling = document.querySelector('.feel__temp');

    location.textContent = current.name;
    weatherStatus.textContent = current.weather[0].description;
    temp.textContent = convertTemp(current.main.temp);
    temp.setAttribute('data-temp', current.main.temp);
    tempFeeling.textContent = convertTemp(current.main.feels_like);
    tempFeeling.setAttribute('data-temp', current.main.feels_like);
};

const renderForecastInfo = (forecast) => {
    const weekDayArray = document.querySelectorAll('.weather-wrapper__week-day');
    const tempDayArray = document.querySelectorAll('.weather-wrapper__temp-day');
    const tempNightArray = document.querySelectorAll('.weather-wrapper__temp-night');
    const statusArray = document.querySelectorAll('.forecast-info__status');

    for (let i = 0; i < 7; i++) {
        const weekDayDate = new Date(new Date().setDate(new Date().getDate() + i)).getDate();
        weekDayArray[i].textContent = `${getWeekDay(forecast.daily[i].dt)}, ${weekDayDate}`;
        tempDayArray[i].textContent = convertTemp(forecast.daily[i].temp.day);
        tempDayArray[i].setAttribute('data-temp', forecast.daily[i].temp.day);
        tempNightArray[i].textContent = convertTemp(forecast.daily[i].temp.night);
        tempNightArray[i].setAttribute('data-temp', forecast.daily[i].temp.night);
        statusArray[i].textContent = forecast.daily[i].weather[0].description;
    }
};

const renderForecastInfoDetails = (forecast) => {
    const forecastContainers = document.querySelectorAll('.day__details');
    const wind = document.querySelectorAll('.item__wind');
    const pressure = document.querySelectorAll('.item__pressure');
    const humidity = document.querySelectorAll('.item__humidity');
    const ultraviolet = document.querySelectorAll('.item__uvi');
    const morning = document.querySelectorAll('.item__temp-morning');
    const day = document.querySelectorAll('.item__temp-day');
    const evening = document.querySelectorAll('.item__temp-evening');
    const night = document.querySelectorAll('.item__temp-night');

    for (let i = 0; i < forecastContainers.length; i++) {
        wind[i].textContent = `${Math.round(forecast.daily[i].wind_speed)}m/s`;
        pressure[i].textContent = Math.round(forecast.daily[i].pressure * 0.75);
        humidity[i].textContent = `${forecast.daily[i].humidity}%`;
        ultraviolet[i].textContent = Math.round(forecast.daily[i].uvi * 10) / 10;
        morning[i].textContent = convertTemp(forecast.daily[i].temp.morn);
        morning[i].setAttribute('data-temp', forecast.daily[i].temp.morn);
        day[i].textContent = convertTemp(forecast.daily[i].temp.day);
        day[i].setAttribute('data-temp', forecast.daily[i].temp.day);
        evening[i].textContent = convertTemp(forecast.daily[i].temp.eve);
        evening[i].setAttribute('data-temp', forecast.daily[i].temp.eve);
        night[i].textContent = convertTemp(forecast.daily[i].temp.night);
        night[i].setAttribute('data-temp', forecast.daily[i].temp.night);
    }
};

const backgroundTransition = (current) => {
    const transitionPosition = (temp) => {
        if (temp > 30) return '0% 0%';
        if (temp < -30) return '100% 100%';

        const newPosition = -Math.round((temp / 30) * 50) + 50;
        return `${newPosition}% ${newPosition}%`;
    };
    const body = document.querySelector('body');
    body.style.backgroundPosition = transitionPosition(current.main.temp);
};

const updateToggleButton = () => {
    const favoriteCities = JSON.parse(window.localStorage.getItem('favoriteCities'));
    if (favoriteCities === null) return; 
    
    const favoriteSwitchButton = document.querySelector('.current-info__switch-favorite');
    const currentCity = document.querySelector('.weather__location').textContent;
    
    if (favoriteCities.includes(currentCity)) favoriteSwitchButton.textContent = 'remove city';
    else favoriteSwitchButton.textContent = 'save city';
};

const weatherCointainer = document.querySelector('.root__weather');
const containerTransition = () => {
    const weatherLocation = document.querySelector('.weather__location');
    const weatherCurrentInfo = document.querySelector('.weather__current-info');
    const weatherForecast = document.querySelector('.weather__forecast');

    if (weatherCointainer.style.visibility === 'visible') {
        weatherLocation.style.opacity = '0';
        weatherCurrentInfo.style.opacity = '0';
        weatherForecast.style.opacity = '0';
        setTimeout(() => {
            weatherLocation.style.opacity = '1';
            weatherCurrentInfo.style.opacity = '1';
            weatherForecast.style.opacity = '1';
        }, 800);
    } else {
        weatherCointainer.style.visibility = 'visible';
        weatherCointainer.style.opacity = '1'; 
    }
};

const renderWeather = (current, forecast) => {
    if (weatherCointainer.style.visibility === 'visible') {
        setTimeout(() => {
            renderWeatherInfo(current);
            renderForecastInfo(forecast);
            renderForecastInfoDetails(forecast);
            updateToggleButton();
        }, 600);
    } else {
        renderWeatherInfo(current);
        renderForecastInfo(forecast);
        renderForecastInfoDetails(forecast);
        updateToggleButton();
    }
    backgroundTransition(current);
    containerTransition();
};

export { renderWeather, updateToggleButton };
