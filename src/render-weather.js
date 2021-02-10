const renderWeatherInfo = (current) => {
    const location = document.querySelector('.weather__location');
    const weatherStatus = document.querySelector('.current-info__status');
    const temp = document.querySelector('.current-info__temp');
    const tempFeeling = document.querySelector('.feel__temp');

    location.textContent = current.name;
    weatherStatus.textContent = current.description;
    temp.textContent = current.temp.currentUnits;
    temp.setAttribute('data-celsius', current.temp.celsius);
    temp.setAttribute('data-fahrenheit', current.temp.fahrenheit);
    tempFeeling.textContent = current.tempFeeling.currentUnits;
    tempFeeling.setAttribute('data-celsius', current.tempFeeling.celsius);
    tempFeeling.setAttribute('data-fahrenheit', current.tempFeeling.fahrenheit);
};

const renderForecastInfo = (forecast) => {
    const weekDayArray = document.querySelectorAll('.weather-wrapper__week-day');
    const tempDayArray = document.querySelectorAll('.weather-wrapper__temp-day');
    const tempNightArray = document.querySelectorAll('.weather-wrapper__temp-night');
    const statusArray = document.querySelectorAll('.forecast-info__status');

    for (let i = 0; i < 7; i++) {
        weekDayArray[i].textContent = forecast[i].weekDay;
        tempDayArray[i].textContent = forecast[i].tempDay.currentUnits;
        tempDayArray[i].setAttribute('data-celsius', forecast[i].tempDay.celsius);
        tempDayArray[i].setAttribute('data-fahrenheit', forecast[i].tempDay.fahrenheit);
        tempNightArray[i].textContent = forecast[i].tempNight.currentUnits;
        tempNightArray[i].setAttribute('data-celsius', forecast[i].tempNight.celsius);
        tempNightArray[i].setAttribute('data-fahrenheit', forecast[i].tempNight.fahrenheit);
        statusArray[i].textContent = forecast[i].description;
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
        wind[i].textContent = forecast[i].wind;
        pressure[i].textContent = forecast[i].pressure;
        humidity[i].textContent = forecast[i].humidity;
        ultraviolet[i].textContent = forecast[i].uvi;
        morning[i].textContent = forecast[i].tempMorning.currentUnits;
        morning[i].setAttribute('data-celsius', forecast[i].tempMorning.celsius);
        morning[i].setAttribute('data-fahrenheit', forecast[i].tempMorning.fahrenheit);
        day[i].textContent = forecast[i].tempDay.currentUnits;
        day[i].setAttribute('data-celsius', forecast[i].tempDay.celsius);
        day[i].setAttribute('data-fahrenheit', forecast[i].tempDay.fahrenheit);
        evening[i].textContent = forecast[i].tempEvening.currentUnits;
        evening[i].setAttribute('data-celsius', forecast[i].tempEvening.celsius);
        evening[i].setAttribute('data-fahrenheit', forecast[i].tempEvening.fahrenheit);
        night[i].textContent = forecast[i].tempNight.currentUnits;
        night[i].setAttribute('data-celsius', forecast[i].tempNight.celsius);
        night[i].setAttribute('data-fahrenheit', forecast[i].tempNight.fahrenheit);
    }
};

const backgroundTransition = (current) => {
    const body = document.querySelector('body');
    body.style.backgroundPosition = current.position;
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
